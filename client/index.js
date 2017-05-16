//index.js

var username = document.getElementById('username');
var password = document.getElementById('password');
var button = document.getElementById('submit');
var oathbutton = document.getElementById('oauth');

button.addEventListener('click', () => {

  axios.get('/login')
  .then(response => {
      console.log('in client response');
      window.location.replace(response.data.redirect);
    })
    .catch(err => {
      console.log(err);
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

  window.location.replace('https://dev-477147.oktapreview.com/oauth2/ausahaw5ezTByBxnQ0h7/v1/authorize?client_id=83xpWa4wpf7FhSOYDdgz&response_type=code&response_mode=query&prompt=none&scope=offline_access&redirect_uri=http://localhost:8000/authorization-code/callback&state=statestring&nonce=ghghghgh787878');

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
