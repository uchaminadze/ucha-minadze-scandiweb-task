import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './App';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import {store} from './Redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});


ReactDOM.render(
  <React.StrictMode>

    <ApolloProvider client={client}>

      <Provider store={store}>
      <Router>
        <App />
      </Router>
      </Provider>

    </ApolloProvider>

  </React.StrictMode>,
  document.getElementById('root')
);