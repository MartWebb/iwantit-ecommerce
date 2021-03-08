import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DELETE_RESET, USER_DETAILS_RESET } from '../constants/userConstants';


function UserListPage({ history }) {
    const userList = useSelector(state => state.userList);
    const { loading, users, error } = userList;

    const userDelete = useSelector(state => state.userDelete);
    const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = userDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        // if (deleteSuccess) {
        //     dispatch({ type: USER_DELETE_RESET });
        // }
        dispatch(listUsers());
        dispatch({ type: USER_DETAILS_RESET});
    }, [dispatch, deleteSuccess]);

    const deleteHandler = (user) => {
        if (window.confirm('Are you sure you want to delete a user?')) {
            dispatch(deleteUser(user._id));
        }
    };

    return (
        <div>
            <h1>Users</h1>
                {deleteLoading && <LoadingBox></LoadingBox>}
                {deleteError && <MessageBox variant="danger">{deleteError}</MessageBox>}
                {deleteSuccess && <MessageBox variant="success">User Deleted Successfully</MessageBox>}
                {loading ? (<LoadingBox></LoadingBox>)
                :
                error ? (<MessageBox variant="danger">{error}</MessageBox>)
                :
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>IS SELLER</th>
                                <th>IS ADMIN</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isSeller ? 'YES' : 'NO' }</td>
                                        <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="small"  
                                                onClick={() => history.push(`/user/${user._id}/edit`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="small"
                                                onClick={() => deleteHandler(user)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default UserListPage;
