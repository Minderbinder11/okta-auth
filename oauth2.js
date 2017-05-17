//oauth2.js

var request = require('request');
const querystring = require('querystring');

var client_id = '83xpWa4wpf7FhSOYDdgz';
var client_secret = '-s6qFUbhXPNmRHC8QB6H3HHcn1tkD4KM1pt7HQZi';

var clientandsecred = client_:

var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': Basic ${Base64(<client_id>:<client_secret>)}
};


function getOauth (sessionToken) {

	var options = {
		method: 'GET',
		url: 'https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/.well-known/oauth-authorization-server'
	};

	request(options, function(error, response, body){
		if (!error){
			body = JSON.parse(body);
			console.log(body);
		} else {
			console.log(error);
		}
	});

	var dataString = {
		//sessionToken: sessionToken,
		grant_type: 'password',
		//code: sessionToken,
		//response_type: 'id_token',
		username: 'pbarow@gmail.com',
		password: 'BH22escow',
		client_id: '83xpWa4wpf7FhSOYDdgz',
		redirect_uri: 'http://localhost:8000/authorization-code/callback',
		scope: 'openid',
		prompt: 'login',
		state: 'thisismystatestring',
		nonce: "78yu78yu78yu",
	}

	var qs = querystring.stringify(dataString);
	console.log(qs);

	var optionsAuth = {
		method: 'POST',
		url: 'https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/token',
		headers: headers,
		data: qs
	};

	request(optionsAuth, function(err, res, body){
		if (!err){
			console.log('body: ', body);
		} else {
			console.log(err)
		}

	});
}
getOauth('dddd');

module.exports = getOauth;




// { issuer: 'https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7',
//   authorization_endpoint: 'https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/authorize',
//   token_endpoint: 'https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/token',
//   jwks_uri: 'https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/keys',
//   response_types_supported: [ 'code', 'token', 'code token' ],
//   response_modes_supported: [ 'query', 'fragment', 'form_post', 'okta_post_message' ],
//   grant_types_supported: 
//    [ 'authorization_code',
//      'implicit',
//      'refresh_token',
//      'password',
//      'client_credentials' ],
//   subject_types_supported: [ 'public' ],
//   scopes_supported: [ 'offline_access' ],
//   token_endpoint_auth_methods_supported: [ 'client_secret_basic', 'client_secret_post', 'none' ],
//   claims_supported: [ 'ver', 'jti', 'iss', 'aud', 'iat', 'exp', 'cid', 'uid', 'scp', 'sub' ],
//   code_challenge_methods_supported: [ 'S256' ],
//   introspection_endpoint: 'https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/introspect',
//   introspection_endpoint_auth_methods_supported: [ 'client_secret_basic', 'client_secret_post', 'none' ],
//   revocation_endpoint: 'https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/revoke',
//   revocation_endpoint_auth_methods_supported: [ 'client_secret_basic', 'client_secret_post', 'none' ] }

// var headers = {
//     'Accept': 'application/json',
//     'Cache-Control': 'no-cache',
//     //'Content-Type': 'application/x-www-form-urlencoded'
// };

// var dataString = {
// 	sessionToken: sessionToken,
// 	response_type: 'id_token',
// 	client_id: '83xpWa4wpf7FhSOYDdgz',
// 	redirect_uri: 'http://localhost:8000/authorization-code/callback',
// 	scope: 'openid',
// 	state: 'thisismystatestring',
// 	nonce: "78yu78yu78yu",
// }

// var qs = querystring.stringify(dataString);
// console.log(qs);

// //grant_type=password&username=pbarow%40gmail.com&password=BH22escow&scope=openid&client_id=83xpWa4wpf7FhSOYDdgz&client_secret=-s6qFUbhXPNmRHC8QB6H3HHcn1tkD4KM1pt7HQZi';

// var options = {
//     url: 'https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/authorize'+'?'+qs ,
//     method: 'GET',
//     headers: headers
//     //body: qs
// };

// function callback(error, response, body) {
//     if (!error) {
//         console.log('body: ', body);
//     } else {
//     	console.log('error: ', error);
//     }
// }

// request(options, callback);




 // var dataString3 = '{"client_id": "83xpWa4wpf7FhSOYDdgz","response_type":"id_token","scope":"openid","prompt":"none","redirect_uri":"http://localhost:8000/callback/redirect","state": "thisismystatestring","nonce": "78yu78yu78yu","sessionToken":"'+sessionToken+'"}'; 

 //        var options3 = {
 //            url: 'https://dev-477147.oktapreview.com/oauth2/v1/authorize',
 //            method: 'POST',
 //            headers: headers,
 //            body: dataString3
 //        };

 //        function callback3(error, response, body) {
 //          if (error) {
 //            console.log('error', error);
 //          } else {
 //            console.log('body', body);
 //          }
 //        }

 //        request(options3, callback3);




