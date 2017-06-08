//index2.js

var express = require('express');
var request = require('request');
var qs = require('querystring');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var path = require('path');

var clientId = 'cEBoZvS44tkt5R5VL7pX'; // Your client id
const clientSecret = 'M3_PuCqN1hWdjAvWMSkUTEqaaasJzwNTadbj4HvV';

// var client_secret = '-s6qFUbhXPNmRHC8QB6H3HHcn1tkD4KM1pt7HQZi'; // Your secret
var redirect_uri = 'http://localhost:8000/callback/redirect'; // Your redirect uri


var generateRandomString = (length) => {
	var text = '';
 	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

 	for (var i = 0; i< length; i++) {
 		text += possible.charAt(Math.floor(Math.random() * possible.length));
 	}
 	return text;
}

const stateKey = 'app_auth_state';

var app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use(cookieParser());
//app.use(morgan('combined'));

// app.get('/login', (req, res) => {
// 	var state = generateRandomString(16);
// 	var nonce = generateRandomString(24);

// 	var options = { method: 'GET',
//   	url: 'https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/authorize',
// 	  qs: 
// 	   { client_id: client_id,
// 	     response_type: 'token',
// 	     response_mode: 'fragment',
// 	     scope: 'openid',
// 	     redirect_uri: 'http://localhost:8000/callback/redirect',
// 	     state: state,
// 	     nonce: nonce },
// 	  headers: 
// 	   { 'postman-token': '15fb68e0-056b-0489-875e-0186fe02fba9',
// 	     'cache-control': 'no-cache' } };

// 	request(options, function (error, response, body) {
// 	  if (error) throw new Error(error);

// 	  console.log(body);
// 	});
// });

app.get('/authorization-code/callback', (req, res) => {
	//console.log(req);
	console.log('in GET callback: ', req.query);

	//var qsParams = req.Url;

	console.log('Query Params - code: ', req.query.code);
	console.log('Query Params - state: ', req.query.state);

	// now use this code to get to get an access token

	const secret = new Buffer(clientId + ':' + clientSecret, 'utf8').toString('base64');
  console.log('this is the secret', secret);

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

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


	//res.json({status: 'SUCCESS'})


});

app.get('token-callback/redirect', (req, res) => {
	console.log('in token callback');

});

app.post('/callback/redirect', (req, res) => {
	//console.log(req);
	console.log('in POST callback: ', req.query);

	//res.redirect('/')
});

app.listen(8000, () =>{
	console.log('listening on port 8000');
})