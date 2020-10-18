import React, { useEffect, useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    
    const [products, setProducts] = useState(first10);
    //console.log(products)
    const [cart, setCart] = useState([]);

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCard = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key ===existingKey)
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCard);
    },[])


     const handleAddProduct = (product /*the thing i clicked on*/) => {
        //console.log('handleAddProduct');
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === product.key)
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        //const count = sameProduct.length;
        
        //const newCart = [...cart, product /*the thing i clicked on*/]
        setCart(newCart);
        // const sameProduct = newCart.filter(pd => pd.key === product.key)
        // const count = sameProduct.length;
        
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
            <ul>
                {
                    products.map(product =>
                    <Product 
                    key={product.key}
                        showAddToCart={true}
                        product={product}
                        handleAddProduct={handleAddProduct}
                        
                        >
                    </Product>)
                }
            </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to='/review'><button className="btn btn-primary">Review</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;