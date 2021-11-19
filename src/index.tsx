import React from 'react';
import ReactDOM from 'react-dom';
import './_reset.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/features/string/repeat';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'
import util from "./util/util";

declare global {
    interface Window {
        $Global: any;
        daum: any;
    }
}

window.$Global = util;

ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
