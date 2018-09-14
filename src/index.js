import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/Home/Home';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import store from './store';

const render = () => {
  return !isSigned ? (
    <Provider store={store}>
      <App />
    </Provider>
  ) : (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

let isSigned;

store.subscribe(()=>{
  isSigned = store.getState().user.isSignedIn;
  ReactDOM.render(render(),document.getElementById('root'));
});

ReactDOM.render(render(),document.getElementById('root'));
registerServiceWorker();
