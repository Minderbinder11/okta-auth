<<<<<<< HEAD

//index.js

var username = document.getElementById('username');
var password = document.getElementById('password');
var button = document.getElementById('submit');

button.addEventListener('click', () => {

  axios.get('/login')
  .then(response => {
    console.log('in respnse: ', response);
  });

});      

/*
 * api/vi/sessions
 * this will take a sessionToken  and retrun a sessionsCookie
 * sessionsCookie provide access to your Okta organization and applications across 
 * web requests for an interactive user agent such as a web browser.
 */

// CURL REQUEST - I need to update the session token before making this request, 
// this is aall to sessions, I want a call to auth    
// curl -v POST -H "Accept: application/json" -H "Content-Type: application/json" -d '{"sessionToken": "20111BTAQMZ4QghQyrdXJ3wIziPVYMd9Bhq0ECntRYCxfnCmeZeAD4x"}' "https://dev-477147.oktapreview.com/api/v1/sessions"

//app.js
// var qs = require('querystring');

=======
//index.js

>>>>>>> a9c53a10aeafb4b8f8a9d0cfd8ff849625472f73
var orgUrl = 'https://dev-477147.oktapreview.com';
const clientId = 'cEBoZvS44tkt5R5VL7pX';
var redirectUrl = 'http://localhost:8000/authorization-code/callback';


var authClient = new OktaAuth({
	url: orgUrl,
	clientId: clientId,
  redirectUri: redirectUrl,
  scopes: ['openid', 'email', 'profile'],
});

var submit = document.getElementById('submit');

submit.addEventListener('click', (e) => { 
	authClient.token.getWithRedirect({
		responseType: 'code'
	})
});  


