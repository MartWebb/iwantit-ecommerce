import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';


function LoginPage({ location, history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, loading, error } = userLogin;

    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Log In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email" >Email address</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Enter Email" 
                        onChange={event => setEmail(event.target.value)} 
                        required
                    >
                    </input>
                    <label htmlFor="password" >Email address</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter Password" 
                        onChange={event => setPassword(event.target.value)} 
                        required
                    >
                    </input>
                    <div>
                        <label />
                        <button className="primary" type="submit">
                            Log In
                        </button>
                    </div>
                    <div>
                        <label />
                        {`New customer? `}
                        <Link to="/register">Create your account</Link>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}

export default LoginPage;
