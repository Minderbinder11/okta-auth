// route-handler.js
'use strict';
const request = require('request');
const querystring = require('querystring');
const config = require('../config.json').oktaData;
import path from 'path';

const client_id = '83xpWa4wpf7FhSOYDdgz';
const client_secret = '-s6qFUbhXPNmRHC8QB6H3HHcn1tkD4KM1pt7HQZi';
const redirect_uri = 'http://localhost:8000/authorization-code/callback';
const state_string = 'states4utring';
const nonce = 'ghghghgh787878';
const authorize_uri = 'https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/authorize?';
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

// const jws = require('jws');
// const jwk2pem = require('pem-jwk').jwk2pem;

const handlers = module.exports = {};
const cachedJwks = {};

handlers.home = (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
};

handlers.login = (req, res) => {

  console.log(req.session);

  // steps:
  // 1. get username password
  // 2. use that to get the userID
  // 3. check for MFA with userID
  // 4. if none, success, and redirect to home page
  // 5. if MFA,  prompt for MFA verification


// the req.params from the buttonclick should be pulled off and put in username and password

  var options = { method: 'POST',
    url: 'https://dev-477147.oktapreview.com/api/v1/authn',
    headers: 
    { 'postman-token': '72eb3a12-833a-733f-dc0e-34c42765b1e3',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'accept': 'application/json' },
  body: 
   { username: 'steinbeck@dev-477147.com',
     password: 'Barnegat01',
     options: 
      { multiOptionalFactorEnroll: true,
        warnBeforePasswordExpired: true } },
  json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    if (body.status === 'SUCCESS') {
      console.log('Great Success', body._embedded.user.id);

      // gets the list of factors:

      var options = { 
        method: 'GET',
        url: 'https://dev-477147.oktapreview.com/api/v1/users/' + body._embedded.user.id + '/factors',
        headers: 
          { 'postman-token': 'd690f462-1de9-fe08-99ad-b2edfc16f1bf',
            'cache-control': 'no-cache',
            'authorization': 'SSWS 00p_Z5emQrIXfw228qBmju0GtmVdDb3V_Vp0gwkpNb',
            'content-type': 'application/json',
            'accept': 'application/json' } 
          };

      request(options, function (error, response, body) {
        
        if (error) throw new Error(error);
        
        if (body.length > 0) {
          // if there is MFA
          body = JSON.parse(body);
          console.log('Factor ID: ', body[0].id);
          console.log('Factor ID: ', body[0].factorType); 
          // there is an MFA,  so I need to get i
          // send the user to the page for the MFAs numbers.
          //res.sendFile(path.join(__dirname, '../client/profile.html'));
          res.send('<p>some html</p>');
        } else {
          // then there are no MFAs and we need to redirect home page
          res.sendFile(path.join(__dirname, '../client/profile.html'));
        }

      });
    
    }
  });


};

handlers.page = (req, res) => {
  console.log('new page');
  res.sendFile(path.join(__dirname, '../client/profile.html'));
};

handlers.loginoauth = (req, res) => {

  console.log('IN LOGIN OAUTH')

  var loginHTMLUrl = 'https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/authorize?client_id=83xpWa4wpf7FhSOYDdgz&response_type=code&response_mode=query&prompt=none&scope=offline_access&redirect_uri=http://localhost:8000/authorization-code/callback&state=statestring&nonce=ghghghgh787878';
  var loginSessionToken = 'https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/authorize?client_id=83xpWa4wpf7FhSOYDdgz&response_type=code&scope= offline_access&redirect_uri=http://localhost:8000/authorization-code/callback&state=statestring&nonce=ghghghgh787878&sessionToken=201111DVJbmR8nn2easfla5eF1ZMFpJ_cPLMmYxSeZvf-mLNme6MThl';

  var options = {
      url: loginSessionToken,
      method: 'GET'
  };

  request(options, function (error, response, body) {
    if(!error) {
      console.log('in callback login: BODY', body);
      res.send(body);
    } else {
      console.log('in error???');
      console.log(error);
    }
  });

};

handlers.oauth2 = (req, res) => {

  console.log('in handler OATUTH2: ', req.query);

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
