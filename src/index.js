import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import createHistory from 'history/createBrowserHistory'
import { Route, Router, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { syncHistoryWithStore } from 'react-router-redux';
import axios from "axios"
import './index.css';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const history = createHistory()
// const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <BrowserRouter>
  {/* <React.StrictMode> */}
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  {/* </React.StrictMode> */}
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
