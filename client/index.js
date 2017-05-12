//index.js

var username = document.getElementById('username');
var password = document.getElementById('password');
var button = document.getElementById('submit');

button.addEventListener('click', () => {
  console.log('Username:', username.value);
  console.log('Password:', password.value);

  axios.get('/login')
  .then(response => {
      console.log('in client response');
      window.location.replace(response.data.redirect);
    })
    .catch(err => {
      console.log(err);
    });      

// CURL REQUEST - I need to update the session token before making this request, this is aall to sessions, I want a call to auth    
//curl -v POST -H "Accept: application/json" -H "Content-Type: application/json" -d '{"sessionToken": "20111BTAQMZ4QghQyrdXJ3wIziPVYMd9Bhq0ECntRYCxfnCmeZeAD4x"}' "https://dev-477147.oktapreview.com/api/v1/sessions"

});


// issue here is the request is a node module.  I can try to incude it in the index html

// var clientId = 'uyeLjjo3J7bbVpLnTlrV';
// var redirectUrl = 'http://localhost:8000/callback/redirect';

// var dataString = {
//   "username": 'pbarow@gmail.com',
//   "password": 'BH22escow',
//   "relayState": "http://localhost:8000/callback/redirect",
//   "options": {
//     "multiOptionalFactorEnroll": false,
//     "warnBeforePasswordExpired": false
//   }
// };


// axios.post('https://dev-477147.oktapreview.com/api/v1/authn', dataString, {
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   }
//     // other configuration there
//   })
//   .then(function (response) {

//     if (response.errorcode) {
//       // send request to server to load the wrong page 
//       axios.get('/callback/redirect');
//       return;
//     }

//     console.log('response: ', response);
//     if (response.data.status === 'SUCCESS') {
//       console.log(response.data);
//       var sessionToken = response.data.sessionToken;

//       axios.get('http://localhost:8000/callback/redirect/' + sessionToken, {
//         someWords: 'kiteallday'
//       })
//         // headers: {
//         //   "Accept": "application/json",
//         //   "Content-Type" : "application/json"
//         // })
//       .then(function(response){
//         console.log(response);
//       })
//       .catch(function(err) {
//         console.log('error ', err);
//       });

      // axios({
      //   method: 'post',
      //   url: "https://dev-477147.oktapreview.com/api/v1/sessions",
      //   data: {
      //     "sessionToken": sessionToken
      //   },
      //   headers: {
      //     "Accept": "application/json",
      //     "Content-Type" : "application/json"
      //   }
      // })
      // .then(function(response) {
      //   console.log(response);
      // })
      // .catch(function(error) {
      //   console.log('error: ', error);
      // });



      // var address = `https://dev-477147.oktapreview.com/api/v1/sessions?additionalFields=cookieToken`;

      // var options2 = {
      //   "sessionToken": sessionToken,
      // };

      // axios.post(address, options2, {headers: {
      //                     'Accept': 'application/json',
      //                     'Content-Type': 'application/json',
      //                     'Authorization': 'SSWS 00p_Z5emQrIXfw228qBmju0GtmVdDb3V_Vp0gwkpNb'
      //   }}).then(function(data) {
      //     console.log('inside 2nd axios call');
      //   });

      //`https://dev-477147.okta.com/oauth2/v1/authorize?client_id={clientId}&response_type=id_token&scope=openid&prompt=none&redirect_uri=https%3A%2F%2Fyour-app.example.com&state=Af0ifjslDkj&nonce=n-0S6_WzA2Mj&sessionToken=0HsohZYpJgMSHwmL9TQy7RRzuY`;
     // window.location.href = response.data.relayState;
//     } else if (response.data.status === 'MFA_REDIRECT') {