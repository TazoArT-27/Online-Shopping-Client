import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happy from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);

    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const handleRemoveProduct = (productKey) =>{
          const newCart = cart.filter(pd => pd.key !== productKey);
          setCart(newCart);
          removeFromDatabaseCart(productKey);
    }

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map( key => {
           const product = fakeData.find(pd => pd.key === key)
           product.quantity = savedCart[key];
           return product;
        }
            )
            setCart(cartProducts);
        //console.log(savedCart);
        //console.log(cartProducts);
    })

    let thankyou; 
    if(orderPlaced){ 
        thankyou = <img src={happy} alt=""/>
    }
    return (
        <div className="shop-container">
            
            <div className="product-container">
            {
               cart.map(pd => <ReviewItem removeProduct={handleRemoveProduct} key={pd.key} product={pd}></ReviewItem>) 
            }
            { thankyou }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="btn btn-primary">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;