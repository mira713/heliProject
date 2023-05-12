import {legacy_createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import cardReducer from './reducer';

export const store = legacy_createStore(cardReducer,applyMiddleware(thunk))