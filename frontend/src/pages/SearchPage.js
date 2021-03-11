import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import prices  from '../utils/prices';
import ratings from '../utils/ratings';


function SearchPage({history}) {
    const { name = 'all', category = 'all', min = 0, max = 0, rating = 0, order = 'newest' } = useParams();

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
                category: category !==  'all' ? category : '',
                min,
                max,
                rating,
                order
            }));
    }, [dispatch, name, category, min, max, rating, order]);

    const getFilteredUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
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
                <div>
                    Sort by {' '}
                    <select 
                        value={order}
                        onChange={(event) => {
                            history.push(getFilteredUrl({ order: event.target.value }))
                        }}
                    >
                    <option value="newest">New Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                    </select>
                </div>
            </div>
            <div className="row top">
                <div className="col-1">
                    <h3>Department</h3>
                    <div>
                        {categoriesLoading ? (
                            <LoadingBox></LoadingBox>
                        ) : categoriesError ? (
                            <MessageBox variant="danger">{categoriesError}</MessageBox>
                        ) : (
                            <ul>
                                <li>
                                    <Link 
                                        className={'all' === category ? 'active' : ''}
                                        to={getFilteredUrl({category: 'all'})}
                                    >
                                        Any
                                    </Link>
                                </li>
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
                    <div>
                        <h3>Price</h3>
                        <ul>
                        {prices.map((price) => (
                            <li key={price.name}>
                            <Link
                                to={getFilteredUrl({ min: price.min, max: price.max })}
                                className={
                                `${price.min}-${price.max}` === `${min}-${max}` ? 'active' : ''
                                }
                            >
                                {price.name}
                            </Link>
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Avg. Customer Review</h3>
                        <ul>
                        {ratings.map((r) => (
                            <li key={r.name}>
                            <Link
                                to={getFilteredUrl({ rating: r.rating })}
                                className={`${r.rating}` === `${rating}` ? 'active' : ''}
                            >
                                <Rating caption={' & up'} rating={r.rating}></Rating>
                            </Link>
                            </li>
                        ))}
                        </ul>
                    </div>
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
