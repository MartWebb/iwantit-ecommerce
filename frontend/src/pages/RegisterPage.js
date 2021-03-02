import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { login, register } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';


function RegisterPage({ location, history }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
        } else {
            dispatch(register(name, email, password));
        }
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
                    <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name" >Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Enter Name" 
                        onChange={event => setName(event.target.value)} 
                        required
                    >
                    </input>
                    <label htmlFor="email" >Email address</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Enter Email" 
                        onChange={event => setEmail(event.target.value)} 
                        required
                    >
                    </input>
                    <label htmlFor="password" >Enter password</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter Password" 
                        onChange={event => setPassword(event.target.value)} 
                        required
                    >
                    </input>
                    <label htmlFor="confirmPassword" >Confirm password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        placeholder="Confirm Password" 
                        onChange={event => setConfirmPassword(event.target.value)} 
                        required
                    >
                    </input>
                    <div>
                        <label />
                        <button className="primary" type="submit">
                            Register
                        </button>
                    </div>
                    <div>
                        <label />
                        {`Already have an account? `}
                        <Link to={`/login?redirect=${redirect}`}>Login</Link>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}

export default RegisterPage;
