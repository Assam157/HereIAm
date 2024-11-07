import React from 'react';
import { useItemContext } from '../context/ItemContext';

const Cart = () => {
    const { cart } = useItemContext();

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {CartItems.length===0?(
                <p>Your cart is empty</p>
            ):(
                <ul>
                {cart.map(item => (
                    <li key={item._id}>{item.name} - Quantity: {item.quantity}</li>
                ))}
            </ul>
            )};
        </div>
    );
};

export default Cart;