import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import SideBar from '../components/sidebar';
import db from '../firebase'; 
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
    const [books, setBooks] = useState([]);

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
            <Header />
            <SideBar />
            <div className='dashboardContainer'>
                <div className='elibContainer'>
                    <p>eLibrary</p>
                    <button className='goBtn'>GO</button>
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
                    <p>FIT Library</p>
                    <button className='goBtn2'>GO</button>
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
    );
}

export default Dashboard;
