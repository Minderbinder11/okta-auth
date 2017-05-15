// route-handler.js
'use strict';
const request = require('request');
const querystring = require('querystring');
const config = require('../config.json').oktaData;
import path from 'path';
// const jws = require('jws');
// const jwk2pem = require('pem-jwk').jwk2pem;

const handlers = module.exports = {};
const cachedJwks = {};

handlers.home = (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
};

handlers.login = (req, res) => {
  // here I will redirect to the OKTA server

  req.session.visitCount = req.session.visitCount ? req.session.visitCount + 1 : 1;
  console.log('sessions object:', req.session);


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
            console.log(body.sessionToken);

/*
 * authorize call,  using sessionsToken to get access to OAuth and get a id_token  
 */
        var dataString3 = `{
          "client_id": "83xpWa4wpf7FhSOYDdgz"
          "response_type": "id_token"
          "scope": "openid"
          "prompt": "none"
          "redirect_uri": "http://localhost:8000/callback/redirect"
          "state": "thisismystatestring",
          "nonce": "78yu78yu78yu"
          "sessionToken": body.sessionToken
          }`;

        var options3 = {
            url: 'https://dev-477147.oktapreview.com/oauth2/v1/authorize',
            method: 'POST',
            headers: headers,
            body: dataString3
        };

        function callback3(error, response, body) {
          if (error) {
            console.log('error', error);
          } else {
            console.log('body', body);
          }
        }

        request(options3, callback3);

    } else {
      console.log('##################################');
      //console.log('OKTA Response:', body);

    }
}

// this works to obtain a session Token at body.sessionToken
request(options, callback);


};

/*
  * this did not work to obtain a session token
*/
//       var headers2 = {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//       };

//       var dataString2 = `{
//         "response_type": "id_token",
//         "client_id": "YywcgJ1JVnP3PDxPwysb",
//         "redirect_uri": "http://localhost:8000/callback/redirect",
//         "scope": "openid",
//         "state": "thisismystatestring",
//         "nonce": "78yu78yu78yu"
//       }`;

//       var options2 = {
//           url: 'https://dev-477147.oktapreview.com/oauth2/v1/authorize',
//           method: 'POST',
//           headers: headers2,
//           body: dataString2
//       };

//       function callback2(error, response, body) {
//               console.log('body: ',body);
//           if (!error && response.statusCode === 200) {
//           } else {
//             console.log('second call error:', error);
//           }
//       }

//       request(options2, callback2);

// }

// curl command to OAuth Server:
//curl -v POST -H "Accept: application/json" -H "Content-Type: application/json" -d '{"response_type": "id_token", "client_id": "zYVNoNIeSwul32vpNiOz", "redirect_uri": "http://localhost:8000/callback/redirect", "scope": "openid", "state": "thisismystatestring", "nonce": "78yu78yu78yu"}' "https://dev-477147.oktapreview.com/oauth2/v1/authorize"

// curl -v POST -d '{"client_id": "clientId" ,"response_type":"id_token",'scope': "openid"&"prompt"="none" 'redirect_uri': 'https%3A%2F%2Fyour-app.example.com', 'state' :'Af0ifjslDkj&nonce=n-0S6_WzA2Mj', 'sessionToken: '0HsohZYpJgMSHwmL9TQy7RRzuY'}'https://your-subdomain.okta.com/oauth2/v1/authorize

/*
  * working on obtaining a session from a session token.
*/



// };

handlers.callback = (req, res) => {

  console.log('!!!!!!!!!!!!!!!!! NEW REQUEST !!!!!!!!!!!!!!!!!!'); 
  console.log(req.headers);
  console.log('COOKIES COOKEIS COOKIES COOKIES COOKIES COOKIES'); 
  console.log('request: ', req.params);
  
  console.log('!!!!!!!!!!!!!!!!! END REQUEST !!!!!!!!!!!!!!!!!!'); 

  let nonce; // nonce is a one time value that is sent with the request
  let state;

  // set the variable nonce and state
  if (req.cookies['okta-oauth-nonce'] && req.cookies['okta-oauth-state']) {
    nonce = req.cookies['okta-oauth-nonce'];
    state = req.cookies['okta-oauth-state'];
  } else {
    res.status(401).send('"state" and "nonce" cookies have not been set before the /callback request');
    return;
  }


  res.sendFile(path.join(__dirname, '../client/profile.html'));
};

// curl -H "Accept: application/json" -H "Content-Type: application/json" -d '{"response_type": "id_token", "client_id": "83xpWa4wpf7FhSOYDdgz", "redirect_uri": "http://localhost:8000/authorization-code/callback", "scope": "openid", "state": "thisismystatestring", "nonce": "78yu78yu78yu"}' "https://dev-477147.oktapreview.com/oauth2/v1/authorize"



/*
 * api/v1/authn
 * this will hit the authorize end point to get a session token using a password
 * this sessionToken will then be used to get a sessionID??
 */

  // var dataString = {
  //   'username': 'pbarow@gmail.com',
  //   'password': 'BH22escow',
  //   'options': {
  //     'multiOptionalFactorEnroll': false,
  //     'warnBeforePasswordExpired': false
  //   }
  // };

  // request({
  //   method: 'post',
  //   uri: 'https://dev-477147.oktapreview.com/api/v1/authn',
  //   qs: dataString,
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   }
  // }, function(err, response, body) {

  //   if (err) {
  //     console.log('error :', err);
  //     res.send('error');
  //   } else {
  //     console.log('##################################');
  //     console.log('OKTA Response:', body);
  //     //res.status(200).json({redirect: response.request.headers.referer});
  //   }
  // });