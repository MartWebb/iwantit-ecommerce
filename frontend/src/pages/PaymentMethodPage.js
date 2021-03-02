import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';



function PaymentMethodPage({ history }) {
    
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    // If user  tries to go to payment and shipping is not filled in
    if (!shippingAddress.address) {
        history.push('/shipping');
    }

    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            
                <form className="form" onSubmit={submitHandler}>
                    <div>
                        <h1>Payment Method</h1>
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            id="paypal" 
                            value="PayPal" 
                            name="paymentMethod" 
                            required 
                            checked
                            onChange={(event) => setPaymentMethod(event.target.value)}
                        >
                        </input>
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                    <div>
                        
                        <input 
                            type="radio" 
                            id="stripe" 
                            value="Stripe" 
                            name="paymentMethod" 
                            required 
                            onChange={(event) => setPaymentMethod(event.target.value)}
                        >
                        </input>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                    <button className="primary" type="submit">Continue</button>

                </form>
        
        </>
    )
}

export default PaymentMethodPage;
