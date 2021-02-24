import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer } from './reducers/userReducers';

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') 
? JSON.parse(localStorage.getItem('cartItems'))
: [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem('userInfo'))
: [];

const initialState = {
    userLogin: {
        userInfo: userInfoFromLocalStorage
    },
    cart: {
        cartItems: cartItemsFromLocalStorage
    }
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;