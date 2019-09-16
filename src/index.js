import React from 'react';
import ReactDOM from 'react-dom';
import'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './App';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import { createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk'

import {BrowserRouter} from 'react-router-dom';
ReactDOM.render(<Provider store={createStore(rootReducer, applyMiddleware(thunkMiddleware))}>
<BrowserRouter>
    <App />
</BrowserRouter>
</Provider>, document.getElementById('root'));

