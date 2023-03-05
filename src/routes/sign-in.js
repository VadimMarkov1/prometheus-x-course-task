import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import avatar from '../assets/avatar.png'

export function SignIn({ onSignIn, isAuthenticated }) {
  const [username, setUsername] = useState('');
  
  const handleInputChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length >= 4 && username.length <= 16) {
        onSignIn(username);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
    return  (<div>
                <img className="imageAvatar" src={avatar} alt="avatar"/>
                <form onSubmit={handleSubmit}>
                    <p className="userName">Username</p>
                    <input type="text" placeholder="type Username" className="inputName" id="username-input"  value={username}  onChange={handleInputChange}/>
                    <input type="submit" className="inputName" disabled={username.length < 4 || username.length > 16}/>
                    </form>
            </div>);
  };