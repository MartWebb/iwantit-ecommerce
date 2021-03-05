import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOfProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function ProductEditPage({ match }) {
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

    useEffect(() => {
        if (!product || product._id !== productId) {
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
        
    }, [product, dispatch, productId]);

    const submitHandler = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
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
