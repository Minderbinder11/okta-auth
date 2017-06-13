import React from 'react';
import OktaAuth from '@okta/okta-auth-js/jquery';

var clientId = 'cEBoZvS44tkt5R5VL7pX'; // Your client id
const oktaUrl = 'https://dev-477147.oktapreview.com';
const redirectUrl = 'http://localhost:8000/authorization-code/callback';

export default class ProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    const config = this.props.route.config;
    this.state.iatFormatted = (new Date(this.state.user.iat * 1000)).toString();
    this.state.expFormatted = (new Date(this.state.user.exp * 1000)).toString();
    this.authClient = new OktaAuth({ url: oktaUrl });
  }

  logout() {
    this.authClient.session.close().then(() => {
      window.location = '/authorization-code/logout';
    });
  }

  render() {
    return (
      <div className="profile">
        <h2 className="ui icon header">
          <i className="hand peace icon" />
          <div className="content">
            Signed In
          </div>
        </h2>
        <table className="ui collapsing celled table inverted black">
          <thead>
            <tr>
              <th colSpan="2">Some claims from the id_token</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>email</td><td data-se="email">some e-mail</td></tr>
            <tr><td>exp</td><td>{this.state.expFormatted}</td></tr>
          </tbody>
        </table>
        <p>
          <button
            id="logout"
            data-se="logout-link"
            onClick={this.logout}
            className="ui grey icon button"
          >
            <i className="sign out icon" />
            Sign out
          </button>
        </p>
      </div>
    );
  }
}
