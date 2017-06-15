//index.js

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


