//loginPage.jsx

import React from 'react';
import OktaAuth from '@okta/okta-auth-js/jquery';

var clientId = 'cEBoZvS44tkt5R5VL7pX'; // Your client id
const oktaUrl = 'https://dev-477147.oktapreview.com';
const redirectUrl = 'http://localhost:8000/authorization-code/callback';



export default class LoginPage extends React.Component {

	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
		this.authClient = new OktaAuth({
      url: oktaUrl,
      clientId: clientId,
      redirectUri: redirectUrl,
      scopes: ['openid', 'email', 'profile']
    });
	}

  login(e) {
    e.stopPropagation();
    e.preventDefault();
    this.authClient.token.getWithRedirect({ responseType: 'code' });
  }

	render() {
    console.log('in render');
		return (
      <div>
        <p>
          Click <strong>Login with Okta</strong> to redirect to your Okta org for
          authentication.
        </p>
        <p>
          <button id="login" data-se="login-link" className="button" onClick={this.login}>
            <i className="sign in icon" />
            Login with Okta
          </button>
        </p>
      </div>
			);
	}	

};
