import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';

const Checkout = () => {

    const {state} = useLocation();
    const [orderClicked, setOrderClicked] = useState(false);

    let getSubtotal = () => {
        let subtotal = 0;
        state.data.forEach((cartItem) => {
            subtotal += cartItem.product.price * cartItem.quantity;
        });
        return subtotal;
    }

    let getTotal = () => {
        return getSubtotal() * 1.13;
    }

    return (
        <div className="p-5">
            <h1>Summary</h1>
            {state.data.map((cartItem) => {
                console.log(state.data);
                return(
                    <>
                        <p className="lead"><strong>{cartItem.product.name}</strong> - ${cartItem.product.price} x {cartItem.quantity} = ${cartItem.product.price*cartItem.quantity}</p>
                    </>
                )
            })}
            <p>Subtotal: ${Math.round(getSubtotal() * 100) / 100}</p>
            <p>Tax: 13%</p>
            <p>Total: ${Math.round(getTotal() * 100) / 100}</p>
            <button disabled={orderClicked} className="btn btn-primary" onClick={() => {setOrderClicked(true)}}>Place order</button>
            {orderClicked ? <p className="my-4">Order placed. Please print this page and take it to 1234 Fake Street Windsor, ON</p> : null}
        </div>
    );
}

export default Checkout;
