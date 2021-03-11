import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { 
    productListReducer, 
    productDetailsReducer, 
    productCreateReducer, 
    productUpdateReducer, 
    productDeleteReducer,
    productCategoryListReducer,
    productCreateReviewReducer
 } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { 
    userDeleteReducer,
    userDetailsReducer, 
    userListReducer, 
    userLoginReducer, 
    userRegisterReducer, 
    userTopsellerListReducer, 
    userUpdateProfileReducer, 
    userUpdateReducer
} from './reducers/userReducers';
import { 
    listMyOrdersReducer, 
    orderCreateReducer, 
    orderDeleteReducer, 
    orderDeliverReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    ordersListReducer
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
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productCategoryList: productCategoryListReducer,
    productCreateReview: productCreateReviewReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userTopsellerList: userTopsellerListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyHistory: listMyOrdersReducer,
    orderList: ordersListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;