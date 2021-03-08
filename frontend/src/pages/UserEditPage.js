import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

function UserEditPage({ match, history }) {
    const userId = match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { 
        loading: updateLoading, 
        success: updateSuccess, 
        error: updateError 
    } = userUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (updateSuccess) {
            dispatch({ type: USER_UPDATE_RESET });
            history.push('/userlist');
        }
        if (!user) {
            dispatch(detailsUser(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsSeller(user.isSeller);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, user, userId, history, updateSuccess]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
    };


    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit User {name}</h1>
                    {updateLoading && <LoadingBox></LoadingBox>}
                    {updateError && <MessageBox variant="danger">{updateError}</MessageBox>}
                </div>
                {loading ? <LoadingBox /> : 
                    error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    <>
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
                            <label htmlFor="email">Email</label>
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
                            <label htmlFor="isSeller">Is Seller</label>
                            <input 
                                id="isSeller"
                                type="checkbox"
                                placeholder="Is Seller"
                                checked={isSeller}
                                onChange={(event) => setIsSeller(event.target.checked)}
                            >
                            </input>
                        </div>
                        <div>
                            <label htmlFor="isAdmin">Is Admin</label>
                            <input 
                                id="isAdmin"
                                type="checkbox"
                                placeholder="Is Admin"
                                checked={isAdmin}
                                onChange={(event) => setIsAdmin(event.target.checked)}
                            >
                            </input>
                        </div>
                        <div>
                            <button
                                className="primary"
                                type="submit"
                            >
                                Update
                            </button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}

export default UserEditPage;
