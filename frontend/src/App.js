// import logo from './logo.svg';
// import './App.css';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';

function App() {
	
	return (
		<BrowserRouter>
			<div className="grid-container">
				<Header />
				<main>
					<Route path="/cart/:id?" component={CartPage}></Route>
					<Route path="/product/:id" component={ProductPage}></Route>
					<Route path="/login" component={LoginPage}></Route>
					<Route path="/" component={HomePage} exact></Route>
				</main>
				<footer className="row center">Copyright &copy; BuyIt</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
