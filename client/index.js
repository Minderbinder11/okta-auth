//index.js

var username = document.getElementById('username');
var password = document.getElementById('password');
var button = document.getElementById('submit');
var oathbutton = document.getElementById('oauth');

button.addEventListener('click', () => {

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://dev-477147.oktapreview.com/api/v1/authn",
  "method": "POST",
  "headers": {
    "accept": "application/json",
    "content-type": "application/json",
    "cache-control": "no-cache"
   // "postman-token": "51006683-c1eb-9b33-680b-d87f1a8f90c6"
  },
  "processData": false,
  "data": "{\n  \"username\": \"steinbeck@dev-477147.com\",\n  \"password\": \"Barnegat01\",\n  \"options\": {\n    \"multiOptionalFactorEnroll\": true,\n    \"warnBeforePasswordExpired\": true\n  }  \n}"
};





$.ajax(settings).done(function (response) {
  console.log(response._embedded.user.id);


  var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://dev-477147.oktapreview.com/api/v1/users/"+ response._embedded.user.id +"/factors");
xhr.setRequestHeader("accept", "application/json");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("authorization", "SSWS 00p_Z5emQrIXfw228qBmju0GtmVdDb3V_Vp0gwkpNb");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "fe913a36-24f0-1a27-9d35-71225b23b230");

xhr.send(data);

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://dev-477147.oktapreview.com/api/v1/users/" + response._embedded.user.id + "/factors",
      "method": "GET",
      "headers": {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "SSWS 00p_Z5emQrIXfw228qBmju0GtmVdDb3V_Vp0gwkpNb",
        "cache-control": "no-cache"
       // "postman-token": "fc197e16-5f84-a18c-9abe-7e08f391b499"
      }
    };

    $.ajax(settings).done(function (response) {
      console.log('mfa response: ', response);
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

});


oathbutton.addEventListener('click', () => {

  //window.location.replace('https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/authorize?client_id=83xpWa4wpf7FhSOYDdgz&response_type=code&response_mode=query&prompt=none&scope=offline_access&redirect_uri=http://localhost:8000/authorization-code/callback&state=statestring&nonce=ghghghgh787878');

  // axios.get('/loginoauth')
  // .then(response => {
  //   var login = document.getElementById('okta-login');

  //   console.log(response.data);
  //   login.innerHTML(response.data);
  //   //console.log('response good: ', response.data);
  // })
  // .catch(err => {
  //   console.log('error', err);
  // });

});
