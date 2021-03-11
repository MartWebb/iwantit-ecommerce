import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

function SearchPage(props) {
    const { name = 'all', category = 'all'} = useParams();

    const productList = useSelector((state)  => state.productList);
    const { loading, error, products } = productList;

    const productCategoryList = useSelector((state)  => state.productCategoryList);
    const { 
        loading: categoriesLoading, 
        error: categoriesError,
        categories  
    } = productCategoryList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            listProducts({
                name: name !==  'all' ? name : '',
                category: category !==  'all' ? category : ''
            }));
    }, [dispatch, name, category]);

    const getFilteredUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        return `/search/category/${filterCategory}/name/${filterName}`;
    }

    return (
        <div>
            <div className="row">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                <div>{products.length} Results</div>
                )}
            </div>
            <div className="row top">
                <div className="col-1">
                    <h3>Department</h3>
                    {categoriesLoading ? (
                        <LoadingBox></LoadingBox>
                    ) : categoriesError ? (
                        <MessageBox variant="danger">{categoriesError}</MessageBox>
                    ) : (
                        <ul>
                            {categories.map((cat) => (
                                <li key={cat}>
                                    <Link 
                                        className={cat === category ? 'active' : ''}
                                        to={getFilteredUrl({category: cat})}
                                    >
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="col-3">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                    <>
                    {products.length === 0 && (
                        <MessageBox>No product Found</MessageBox>
                    )}
                    <div className="row center">
                        {products.map(product => (
                            <Product key={product._id} product={product}></Product>
                        ))}
                    </div>
                    </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchPage;
