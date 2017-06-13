
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

var orgUrl = 'https://dev-477147.oktapreview.com';
const clientId = 'cEBoZvS44tkt5R5VL7pX';
var redirectUrl = 'http://localhost:8000/authorization-code/callback';


var authClient = new OktaAuth({
	url: orgUrl,
	clientId: clientId,
  redirectUri: redirectUrl,
  scopes: ['openid', 'email', 'profile'],
});


   authClient.token.getWithRedirect({
				responseType: 'code'
				//responseType: 'access_token', // or array of types
			  // sessionToken: transaction.sessionToken // optional if the user has an existing Okta session
			})
			.then(function(token) {
			  // manage token or tokens
				console.log('token: ', token)

			})
			.catch(function(err) {
			  // handle OAuthError
			});

// 	authClient.signIn({
// 	  username: 'pbarow@gmail.com',
// 	  password: 'LA88escow',

// 	})
// 	.then(function(transaction) { // On success

// 	    console.log('success: ', transaction);

// 	  switch(transaction.status) {
	      
// 	    case 'SUCCESS':
// 	     // authClient.session.setCookieAndRedirect(transaction.sessionToken); // Sets a cookie on redirect


	  


// 	      break;



$('#btnSignOut').click(function () {

  oktaSignIn.session.exists(function (authenticated) {
   
    if (authenticated) {
      sessionStorage.removeItem('sessionTokenKey');
      oktaSignIn.tokenManager.remove('my_id_token');
      
      oktaSignIn.session.close(function () {
          $("#apicall-buttons").hide();
          $('#sign-in-container').show();
          location.reload(true)
        
      });
    };
  });
});

  $('#btnRenewIDToken').click(function () {
      oktaSignIn.tokenManager.refresh('my_id_token').
      then(function (res) {
        
        console.log('token manager refresh: ', res);  
        var d =    
        console.log('New ID token: ', new Date(res.claims.iat*1000));
        $('#iat').html(new Date(res.claims.iat*1000));
        $('#exp').html(new Date(res.claims.exp*1000));
        
      });
  });
