import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware,compose,combineReducers,createStore} from "redux";
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import {userReducers} from "./Store/Reducer/userReducers";
import 'react-toastify/dist/ReactToastify.css';

const composeEnhancer = window.REUX_DEVTOOLS_EXTENCION_COMPOSE || compose();
const rootReducer = combineReducers({
    users: userReducers,
});

const store = createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app,document.getElementById('root'))
