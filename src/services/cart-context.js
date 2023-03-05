import React, { useState, useEffect } from 'react';

export const CartContext = React.createContext([]);

export const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  // useEffect(() => {
  //   if (cartItems) {
  //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
  //   }
  // }, [cartItems]);

  function addToCart(item) {
    const itemIndex = cartItems.findIndex((i) => i.id === item.id);

    if (itemIndex === -1) {
      setCartItems([...cartItems, item]);
      localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
    } else {
      const updatedItems = [...cartItems];
      updatedItems[itemIndex].quantity += item.quantity;
      setCartItems(updatedItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
  }

  function clearCart() {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {props.children}
    </CartContext.Provider>
  );
}
