import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './homePage.jsx';
import ProfilePage from './profilePage.jsx';
import { BrowserRouter, Route } from 'react-router-dom';


ReactDOM.render(
<BrowserRouter>
<div>
<Route exact path="/" component={HomePage} />
  <Route path='/profile' component={ProfilePage} />
  </div>
  </BrowserRouter>
  , document.getElementById('root'));