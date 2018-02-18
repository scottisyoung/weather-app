import {createStore, applyMiddleware} from 'redux';
import reducer from './ducks/weather.js';
import promiseMiddleware from 'redux-promise-middleware';

export default createStore(reducer, applyMiddleware(promiseMiddleware())
);