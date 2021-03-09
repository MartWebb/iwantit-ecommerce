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
    const [sellerName, setSellerName] = useState('');
    const [sellerLogo, setSellerLogo] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');

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
            if (user.seller) {
                setSellerName(user.seller.name);
                setSellerLogo(user.seller.logo);
                setSellerDescription(user.seller.description);
            }
        }
        
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords Do Not Match!');
        } else {
            dispatch(updateUserProfile({ 
                userId: user._id, 
                name, 
                email, 
                password, 
                sellerName, 
                sellerLogo, 
                sellerDescription 
            }));
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
                        {
                            user.isSeller && (
                                <>
                                    <h2>Seller</h2>
                                    <div>
                                        <label htmlFor="sellerName">Seller Name</label>
                                        <input 
                                            id="sellerName"
                                            type="text"
                                            placeholder="Enter Seller Name"
                                            value={sellerName} 
                                            onChange = {(event) => setSellerName(event.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <div>
                                        <label htmlFor="sellerLogo">Seller Logo</label>
                                        <input 
                                            id="sellerLogo"
                                            type="text"
                                            placeholder="Enter Seller Logo"
                                            value={sellerLogo} 
                                            onChange = {(event) => setSellerLogo(event.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <div>
                                        <label htmlFor="sellerDescription">Seller Description</label>
                                        <textarea 
                                            id="sellerDescription"
                                            type="text"
                                            placeholder="Enter Seller Description"
                                            value={sellerDescription} 
                                            onChange = {(event) => setSellerDescription(event.target.value)}
                                        >
                                        </textarea>
                                    </div>
                                </>
                            )
                        }
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