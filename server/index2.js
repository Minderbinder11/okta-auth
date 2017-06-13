//index2.js

import express 			from 'express';
import request			from 'request';
import session      from 'express-session';
import bodyParser   from 'body-parser';
import qs 					from 'querystring';
import cookieParser from 'cookie-parser';
import path 				from 'path';
import jws 					from 'jws';
import { jwk2pem }	from 'pem-jwk';

var clientId = 'cEBoZvS44tkt5R5VL7pX'; // Your client id
const clientSecret = 'M3_PuCqN1hWdjAvWMSkUTEqaaasJzwNTadbj4HvV';
const cachedJwks = {};
const oktaUrl = 'https://dev-477147.oktapreview.com';
const redirectUrl = 'http://localhost:8000/authorization-code/callback';

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

  if (req.cookies['okta-oauth-nonce'] && req.cookies['okta-oauth-state']) {
  	var redirectParams = JSON.parse(req.cookies['okta-oauth-redirect-params'])
    nonce = req.cookies['okta-oauth-nonce'];
    state = redirectParams.state;
  } else {
    res.status(401).send('"state" and "nonce" cookies have not been set before the /callback request');
    return;
  }

  if (!req.query.state || req.query.state !== state) {
    res.status(401).send(`Query state "${req.query.state}" does not match cookie state "${state}"`);
    return;
  }

  if (!req.query.code) {
    console.log('route /authorization-code/callback', req.query);
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
	  console.log('decoded: ', decoded);

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

      console.log('ID_token claims: ', claims);

      // Using the jwk, verify that the id_token signature is valid. In this
      // case, the library we're using, JWS, requires PEM encoding for our JWK.
      const pem = jwk2pem(jwk);
      if (!jws.verify(json.id_token, jwk.alg, pem)) {
        res.status(401).send('id_token signature is invalid');
        return;
      }
      // Verify that the nonce matches the nonce generated on the client side
      // if (nonce !== claims.nonce) {
      //   res.status(401).send(`claims.nonce "${claims.nonce}" does not match cookie nonce ${nonce}`);
      //   return;
      // }

      // Verify that the issuer is Okta, and specifically the endpoint that we
      // performed authorization against.
      if (oktaUrl !== claims.iss) {
        res.status(401).send(`id_token aud ${claims.aud} does not match our clientId ${clientId}`);
        return;
      }

      // Verify that the id_token was minted specifically for our clientId
      if (clientId !== claims.aud) {
        res.status(401).send(`id_token aud ${claims.aud} does not match our clientId ${clientId}`);
        return;
      }

      // Verify the token has not expired. It is also important to account for
      // clock skew in the event this server or the Okta authorization server has
      // drifted.
      const now = Math.floor(new Date().getTime() / 1000);

      const maxClockSkew = 300; // 5 minutes
      if (now - maxClockSkew > claims.exp) {
        const date = new Date(claims.exp * 1000);
        res.status(401).send(`The JWT expired and is no longer valid - claims.exp ${claims.exp}, ${date}`);
        return;
      }

      // Verify that the token was not issued in the future (accounting for clock
      // skew).
      if (claims.iat > (now + maxClockSkew)) {
        res.status(401).send(`The JWT was issued in the future - iat ${claims.iat}`);
        return;
      }

      // The id_token is good! In a real app, this is the point where you would
      // lookup the user in a user store, and set the session for the user.
      //
      // In this sample app, we'll take a shortcut and just set some of the
      // claims as the "user object"

      // req.session.user = {
      //   email: claims.email,
      //   claims: claims
      // };
      //console.log('user session: ', req.session.user);

      // Now that the session cookie is set, we can navigate to the logged-in
      // app page.
      req.session.user = {
        claims: claims,
        user: claims.email
      }
    
      console.log('user session: ', req.session.user);
      res.redirect(302, '/profile');
      //res.status(200).sendFile(path.join(__dirname, '../client/profile.html'));
      //res.status(200).send('<h2>You are logged in</h2>');

		})
		 .catch(err => res.status(500).send(`Error! ${JSON.stringify(err)}`));
	});
});

app.get('/profile', requireAuth, (req, res) => {

  //res.json({status: 'SUCCESS'});
  res.status(200).sendFile(path.join(__dirname, '../client/profile.html'));

});

app.get('/*', ( req, res) => {
  res.redirect('/');
}); 

app.listen(8000, () =>{
	console.log('listening on port 8000');
})