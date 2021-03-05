import axios from "axios";
import { 
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_DETAILS_FAIL, 
    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_SUCCESS,
    ORDER_HISTORY_FAIL,
    ORDER_HISTORY_REQUEST,
    ORDER_HISTORY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
} from "../constants/orderConstants";
import { CART_EMPTY } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });

    try {
        const { userLogin: { userInfo }} = getState();

        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/api/orders', order, config);

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order});
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem('cartItems');
    } catch (error) {
        
        dispatch({ 
            type: ORDER_CREATE_FAIL, 
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        });
    }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId});

    const { userLogin: { userInfo } } = getState();

    try {
        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${orderId}`, config);
        
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
        
    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message});
    }
};

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });

    

    try {
        const { userLogin: { userInfo }} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = axios.put(`/api/orders/${order._id}/pay`, paymentResult, config);
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_PAY_FAIL, payload: message});
    }
    
};

export const listMyOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_HISTORY_REQUEST});

    const { userLogin: { userInfo }} = getState();
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get('/api/orders/myorders', config);
        dispatch({ type: ORDER_HISTORY_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_HISTORY_FAIL, payload: message});
    }
};