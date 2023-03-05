import React, { useContext } from 'react';
import { CartContext } from '../services/cart-context';
import cart from '../assets/cart.svg'

export function Cart() {
  const { cartItems, clearCart } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="cartWrapper">
        <img src={cart} alt="Empty Cart" />
        <h3 className="yourCart">Cart empty..</h3>
      </div>
    );
  }

  return (
    <div>
        <div  className="purchaseButtonWrapper">
           <button className="purchaseButton" onClick={() => clearCart()}>Purchase</button>
        </div>
        <div className="borderWrapper">
        {cartItems.map((item) => (
          <div className="cartItemsWrapper" key={item.id}>
            <p className="cartItemName">Book name: {item.title}</p>
            <p>Count: {item.quantity}</p>
            <p className="cartItemPrice">Total price: {(item.quantity * item.price).toFixed(2)}</p>
          </div>
        ))}
        </div>
      <p className="cartTotalPrice">Total price: {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
     
    </div>
  );
}
