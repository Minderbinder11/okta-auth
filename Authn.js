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
  } else {
    console.log(error);
  }
}

request(options, callback);


// function callbackSessions(error, response, body) {
//   if (!error && response.statusCode === 200) {
//     body = JSON.parse(body);
//     console.log("sessions Cookie: ", body);
//   } else {
//     console.log(error);
//   }
// }
// sessions:
//curl -v POST -H "Accept: application/json" -H "Content-Type: application/json" -d '{"sessionToken": "20111-2GEzU05nd6LF7n2u2kSlrD4uHEdlURmRaTAynxbboY2GVFjKo"}' "https://dev-477147.oktapreview.com/api/v1/sessions"

// {
//   "id":"102r501W26LSHO1EbMbfSNTVQ",
//   "userId":"00ua9dks1dJY7NfB20h7",
//   "login":"pbarow@gmail.com",
//   "createdAt":"2017-05-14T19:35:14.000Z",
//   "expiresAt":"2017-05-14T21:35:14.000Z",
//   "status":"ACTIVE",
//   "lastPasswordVerification":null,
//   "lastFactorVerification":"2017-05-04T19:14:23.000Z",
//   "amr":["pwd"],
//   "idp":{"id":"00oa9dks0cWlusDL10h7","type":"OKTA"},
//   "mfaActive":true,
//   "_links":
//     {"self":
//       { 
//         "href":"https://dev-477147.oktapreview.com/api/v1/sessions/me",
//         "hints":{"allow":["GET","DELETE"]}},
//         "refresh":{"href":"https://dev-477147.oktapreview.com/api/v1/sessions/me/lifecycle/refresh",
//         "hints":{"allow":["POST"]}},"user":{"name":"Phillip Barow","href":"https://dev-477147.oktapreview.com/api/v1/users/me","hints":{"allow":["GET"]}}}}Minderbinder:okta-auth