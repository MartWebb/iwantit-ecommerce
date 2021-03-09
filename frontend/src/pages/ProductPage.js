import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Rating from '../components/Rating';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { detailsOfProduct } from '../actions/productActions';
// import data from '../data';

function ProductPage({ history, match}) {
    // const product = data.products.find(item => item._id === props.match.params.id);
    const dispatch = useDispatch();
    const productId = match.params.id;

    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    console.log(product)

    // if (!product) {
    //     return <div>Product not Found</div>;
    // }
    useEffect(() => {
        dispatch(detailsOfProduct(productId))
    }, [dispatch, productId]);

    const addToCartHandler  = () => {
        history.push(`/cart/${productId}?qty=${qty}`)
    };

    return (
        <>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    <Link to="/">Back to home</Link>
                    <div className="row top">
                        <div className="col-2">
                            <img className="large" src={product.image} alt={product.name}></img>
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li>
                                    <Rating
                                        rating={product.rating} 
                                        numReviews={product.numReviews}
                                    >    
                                    </Rating>
                                </li>
                                <li>Price: ${product.price}</li>
                                <li>
                                    Description:
                                    <p>{product.description}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        Seller{' '}
                                        <h2>
                                            <Link to={`/seller/${product.seller._id}`}>
                                                {product.seller.seller.name}
                                            </Link>
                                        </h2>
                                        <Rating
                                            rating={product.seller.seller.rating}
                                            numReviews={product.seller.seller.numReviews}
                                        >    
                                        </Rating>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price">${product.price}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                            <div>
                                                {product.countInStock > 0 
                                                    ? ( <span className="success">In Stock</span> 
                                                    ) : ( <span className="error">Unavailable</span>
                                                    )}
                                            </div>
                                        </div>
                                    </li>
                                    {product.countInStock > 0 && (
                                        <>
                                            <li>
                                                <div className="row">
                                                    <div>Quantity</div>
                                                
                                                    <div>
                                                        <select
                                                            value={qty}
                                                            onChange={event => setQty(event.target.value)}
                                                        >
                                                            {[...Array(product.countInStock).keys()].map(
                                                                (count) => (
                                                                    <option key={count + 1} value={count + 1}>{count + 1}</option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <button className="primary block" onClick={addToCartHandler}>Add to Cart</button>
                                            </li>
                                        </>
                                    )} 
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
        
    )
}

export default ProductPage;

