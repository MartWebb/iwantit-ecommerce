// import logo from './logo.svg';
// import './App.css';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

function App() {
	
	return (
		<BrowserRouter>
			<div className="grid-container">
				<Header />
				<main>
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
					<PrivateRoute path="/profile" component={ProfilePage}></PrivateRoute>
					<AdminRoute path="/productlist" component={ProductListPage}></AdminRoute>
					<Route path="/" component={HomePage} exact></Route>
				</main>
				<footer className="row center">Copyright &copy; BuyIt</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
