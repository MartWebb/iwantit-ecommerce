import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOfProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

function ProductEditPage({ match, history }) {
    const [ uploadLoading, setUploadLoading ] = useState(false);
    const [ uploadError, setUploadError ] = useState('');
    const productId = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, product, error} = productDetails;

    const userLogin = useSelector(state => state.userLogin );
    const { userInfo } = userLogin;

    const productUpdate = useSelector(state => state.productUpdate);
    const { 
        loading: updateLoading,
        success: updateSuccess, 
        error: updateError 
    } = productUpdate;


    useEffect(() => {
        if (updateSuccess) {
            history.push('/productlist');
        }
        if (!product || product._id !== productId || updateSuccess) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detailsOfProduct(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description);
        }
        
    }, [product, dispatch, productId, updateSuccess, history]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateProduct({
            _id: productId, 
            name, 
            price, 
            image, 
            category,
            brand, 
            countInStock, 
            description
        }));
    };

    const uploadFileHandler = async (event) => {
        const file = event.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploadLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.post('/api/uploads', bodyFormData, config);

            setImage(data);
            setUploadLoading(false);
        } catch (error) {
            setUploadError(error.message);
            setUploadLoading(false);
        }
    };

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
                {updateLoading && <LoadingBox></LoadingBox>}
                {updateError && <MessageBox variant="danger">{updateError}</MessageBox>}
                {loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                <>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input 
                            id="name" 
                            type="text" 
                            placeholder="Enter name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input 
                            id="price" 
                            type="text" 
                            placeholder="Enter price"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <label htmlFor="image">Image</label>
                        <input 
                            id="image" 
                            type="text" 
                            placeholder="Enter image"
                            value={image}
                            onChange={(event) => setImage(event.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <label htmlFor="imageUpload">Image Upload</label>
                        <input 
                            type="file" 
                            id="imageUpload"
                            label="Choose an Image"
                            onChange={uploadFileHandler}
                        >
                        </input>
                        {uploadLoading && <LoadingBox></LoadingBox>}
                        {uploadError && <MessageBox variant="danger">{uploadError}</MessageBox>}
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <input 
                            id="category" 
                            type="text" 
                            placeholder="Enter category"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <label htmlFor="countInStock">Count In Stock</label>
                        <input 
                            id="countInStock" 
                            type="text" 
                            placeholder="Enter Count In Stock"
                            value={countInStock}
                            onChange={(event) => setCountInStock(event.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <label htmlFor="brand">Brand</label>
                        <input 
                            id="brand" 
                            type="text" 
                            placeholder="Enter brand"
                            value={brand}
                            onChange={(event) => setBrand(event.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <label htmlFor="name">Description</label>
                        <textarea 
                            id="description" 
                            rows="3"
                            type="text" 
                            placeholder="Enter description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        >
                        </textarea>
                    </div>
                    <div>
                        <label></label>
                        <button className="primary" type="submit">
                            Update
                        </button>
                    </div>
                </>
                }
            </form>
        </div>
    )
}

export default ProductEditPage;
