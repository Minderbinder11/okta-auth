var request = require('request');

var headers4 = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-cache' 
  };

  var dataString4 = `{
    "grant_type": "password",
    "username": "pbarow@gmail.com",
    "password": "BH22escow",
    "scope": "openid",
    "client_id": "83xpWa4wpf7FhSOYDdgz"
    "client_secret": "-s6qFUbhXPNmRHC8QB6H3HHcn1tkD4KM1pt7HQZi"
  }`;

var options = {
  url: 'https://wev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/token',
  method: 'POST',
  headers: headers4,
  body: dataString4
  };

  function callback4(error, response, body) {
    if (!error) {
      console.log(body)
    } else {
      console.log(error)
    }
  }

  request(options, callback4);

 // curl -X POST \
 //  "https://wev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/token" \
 //  -H "Accept: application/json" \
 //  -H "Cache-Control: no-cache" \
 //  -H "Content-Type: application/x-www-form-urlencoded" \
 //  -d "grant_type=password&username=pbarow%40gmail.com&\
 //      password=BH22escow&scope=openid&client_id=83xpWa4wpf7FhSOYDdgz\
 //      & client_secret=-s6qFUbhXPNmRHC8QB6H3HHcn1tkD4KM1pt7HQZi"

 // curl -X POST "https://wev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/token" -H "Accept: application/json" -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded"-d "grant_type=password&username=pbarow%40gmail.com&password=BH22escow&scope=openid&client_id=83xpWa4wpf7FhSOYDdgz&client_secret=-s6qFUbhXPNmRHC8QB6H3HHcn1tkD4KM1pt7HQZi"

