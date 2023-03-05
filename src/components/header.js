import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar.png';
import cart from '../assets/cart.svg';
import favicon from '../assets/favicon.ico';
import { CartContext } from '../services/cart-context';

export function Header({ isAuthenticated, username, handleSignOut }) {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header>
      <img src={favicon} className="favicon" alt="Book store" />
      <Link to="/prometheus-x-course-task" className="ref">
        <h3 className="jsBookStore">JS BOOK STORE/Markov Vadym</h3>
      </Link>
      {isAuthenticated ? (
        <div className="headerAuth">
          <Link to="/cart" className="headerCartLink">
            <img src={cart} alt="Cart" className="cartImageHeader" />
          </Link>
          <div className="cartCounter">{cartCount}</div>
          <button className="signOut" onClick={handleSignOut}>
            Sign Out
          </button>
          <img src={avatar} alt="avatar" className="avatarImageHeader" />
          <p className="headerUsername">Hello, {username}!</p>
        </div>
      ) : (
        <div></div>
      )}
    </header>
  );
}
