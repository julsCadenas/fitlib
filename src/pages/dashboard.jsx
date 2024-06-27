import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import SideBar from '../components/sidebar';
import db from '../firebase'; 
import { collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'
import Login from './login';

const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const { userLoggedIn } = useAuth(); 

    useEffect(() => {
        const fetchBooks = async () => {
            const booksCollection = collection(db, 'Books');
            const booksSnapshot = await getDocs(booksCollection);
            const booksList = booksSnapshot.docs.map(doc => doc.data()).slice(0,7);
            setBooks(booksList);
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
                            {books.map((book, index) => (
                                <li key={index} className='bookItem'>
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
                                <li key={index} className='bookItem'>
                                    <img src={book.cover} alt={`${book.title}`} />
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </>
            :
            <Login />
        }
        </>
    );
}

export default Dashboard;
