import React from 'react';
import config from '../config.json';

export default class HomePage extends React.Component {

  constructor(props) {
    super (props);
    this.click = this.click.bind(this);
    this.authClient = new OktaAuth({
      url: config.oidc.oktaUrl,
      clientId: config.oidc.clientId,
      redirectUri: config.oidc.redirectUri,
      scopes: ['openid', 'email', 'profile'],
    });
  }

  click(e) {
    e.preventDefault();

    this.authClient.token.getWithRedirect({
      responseType: 'code'
    });
  }

  render () {
    return (
      <div>
        <div id="root" class="welcome">
          <img src="img/updateUser.png" class="login-image" />
          <button onClick={this.click}>Click here to access the ACME APIs</button>
        </div>
      </div>
    );
  }
}