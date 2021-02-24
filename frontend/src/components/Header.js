import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

function Header() {
    const cart = useSelector(state => state.cart);
	const { cartItems } = cart;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header className="row">
				<div>
					<Link className="brand" to="/">I Want It</Link>
				</div>
				<div>
					<Link to="/cart"><i className="fas fa-shopping-cart"> Cart</i>
					{cartItems.length > 0 && (
						<span className="badge">{cartItems.length}</span>
					)}
					</Link>
                    {
                        userInfo ? (
                            <div className="dropdown">
                                <Link to="#">
                                    {userInfo.name} <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="#logout" onClick={logoutHandler}>
                                            Log Out
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/login">Log In</Link>
                        )
                    }
				</div>
		</header>
    )
}

export default Header;
