import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, CART_EMPTY } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: []}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const itemExists = state.cartItems.find(cartItem => cartItem.product === item.product);
            if(itemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((cartItem) => 
                        cartItem.product === itemExists.product ? item : cartItem),
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, item]};
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.product !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload 
            } 
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }  
        case CART_EMPTY:
            return { ...state, cartItems: [] };     
        default:
            return state;
    }
};

export const removeFromCartReducer = (state, action) => {
    switch (action.type) {
        

    }
}