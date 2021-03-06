// index2.js
// this code uses code written the Okta copyrighted files.
// for their code,  please see this github repositiory:
// https://github.com/okta/samples-js-react

import express 			from 'express';
import request			from 'request';
import session      from 'express-session';
import bodyParser   from 'body-parser';
import qs 					from 'querystring';
import cookieParser from 'cookie-parser';
import path 				from 'path';
import jws 					from 'jws';
import { jwk2pem }	from 'pem-jwk';
import config       from '../config.json';

var clientId = config.oidc.clientId; 
const clientSecret = config.oidc.clientSecret;
const cachedJwks = {};
const oktaUrl =  config.oidc.oktaUrl; 
const redirectUrl = config.oidc.redirectUri; 
var app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use(cookieParser());

app.use(session({
  secret: 'mt tamalpais',
  cookie: { maxAge: 3600000 },
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function requireAuth (req, res, next) {
  if (req.session.user) { 
    return next();
  } else {
    res.redirect('/');
  }
}

app.get('/authorization-code/callback', (req, res) => {

	let nonce;
  let state;
  var redirectParams = JSON.parse(req.cookies['okta-oauth-redirect-params']);
  //console.log('req.cookies', req.cookies);
  //console.log('req.query', redirectParams['state']);

  if (redirectParams['nonce'] && redirectParams['state']) {
  	var redirectParams = JSON.parse(req.cookies['okta-oauth-redirect-params']);
    nonce = req.cookies['okta-oauth-nonce'];
    state = redirectParams.state;
  }
  //else {
  //  res.status(401).send('"state" and "nonce" cookies have not been set before the /callback request');
  //  return;
  //}

  if (!req.query.state || req.query.state !== state) {
    res.status(401).send(`Query state "${req.query.state}" does not match cookie state "${state}"`);
    return;
  }

  if (!req.query.code) {
    //console.log('route /authorization-code/callback', req.query);
    res.status(401).send('Required query parameter "code" is missing');
    return;
  }

	const secret = new Buffer(clientId + ':' + clientSecret, 'utf8').toString('base64');

  const query = qs.stringify({
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: 'http://localhost:8000/authorization-code/callback',
  });

	const options = { 
		method: 'POST',
  	url: 'https://dev-477147.oktapreview.com/oauth2/v1/token?'+ query,
  	headers: 
   	{ 'content-type': 'application/x-www-form-urlencoded',
     	'cache-control': 'no-cache',
     	'authorization': 'Basic ' + secret,
     	'accept': 'application/json' },
     	json: true
     };

	request(options, function (err, response, json) {
	  if (err) {
	      res.status(500).send(err);
	      return;
	    }

	  if (json.error) {
	    res.status(401).send(`${json.error}: ${json.error_description}`);
	    return;
	  }

	  const decoded = jws.decode(json.id_token);
	  if (!decoded) {
	    res.status(401).send('id_token could not be decoded from the response');
	    return;
	  }
	  console.log('json token ', json);

	  new Promise((resolve, reject) => {
      // If we've already cached this JWK, return it
      if (cachedJwks[decoded.header.kid]) {
        resolve(cachedJwks[decoded.header.kid]);
        return;
      }

      // If it's not in the cache, get the latest JWKS from /oauth2/v1/keys
      const options = {
        url: oktaUrl + '/oauth2/v1/keys',
        json: true,
      };
      request(options, (err, resp, json) => {
        if (err) {
          reject(err);
          return;
        } else if (json.error) {
          reject(json);
          return;
        }

        json.keys.forEach(key => cachedJwks[key.kid] = key);
        if (!cachedJwks[decoded.header.kid]) {
          res.status(401).send('No public key for the returned id_token');
          return;
        }
        console.log('resolve this: :', cachedJwks[decoded.header.kid]);
        resolve(cachedJwks[decoded.header.kid]);
      });
    })
    .then((jwk) => {
      const claims = JSON.parse(decoded.payload);

      const pem = jwk2pem(jwk);
      if (!jws.verify(json.id_token, jwk.alg, pem)) {
        res.status(401).send('id_token signature is invalid');
        return;
      }
      console.log(json.id_token);

      if (oktaUrl !== claims.iss) {
        res.status(401).send(`id_token aud ${claims.aud} does not match our clientId ${clientId}`);
        return;
      }

      if (clientId !== claims.aud) {
        res.status(401).send(`id_token aud ${claims.aud} does not match our clientId ${clientId}`);
        return;
      }

      const now = Math.floor(new Date().getTime() / 1000);

      const maxClockSkew = 300; 
      if (now - maxClockSkew > claims.exp) {
        const date = new Date(claims.exp * 1000);
        res.status(401).send(`The JWT expired and is no longer valid - claims.exp ${claims.exp}, ${date}`);
        return;
      }

      if (claims.iat > (now + maxClockSkew)) {
        res.status(401).send(`The JWT was issued in the future - iat ${claims.iat}`);
        return;
      }

      req.session.user = {
        claims: claims,
        user: claims.email
      };

      console.log('rediret to profile');

      // here is where I need to send the response wit a header
      res.redirect(302, '/profile');
		})
		.catch(err => res.status(500).send(`Error! ${JSON.stringify(err)}`));
	});
});

app.get('/profile', requireAuth, (req, res) => {

  console.log ('in profile');
 res.status(200).sendFile(path.join(__dirname, '../client/profile.html'));

});

app.get('/test', (req, res) => {
  console.log('request', req.cookies);
  console.log('server session info', req.session.user);
  res.status(200).json({status: 'SUCCESS'});
});


app.get('/*', ( req, res) => {
  res.redirect('/');
}); 

app.listen(8000, () =>{
	console.log('listening on port 8000');
})