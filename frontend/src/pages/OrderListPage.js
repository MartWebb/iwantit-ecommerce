import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

function OrderListPage({ history, match }) {
    const sellerMode = match.path.indexOf('/seller') >= 0;
    const orderList = useSelector(state => state.orderList);
    const { loading, orders, error } = orderList;

    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = orderDelete;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });
        dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
    }, [dispatch, deleteSuccess, sellerMode, userInfo._id ]);

    const deleteHandler = (order) => {
        if(window.confirm('Are you sure you want to delete the order?')) {
            dispatch(deleteOrder(order._id));
        }
        
    };

    return (
        <div>
            <div>
                <h1>Orders</h1>
                {deleteLoading && <LoadingBox></LoadingBox>}
                {deleteError && <MessageBox variant="danger">{deleteError}</MessageBox>}
                {loading ?  ( 
                    <LoadingBox></LoadingBox> 
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user ? order.user.name : 'Deleted User' }</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No' }</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                    <td>
                                        <button 
                                            type="button" 
                                            className="small"
                                            onClick={() => {history.push(`/order/${order._id}`)}}
                                        >
                                            Details
                                        </button>
                                        <button 
                                            type="button" 
                                            className="small"
                                            onClick={() => deleteHandler(order)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
                }
            </div>
        </div>
    )
}

export default OrderListPage;
