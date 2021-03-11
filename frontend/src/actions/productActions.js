import { 
    PRODUCT_CREATE_FAIL, 
    PRODUCT_CREATE_REQUEST, 
    PRODUCT_CREATE_SUCCESS, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_UPDATE_FAIL, 
    PRODUCT_UPDATE_REQUEST, 
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL, 
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL
} from "../constants/productConstants";
import axios from 'axios';

export const listProducts = ({
    seller = '', 
    name = '', 
    category = '', 
    order = '',
    min = 0, 
    max = 0,
    rating = 0,
    
}) => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });

    try {
        const { data } = await axios.get(`/api/products?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`);
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};

export const listProductCategories = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_CATEGORY_LIST_REQUEST
    });

    try {
        const { data } = await axios.get(`/api/products/categories`);
        dispatch({type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
    }
};

export const detailsOfProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

    try {
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ 
            type: PRODUCT_DETAILS_FAIL, 
            payload: 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};

export const createProduct = () => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const { userLogin: { userInfo }} = getState();

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/products`, {}, config);
        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data.product });
    } catch (error) {
        dispatch({ 
            type: PRODUCT_CREATE_FAIL, 
            payload: 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};

export const deleteProduct = (productId) => (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const { userLogin: { userInfo }} = getState();
    try {
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const { data } = axios.delete(`api/products/${productId}`, config);
    dispatch({ type: PRODUCT_DELETE_SUCCESS })
    } catch (error) {
        dispatch({ type: PRODUCT_DELETE_FAIL, 
        payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message})
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });

    const { userLogin: { userInfo }} = getState();

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.put(`/api/products/${product._id}`, product, config);
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        });
    }
};

export const createReview = (productId, review) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

    const { userLogin: { userInfo }} = getState();

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/products/${productId}/reviews`, review, config);
        dispatch({type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data.review });
    } catch (error) {
        dispatch({ 
            type: PRODUCT_CREATE_REVIEW_FAIL, 
            payload: 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};
