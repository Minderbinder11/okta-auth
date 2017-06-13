// serverSSR.js
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../components/app2';
import template from '../components/template';

const app = express();

app.get('/', (req, res) => {
  const appString = renderToString(<App />);

  res.send(template({
    body: appString,
    title: 'FROM THE SERVER'
  }));
});

const port = 3000;
app.listen(port);
console.log(`Listening on port ${port}`);