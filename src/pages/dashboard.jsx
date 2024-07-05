import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import SideBar from '../components/sidebar';
import db from '../firebase'; 
import { collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'
import Login from './login';
import BookModal from '../components/bookdetails';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [books2, setBooks2] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const { userLoggedIn } = useAuth(); 

    const handleOpen = (book) => {
        setSelectedBook(book);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchBooks = async () => {
            const booksCollection = collection(db, 'Library');
            const booksSnapshot = await getDocs(booksCollection);
            const booksList = booksSnapshot.docs.map(doc => doc.data());
            setBooks(booksList);
        };

        fetchBooks();
    }, []); 

    useEffect(() => {
        const fetchBooks = async () => {
            const booksCollection = collection(db, 'Books');
            const booksSnapshot = await getDocs(booksCollection);
            const booksList = booksSnapshot.docs.map(doc => doc.data());
            const randomBooksList = shuffleArray(booksList).slice(0, 7);
            setBooks(randomBooksList);
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            const booksCollection = collection(db, 'Library');
            const booksSnapshot = await getDocs(booksCollection);
            const booksList = booksSnapshot.docs.map(doc => doc.data());
            const randomBooksList = shuffleArray(booksList).slice(0, 7);
            setBooks2(randomBooksList);
        };

        fetchBooks();
    }, []);

    return (
        <>
        { userLoggedIn ? 
            <>
                <Header />
                <SideBar />
                <div className='dashboardContainer'>
                    <div className='elibContainer'>
                        <p>eLibrary</p>
                        <Link to='/elibrary'><button className='goBtn'>SEE ALL</button></Link>
                        <div className='elibbooks'>
                            <ul>
                            {books2.map((book, index) => (
                                <li key={index} className='bookItem' onClick={() => handleOpen(book)}>
                                    <img src={book.cover} alt={`${book.title}`} />
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                    <div className='archiveContainer'>
                        <p>eBooks</p>
                        <Link to='/ebooks'><button className='goBtn'>SEE ALL</button></Link>
                        <div className='elibbooks'>
                            <ul>
                            {books.map((book, index) => (
                                <li key={index} className='bookItem' onClick={() => handleOpen(book)}>
                                    <img src={book.cover} alt={`${book.title}`} />
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <BookModal
                        open={open}
                        handleClose={handleClose}
                        selectedBook={selectedBook}
                />
            </>
            :
            <Login />
        }
        </>
    );
}

export default Dashboard;
