import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducers';

const composeReducers = composeWithDevTools({});

const initialStore = {
    cartReducer: {
        cartitems : JSON.parse(localStorage.getItem('cartitems')) ?? '[]'
    }
}

export const store = createStore(rootReducer,initialStore,composeReducers());