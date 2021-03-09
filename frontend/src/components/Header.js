import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

function Header() {
    const cart = useSelector(state => state.cart);
	const { cartItems } = cart;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
// console.log(userInfo.isAdmin)
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
                                        <Link to="/profile">User Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderhistory">Order History</Link>
                                    </li>
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
                    {userInfo && userInfo.isSeller && (
                      <div className="dropdown">
                        <Link to="#seller">
                          Seller <i className="fa fa-caret-down"></i>
                        </Link>
                        <ul className="dropdown-content">
                          <li>
                            <Link to="/productlist/seller">Products</Link>
                          </li>
                          <li>
                            <Link to="/orderlist/seller">Orders</Link>
                          </li>
                        </ul>
                      </div>
                    )}
                    {userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                          <Link to="#admin">
                            Admin <i className="fa fa-caret-down"></i>
                          </Link>
                          <ul className="dropdown-content">
                            <li>
                              <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                              <Link to="/productlist">Products</Link>
                            </li>
                            <li>
                              <Link to="/orderlist">Orders</Link>
                            </li>
                            <li>
                              <Link to="/userlist">Users</Link>
                            </li>
                          </ul>
                        </div>
                      )}
				</div>
		</header>
    )
}

export default Header;
