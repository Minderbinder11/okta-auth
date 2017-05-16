//index2.js

var express = require('express');
var request = require('request');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var path = require('path');

var client_id = '83xpWa4wpf7FhSOYDdgz'; // Your client id
var client_secret = '-s6qFUbhXPNmRHC8QB6H3HHcn1tkD4KM1pt7HQZi'; // Your secret
var redirect_uri = 'http://localhost:8000/authorization-code/callback'; // Your redirect uri


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
app.use(morgan('combined'));

app.get('/login', (req, res) => {
	var state = generateRandomString(16);
	var nonce = generateRandomString(24);

	res.cookie(stateKey, state);

	var scope = 'offline_access';

	var getUrl = 'https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/authorize?' + querystring.stringify({
		response_type: 'code',
		client_id: client_id,
		redirect_uri: redirect_uri,
		scope: 'openid',
		state: state,
		nonce: nonce
			});

	console.log(getUrl);
		
	var options = {
		url: getUrl,
		method: 'GET'
	};

	request(options, (error, response, body) => {

		console.log(body);
	});

});

app.get('/authorization-code/callback', (req, res) => {
	console.log(req);
	console.log('in callback: ', req.query);
});


app.listen(8000, () =>{
	console.log('listening on port 8000');
})