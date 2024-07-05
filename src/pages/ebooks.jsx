import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Header from '../components/header';
import SideBar from '../components/sidebar';
import Search from '../components/search';
import Login from './login';
import { useAuth } from '../contexts/authContext';
import db from '../firebase';
import BookModal from '../components/bookdetails';

const Ebooks = () => {
    const { userLoggedIn } = useAuth();
    const [books, setBooks] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

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

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };  

    const filteredBooks = books.filter(book => {
        const matchesSearchTerm =
            (book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (book.class && book.class.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesClass = selectedClass ? book.class === selectedClass : true;

        return matchesSearchTerm && matchesClass;
    });

    return (
        <>
            {userLoggedIn ? (
                <>
                    <Header />
                    <SideBar />
                    <div className='ebooksContainer'>
                        <p className='eBooks'><strong>eBooks</strong></p>
                        <div className='searchFilterContainer'>
                            <Search setSearchTerm={setSearchTerm} /> 
                            <span className='filterbar'>
                                <select className='dropdown' value={selectedClass} onChange={handleClassChange}>
                                    <option value="">Filter</option>
                                    <option value="CPE">CPE</option>
                                    <option value="CS">CS</option>
                                    <option value="EE">EE</option>
                                    <option value="BIO">BIO</option>
                                </select>
                            </span>
                        </div>
                        <div className='ebookscase' id='ebooks2'>
                            <ul>
                                {filteredBooks.map((book, index) => (
                                    <li key={index} className='books' id='bookitem2'>
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
