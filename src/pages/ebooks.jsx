import Header from '../components/header';
import SideBar from '../components/sidebar';
import Search from '../components/search';
import Login from './login';
import { useAuth } from '../contexts/authContext';
import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import db from '../firebase';
import BookModal from '../components/bookdetails'; 

const Ebooks = () => {
  const { userLoggedIn } = useAuth();
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleOpen = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, 'Books');
      const booksSnapshot = await getDocs(booksCollection);
      const booksList = booksSnapshot.docs.map(doc => doc.data());
      setBooks(booksList);
    };

    fetchBooks();
  }, []);

  return (
    <>
      {userLoggedIn ? (
        <>
          <Header />
          <SideBar />
          <Search />
          <div className='ebooksContainer'>
            <div className='elibbooks' id='ebooks2'>
              <p className='eBooks'><strong>eBooks</strong></p>
              <ul>
                {books.map((book, index) => (
                  <li key={index} className='bookItem' id='bookitem2'>
                    <button className="bookbtn" id={book.title} onClick={() => handleOpen(book)}>
                      <img src={book.cover} alt={`${book.title}`} />
                      <div className='booktitle'>
                        <p><strong>{`${book.title}`}</strong></p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <BookModal 
            open={open} 
            handleClose={handleClose} 
            selectedBook={selectedBook} 
          />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Ebooks;
