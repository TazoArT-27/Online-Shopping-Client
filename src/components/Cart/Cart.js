import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    //console.log(cart);


    //const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);
    let totalPrice = 0;
    for(let i = 0; i < cart.length; i++) {
        const product = cart[i];
        totalPrice += product.price*product.quantity;
    }
    
    let shipping = 0;
    if(totalPrice > 35){
        shipping = 0;
    }
    else if(totalPrice > 15){
        shipping = 2.99;
    }
    else if(totalPrice > 0){
        shipping = 12.99;
    }

    const tax = (totalPrice/10).toFixed(2);
    const grandTotal = (totalPrice + shipping + Number(tax)).toFixed(2);
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h5>This is cart</h5>
                <h6>Order Summary: {cart.length}</h6>
                <p>Product Price: {formatNumber(totalPrice)}</p>
                <p><small>Shipping Cost: {shipping}</small></p>
                <p><small>Tax + VAT: {tax}</small></p>
                <p>Total Price: {grandTotal}</p>
                <br/>
                {
                    props.children
                }
        </div>
    );
};

export default Cart;