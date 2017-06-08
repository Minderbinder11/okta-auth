//Authn.js

var request = require('request');
var getSession = require('./sessions');

var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

var dataString = `{
  "username": "pbarow@gmail.com",
  "password": "BH22escow",
  "relayState": "http://localhost:8000/callback/redirect",
  "options": {
    "multiOptionalFactorEnroll": false,
    "warnBeforePasswordExpired": false
  }
}`;

var options = {
    url: 'https://dev-477147.oktapreview.com/api/v1/authn',
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
  if (!error && response.statusCode === 200) {
    body = JSON.parse(body);
    console.log("session Token: ", body.sessionToken);
    getSession(body.sessionToken);
    //getOauth(body.sessionToken);
  } else {
    console.log(error);
  }
}

request(options, callback);
