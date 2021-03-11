// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import Header from './components/Header';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import AdminRoute from './components/AdminRoute';
import OrderListPage from './pages/OrderListPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import SellerRoute from './components/SellerRoute';
import SellerPage from './pages/SellerPage';
import SearchPage from './pages/SearchPage';

function App() {
	
	return (
		<BrowserRouter>
			<div className="grid-container">
				<Header />
				<main>
					<Route path="/seller/:id" component={SellerPage}></Route>
					<Route path="/cart/:id?" component={CartPage}></Route>
					<Route path="/product/:id" component={ProductPage} exact></Route>
					<Route path="/product/:id/edit" component={ProductEditPage} exact></Route>
					<Route path="/login" component={LoginPage}></Route>
					<Route path="/register" component={RegisterPage}></Route>
					<Route path="/shipping" component={ShippingAddressPage}></Route>
					<Route path="/payment" component={PaymentMethodPage}></Route>
					<Route path="/placeorder" component={PlaceOrderPage}></Route>
					<Route path="/order/:id" component={OrderPage}></Route>
					<Route path="/orderhistory" component={OrderHistoryPage}></Route>
					<Route path="/search/name/:name?" component={SearchPage} exact></Route>
					<Route path="/search/category/:category" component={SearchPage} exact></Route>
					<Route path="/search/category/:category/name/:name" component={SearchPage} exact></Route>
					<Route
						path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
						component={SearchPage}
						exact
					></Route>
					<PrivateRoute path="/profile" component={ProfilePage}></PrivateRoute>
					<AdminRoute path="/productlist" component={ProductListPage} exact></AdminRoute>
					<AdminRoute path="/orderlist" component={OrderListPage} exact></AdminRoute>
					<AdminRoute path="/userlist" component={UserListPage}></AdminRoute>
					<AdminRoute path="/user/:id/edit" component={UserEditPage}></AdminRoute>
					<SellerRoute path="/productlist/seller" component={ProductListPage}></SellerRoute>
					<SellerRoute path="/orderlist/seller" component={OrderListPage}></SellerRoute>
					<Route path="/" component={HomePage} exact></Route>
				</main>
				<footer className="row center">Copyright &copy; I Want It</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
