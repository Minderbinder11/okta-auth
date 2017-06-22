import React from 'react';
import axios from 'axios';

export default class ProfilePage extends React.Component {

  constructor(props) {
    super (props);
    this.click = this.click.bind(this);
  }

  click (e) {
    e.stopPropagation();
    axios.get('/test')
      .then(response => {
        console.log(response);
      });
  }

  render () {
    return (
      <div>
        <h2>Profile Page !!!</h2>
        <button onClick={this.click}> click me!</button>
      </div>
    );
  }
}