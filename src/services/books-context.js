import React, { createContext, useState, useEffect } from "react";
import booksData from "../assets/books.json"; 

export const BooksContext = createContext();

export const BooksContextProvider = (props) => {
  const [books, setBooks] = useState(booksData.books);
  useEffect(() => {
    setBooks(books);
  }, [books]);

  return (
    <BooksContext.Provider value={{ books }}>
      {props.children}
    </BooksContext.Provider>
  );
};


