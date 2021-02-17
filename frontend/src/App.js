// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
	return (
		<BrowserRouter>
			<div className="grid-container">
				<header className="row">
				<div>
					<a className="brand" href="/">I Want It</a>
				</div>
				<div>
					<a href="/cart">Cart</a>
					<a href="/signin">Sign In</a>
				</div>
				</header>
				<main>
					<Route path="/product/:id" component={ProductPage}></Route>
					<Route path="/" component={HomePage} exact></Route>
				</main>
				<footer className="row center">Copyright &copy; BuyIt</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
