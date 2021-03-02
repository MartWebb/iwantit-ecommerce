import React, { useEffect } from 'react';
// import axios from 'axios';
// import data from "../data";
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomePage() {
    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const productList = useSelector( state => state.productList);
    const { loading, error, products } = productList;
    
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])
    return (
        <div>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                    <div className="row center">
                        {products.map(product => (
                        <Product key={product._id} product={product}/>
                        ))}
                    </div>
                </>
            )}
            
        </div>
    )
}

export default HomePage;
