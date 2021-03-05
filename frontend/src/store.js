import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer, productCreateReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { 
    userDetailsReducer, 
    userLoginReducer, 
    userRegisterReducer, 
    userUpdateProfileReducer 
} from './reducers/userReducers';
import { 
    listMyOrdersReducer, 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer 
} from './reducers/orderReducers';

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') 
? JSON.parse(localStorage.getItem('cartItems'))
: [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem('userInfo'))
: null;

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') 
? JSON.parse(localStorage.getItem('shippingAddress'))
: {};

const initialState = {
    userLogin: {
        userInfo: userInfoFromLocalStorage
    },
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage,
        paymentMethod: 'PayPal'
    }
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyHistory: listMyOrdersReducer

});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;