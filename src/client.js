import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/App';
import configureStore from './common/configureStore';

const store = configureStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
if (module.hot) {
  module.hot.accept();
}
