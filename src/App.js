import React, { useState, useEffect} from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from './routes/layout'
import { NotFoundPage } from './routes/not-found-page'
import { SignIn } from './routes/sign-in';
import './App.css';
import { BookList } from './routes/book-list';
import { BooksContextProvider } from './services/books-context';
import { SpecificBook } from "./routes/specific-book";
import { Cart } from "./routes/cart";
import { CartProvider } from "./services/cart-context";


function App() {
  const [username, setUsername] = useState("");
  const [loaded, setLoaded] = useState(false);
  

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    setLoaded(true);
  }, []);

  const handleSignIn = (name) => {
    setUsername(name);
    localStorage.setItem("username", name);
    return <Navigate to="/" replace />;
  };

  const handleSignOut = () => {
    setUsername("");
    localStorage.removeItem("username");
  };

  const isAuthenticated = !!username;
  return (
    <BooksContextProvider>
      <CartProvider>
        <BrowserRouter>
          {loaded && (<Routes>
            <Route path="/" element={<Layout 
              isAuthenticated={isAuthenticated}
              username={username}
              handleSignOut={handleSignOut}/>}>
              <Route path="signin" element={<SignIn onSignIn={handleSignIn} isAuthenticated={isAuthenticated}/>} />
              <Route path="/" element={isAuthenticated ? <BookList /> : <SignIn onSignIn={handleSignIn} isAuthenticated={isAuthenticated}/>}/>
              <Route path="/books/:id" element={isAuthenticated ? <SpecificBook /> : <Navigate to="/signin" replace />} />
              <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/signin" replace />} />
              <Route path="*" element={<NotFoundPage isAuthenticated={isAuthenticated} />} />
            </Route>
          </Routes>)}
        </BrowserRouter>
     </CartProvider>
    </BooksContextProvider>
  );
}

export default App;
