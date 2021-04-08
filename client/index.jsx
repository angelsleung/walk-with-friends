import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  libraries: ['places']
});

loader.load().then(() => {
  ReactDOM.render(
    <App />,
    document.querySelector('#root')
  );
});
