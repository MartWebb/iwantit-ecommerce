import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

function CartPage({ match, location, history}) {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    
    const cart = useSelector((state) => state.cart);
    const { cartItems, error } = cart;

    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        history.push('/loginin?redirect=shipping')
    };

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                
                {cartItems.length === 0 
                ? <MessageBox>
                    Cart is empty.
                    <Link to="/"> Go Shopping</Link>
                </MessageBox>
                :
                (
                    <ul>
                        {
                            cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="small"
                                            >
                                            </img>
                                        </div>
                                        <div className="mmin-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select 
                                                value={item.qty} 
                                                onChange={event => 
                                                    dispatch(
                                                        addToCart(item.product, Number(event.target.value))
                                                        
                                                    )
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map(
                                                    (count) => (
                                                        <option key={count + 1} value={count + 1}>
                                                            {count + 1}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                        <div>${item.price}</div>
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                )}
            </div>
            <div className="col-1">
                <div className="card card-body">
                        <ul>
                            <li>
                                <h2>
                                    Subtotal ({cartItems.reduce((accumulator, current) => accumulator + current.qty, 0)} items : 
                                    ${cartItems.reduce((accumulator, current) => accumulator + current.price * current.qty, 0)}))
                                </h2>
                            </li>
                            <li>
                                <button 
                                    className="primary block" 
                                    type="button" 
                                    onClick={checkoutHandler} 
                                    disabled={cartItems.length === 0}
                                >
                                    Proceed to Checkout
                                </button>
                            </li>
                        </ul>
                </div>
            </div>
        </div>
    )
}

export default CartPage;
