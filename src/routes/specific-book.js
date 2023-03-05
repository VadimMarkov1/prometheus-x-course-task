import { useState, useContext, useEffect } from 'react';
import { BooksContext } from '../services/books-context';
import { useParams } from 'react-router-dom';
import defaultBookImage from '../assets/default-book-image.jpg';
import { CartContext } from '../services/cart-context';

export function SpecificBook() {
  const { id } = useParams();
  const { books } = useContext(BooksContext);
  const book = books.find((book) => book.id === parseInt(id));
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    localStorage.setItem('bookId', id);
    return () => {
      localStorage.removeItem('bookId');
    };
  }, [id]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0 && newQuantity <= 42) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...book, quantity });
  };

  return (
    <main className="main">
      <div className="wrapper">
        <div className="imgBook">
          <img src={book.image || defaultBookImage} alt={book.title} />
        </div>
        <div className="bookTitle">
          <p>
            <b>Book name: {book.title}</b>
          </p>
          <p>Book author: {book.author}</p>
        </div>
        <div className="price">
          <div className="priceElement">Price, $</div>
          <div className="priceElement number" id="price">
            {book.price}
          </div>
          <div className="priceElement">
            <label htmlFor="count">Count</label>
          </div>
          <input
            type="number"
            className="priceElement count"
            min="1"
            max="42"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <div className="priceElement">Total price, $</div>
          <div className="priceElement number" id="total-price">
            {(book.price * quantity).toFixed(2)}
          </div>
          <button type="submit" className="buttonPrice" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
      <p className="discription">{book.description}</p>
    </main>
  );
}
