import { render, screen, fireEvent } from '@testing-library/react';
import { SpecificBook } from '../routes/specific-book';
import { CartContext } from '../services/cart-context';
import { BooksContext } from '../services/books-context';


const mockBooks = [
  {
    id: 1,
    title: 'Book One',
    author: 'Author One',
    price: 10,
    image: 'book-one.jpg',
    description: 'Description One',
  },
  {
    id: 2,
    title: 'Book Two',
    author: 'Author Two',
    price: 20,
    image: 'book-two.jpg',
    description: 'Description Two',
  },
];

describe('SpecificBook', () => {
  test('increases quantity when clicking the increase button', () => {
    const { container } = render(
      <CartContext.Provider value={{ addToCart: jest.fn() }}>
        <BooksContext.Provider value={{ books: mockBooks }}>
          <SpecificBook />
        </BooksContext.Provider>
      </CartContext.Provider>
    );

    const increaseButton = container.querySelector('.increase');
    fireEvent.click(increaseButton);

    const quantityInput = screen.getByRole('spinbutton');
    expect(quantityInput).toHaveValue(2);
  });

  test('decreases quantity when clicking the decrease button', () => {
    const { container } = render(
      <CartContext.Provider value={{ addToCart: jest.fn() }}>
        <BooksContext.Provider value={{ books: mockBooks }}>
          <SpecificBook />
        </BooksContext.Provider>
      </CartContext.Provider>
    );

    const decreaseButton = container.querySelector('.decrease');
    fireEvent.click(decreaseButton);

    const quantityInput = screen.getByRole('spinbutton');
    expect(quantityInput).toHaveValue(1);
  });

  test('updates total price when quantity changes', () => {
    const { container } = render(
      <CartContext.Provider value={{ addToCart: jest.fn() }}>
        <BooksContext.Provider value={{ books: mockBooks }}>
          <SpecificBook />
        </BooksContext.Provider>
      </CartContext.Provider>
    );

    const quantityInput = screen.getByRole('spinbutton');
    fireEvent.change(quantityInput, { target: { value: 3 } });

    const totalPrice = container.querySelector('#total-price');
    expect(totalPrice.textContent).toEqual('30.00');
  });
});
