//sessions.js
var request = require('request');

function getSession (sessionToken) {
  var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  };

  var dataString = '{"sessionToken": "' + sessionToken + '"}';

  console.log('in sessions sessionToken: ', sessionToken);

  var options = {
      url: 'https://dev-477147.oktapreview.com/api/v1/sessions',
      method: 'POST',
      headers: headers,
      body: dataString
  };

  function callback(error, response, body) {
      if (!error) {
          body = JSON.parse(body);
          console.log(body);
      } else {
        console.log('error: ', error);
      }
  }

  request(options, callback);

}

module.exports = getSession;
