import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfilePage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDetails = useSelector(state => state.userDetails);
    const { loading, user, error } = userDetails;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success: updatSuccess, error: updateError, loading: updateLoading } = userUpdateProfile;

    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
        
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords Do Not Match!');
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
    };

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ?  ( <LoadingBox></LoadingBox>
                    ) :
                    error ? ( <MessageBox variant="danger">{error}</MessageBox>
                    ) : 
                    <>
                    {updateLoading && <LoadingBox></LoadingBox>}
                    {updateError && <MessageBox variant="danger">{updateError}</MessageBox>}
                    {updatSuccess && <MessageBox variant="success">Profile Updated</MessageBox>}
                        <div>
                            <label htmlFor="name">Name</label>
                            <input 
                                id="name" 
                                type="text" 
                                placeholder="Enter name" 
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            >
                            </input>
                        </div>
                        <div>
                            <label htmlFor="email">Name</label>
                            <input 
                                id="email" 
                                type="text" 
                                placeholder="Enter email" 
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            >
                            </input>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input 
                                id="password" 
                                type="password" 
                                placeholder="Enter password" 
                                onChange={(event) => setPassword(event.target.value)}
                            >
                            </input>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                id="confirmPassword" 
                                type="password" 
                                placeholder="Enter confirm password" 
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            >
                            </input>
                        </div>
                        <div>
                            <label />
                            <button className="primary" type="submit">Update</button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}