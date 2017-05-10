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

handlers.callback = (req, res) => {

  console.log('!!!!!!!!!!!!!!!!! NEW REQUEST !!!!!!!!!!!!!!!!!!'); 
  console.log('!!!!!!!!!!!!!!!!! NEW REQUEST !!!!!!!!!!!!!!!!!!'); 
  console.log('!!!!!!!!!!!!!!!!! NEW REQUEST !!!!!!!!!!!!!!!!!!'); 
  console.log('!!!!!!!!!!!!!!!!! NEW REQUEST !!!!!!!!!!!!!!!!!!'); 
  console.log(req.headers);
  console.log('COOKIES COOKEIS COOKIES COOKIES COOKIES COOKIES'); 
  console.log('request: ', req.params;
  
  console.log('!!!!!!!!!!!!!!!!! END REQUEST !!!!!!!!!!!!!!!!!!'); 
  console.log('!!!!!!!!!!!!!!!!! END REQUEST !!!!!!!!!!!!!!!!!!'); 
  console.log('!!!!!!!!!!!!!!!!! END REQUEST !!!!!!!!!!!!!!!!!!'); 
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