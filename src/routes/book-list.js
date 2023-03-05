import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BooksContext } from '../services/books-context';
import defaultBookImage from '../assets/default-book-image.jpg'


export function BookList() {
  const { books } = useContext(BooksContext);


  const [filter, setFilter] = useState('');
  const [priceRange, setPriceRange] = useState('All');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };

  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase().includes(filter.toLowerCase());
  }).filter((book) => {
    switch (priceRange) {
      case '0-15':
        return book.price > 0 && book.price <= 15;
      case '15-30':
        return book.price > 15 && book.price <= 30;
      case '30+':
        return book.price > 30;
      default:
        return true;
    }
  });

  const bookListItems = filteredBooks.map((book) => {
    const title = book.title.length > 24 ? book.title.slice(0, 24) + '...' : book.title;
    const author = book.author.length > 24 ? book.author.slice(0, 24) + '...' : book.author;
    const image = book.image || defaultBookImage
    return (
      <div className='bookCard' key={book.id}>
        <img src={image} alt={book.title} />
        <p className='bookName'><b>{title}</b></p>
        <p className="bookAuthor">by ${author}</p>
        <p className='bookPrice'>Price: {book.price}</p>
        <Link className="viewButtonRef" to={`/books/${book.id}`}><button className="viewButton">View</button></Link>
      </div>
    );
  });

  return (
    <div className='main'>
      <h1>Book catalog</h1>
      <div className='searchFilterSection'>
        <div className='search'>
          <label htmlFor="filter">Search by Name:</label>
          <input id="filter" className='searchInput' type="text" value={filter} onChange={handleFilterChange} />
        </div>
        <div>
          <label htmlFor="price-range">Filter by Price:</label>
          <select id="price-range" className='sort' value={priceRange} onChange={handlePriceRangeChange}>
            <option value="All">All</option>
            <option value="0-15">$0 - $15</option>
            <option value="15-30">$15 - $30</option>
            <option value="30+">$30+</option>
          </select>
        </div>
      </div>
      <div className='bookList'>
        {bookListItems}
      </div>
    </div>
  );
}


