import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: 'AIzaSyCG4ySJPtAS0a5rJRHZV8uPM6fgOzCZD0A',
  libraries: ['places']
});

loader.load().then(() => {
  ReactDOM.render(
    <App />,
    document.querySelector('#root')
  );
});
