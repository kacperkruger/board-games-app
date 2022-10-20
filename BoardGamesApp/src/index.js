import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import gamesReducer from './ducks/games/index';
import publisherReducer from './ducks/publishers/index';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { setupSocket } from "./sockets";
import socketPasser from "./middlewares/socketPasser";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak"

const store = createStore(
    combineReducers({
        games: gamesReducer,
        publishers: publisherReducer,
    }), applyMiddleware(thunk, logger, socketPasser)
);

setupSocket(store.dispatch)

ReactDOM.render(
    <React.StrictMode>
        <ReactKeycloakProvider authClient={keycloak}>
            <Provider store={store}>
                <App />
            </Provider>
        </ReactKeycloakProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
