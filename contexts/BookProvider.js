'use client';
import React from 'react'
import BookContext from './BookContext'
import { useState } from 'react'
const BookProvider = ({ children }) => {
    const [BooksData, setBooksData] = useState([]);
    // const [borrowedBooks, setBorrowedBooks] = useState([]);

     const [borrowedBooks, setBorrowedBooks] = useState(() => {
    if (typeof window === 'undefined') return []; // guard for SSR
    const stored = localStorage.getItem('borrowedBooks');
    return stored ? JSON.parse(stored) : [];
  });

  const addBorrowedBook = (book) => {
    setBorrowedBooks((prev) => {
      const updated = [...prev, book];
      localStorage.setItem('borrowedBooks', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <BookContext.Provider value={{
        BooksData,
        setBooksData,
        borrowedBooks,
        setBorrowedBooks,
        addBorrowedBook
    }}>
        {children}
    </BookContext.Provider>

  )
}

export default BookProvider
