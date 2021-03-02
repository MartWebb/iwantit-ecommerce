import axios from "axios";
import { CART_ADD_ITEM_FAIL, CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants"

//dispatch and getState are from redux funk
export const addToCart = (productId, qty) => async (dispatch, getState) => {

    try {
        const {data} = await axios.get(`/api/products/${productId}`);
        dispatch({ 
            type: CART_ADD_ITEM, 
            payload: {
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                product: data._id,
                qty
            }});
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        dispatch({ type: CART_ADD_ITEM_FAIL,
        payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        });
    }
};

export const saveShippingAddress = (data) => async (dispatch) => {
    
        dispatch({ type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data });

        localStorage.setItem('shippinAddress', JSON.stringify(data));
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload:productId
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const savePaymentMethod = (data) => async (dispatch) => {
    
    dispatch({ type: CART_SAVE_PAYMENT_METHOD,
    payload: data });
};