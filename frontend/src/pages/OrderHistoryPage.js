import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function OrderHistoryPage({ history }) {

    const orderMyHistory = useSelector(state => state.orderMyHistory);
    const { loading, orders, error } = orderMyHistory;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listMyOrders());
    }, [dispatch])
    return (
        <div>
            <h1>Order History</h1>
            {loading ?  ( 
                <LoadingBox></LoadingBox> 
             ) : error ? (
                 <MessageBox variant="danger">{error}</MessageBox>
             ) : (
                 <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
             )
            }
        </div>
    )
}

export default OrderHistoryPage;
