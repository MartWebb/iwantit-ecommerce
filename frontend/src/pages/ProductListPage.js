import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';


function ProductListPage({ history, match }) {
    const sellerMode = match.path.indexOf('/seller') >= 0;
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const productCreate = useSelector(state => state.productCreate);
    const { 
        loading: createLoading, 
        product: createdProduct, 
        error: createError, 
        success: createSuccess 
    } = productCreate;

    const productDelete = useSelector(state => state.productDelete);
    const { 
        loading: deleteLoading, 
        success: deleteSuccess, 
        error: deleteError 
    } = productDelete;

    const userLogin = useSelector(state => state.userLogin );
    const { userInfo } = userLogin;
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (createSuccess) {
           dispatch({ type: PRODUCT_CREATE_RESET});
           history.push(`/product/${createdProduct._id}/edit`);
        }
        if (deleteSuccess) {
            dispatch({ type: PRODUCT_DELETE_RESET});
         }
        dispatch(listProducts({seller: sellerMode ? userInfo._id : '' }));
    }, [dispatch, createdProduct, history, createSuccess, deleteSuccess]);

    const deleteHandler = (product) => {
        if (window.confirm('Are you sure you want to delete a product?')) {
            dispatch(deleteProduct(product._id));
        }
    };

    const createHandler = () => {
        dispatch(createProduct());
    };

    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button 
                    type="button" 
                    className="primary" 
                    onClick={createHandler}
                >
                    Create Product
                </button>
            </div>
            {deleteLoading && <LoadingBox></LoadingBox>}
            {deleteError && <MessageBox variant="danger">{deleteError}</MessageBox>}
            {createLoading && <LoadingBox></LoadingBox>}
            {createError && <MessageBox variant="danger">{createError}</MessageBox>}
            {loading ? ( <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox>{error}</MessageBox>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() => {
                                                history.push(`/product/${product._id}/edit`);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="small" 
                                            type="button"
                                            onClick={() => deleteHandler(product)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                
                            ))}
                        </tbody>
                    </table>
                )

                }
        </div>
    )
}

export default ProductListPage;
