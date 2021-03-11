import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBar from './SearchBar';
import { listProductCategories } from '../actions/productActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

function Header() {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    const cart = useSelector(state => state.cart);
	  const { cartItems } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productCategoryList = useSelector((state)  => state.productCategoryList);
    const { 
        loading: categoriesLoading, 
        error: categoriesError,
        categories  
    } = productCategoryList;
// console.log(userInfo.isAdmin)
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    useEffect(() => {
      dispatch(listProductCategories());
    }, [dispatch]);

    return (
      <>
          <header className="row">
          <div>
              <button
                type="button"
                className="open-sidebar"
                onClick={() => setSidebarIsOpen(true)}
              >
                <i className="fa fa-bars"></i>
              </button>
              <Link className="brand" to="/">I Want It</Link>
            </div>
            <div>
              <Route
                render={({history}) => ( <SearchBar history={history}></SearchBar> )}
              >
              </Route>
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
      <aside className={sidebarIsOpen ? 'open' : ''}>
        <ul className="categories">
          <li>
            <strong>Categories</strong>
            <button
              onClick={() => setSidebarIsOpen(false)}
              className="close-sidebar"
              type="button"
            >
              <i className="fa fa-close"></i>
            </button>
          </li>
          {categoriesLoading ? (
            <LoadingBox></LoadingBox>
          ) : categoriesError ? (
            <MessageBox variant="danger">{categoriesError}</MessageBox>
          ) : (
            categories.map((cat) => (
              <li key={cat}>
                <Link
                  to={`/search/category/${cat}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  {cat}
                </Link>
              </li>
            ))
          )}
        </ul>
      </aside>
        </>
    )
}

export default Header;
