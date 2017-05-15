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
       

    } else {
      console.log('##################################');
      //console.log('OKTA Response:', body);

    }
}

// this works to obtain a session Token at body.sessionToken
request(options, callback);


};


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
