
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

// 	    default:
// 	      throw 'We cannot handle the ' + transaction.status + ' status';
// 	  }
// 	})
// 	.fail(function(err) { // On failure
// 	  console.error(err);
// });

var renderOktaWidget = function() {

  // oktaSignIn.session.exists(function (authenticated) {

  //   if(!authenticated) { 

  //     $("#apicall-buttons").hide();
  //     $('#sign-in-container').show();

  //     oktaSignIn.renderEl({ 
  //       el: '#sign-in-container' 
  //     },
  //     function (res) {

  //       oktaSignIn.tokenManager.add('my_id_token', res);
        
  //       if(res.status === 'SUCCESS') {

  //         if (  res.claims.iss === orgUrl && res.claims.aud === clientID &&
  //               res.claims.exp > Date.now()/1000 && res.claims.iat > Date.now()/1000 - 10 ) {
     	      
  //           $("#apicall-buttons").show();
  //           $('#sign-in-container').hide();
  //           $('#logged-in-res').append(res.claims.name);
  //           $('#first-name').append(res.claims.given_name);
  //           $('#last-name').append(res.claims.family_name);
  //           $('#username').append(res.claims.preferred_username);
  //           $('#iss').append(res.claims.iss);
  //           $('#iat').append(new Date(res.claims.iat*1000));
  //           $('#exp').append(new Date(res.claims.exp*1000)); 
  //         } 

  //       } else if (res.status === 'FORGOT_PASSWORD_EMAIL_SENT') {
          
  //         console.log('User %s sent recovery code via email to reset password', res.username);
  //       } else if (res.status === 'UNLOCK_ACCOUNT_EMAIL_SENT') {
  //           // res.username - value user entered in the unlock account form
  //           console.log('User %s sent recovery code via email to unlock account', res.username);
  //       }
  //     },
  //     function (err) { console.log('in err', err);
  //     });
  //   } else {
  //     $("#apicall-buttons").show();
  //     $('#sign-in-container').hide();
  //   }
  //  });     
};     


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


// renderOktaWidget();