import Header from '../components/header';
import SideBar from '../components/sidebar';
import Login from './login';
import { useAuth } from '../contexts/authContext'
import React, { useState, useEffect } from 'react';
import db from '../firebase';
import { collection, getDocs } from 'firebase/firestore';


const Admin = () => {
    const { userLoggedIn } = useAuth(); 
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const booksCollection = collection(db, 'Library');
            const booksSnapshot = await getDocs(booksCollection);
            const booksList = booksSnapshot.docs.map(doc => doc.data());
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
                <div className='admincontainer'>
                    <div className='bookstablecontainer'>
                        <div className='elibraryadmin'>
                            <p><strong>eLibrary</strong></p>
                            <table>
                            <thead>
                                <tr>
                                    <th>Book ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Class</th>
                                    <th>Status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book, index) => (
                                    <tr key={index}>
                                        <td>{book.bookID}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.class}</td>
                                        <td>{book.status}</td>
                                        <td><button><strong>Details</strong></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

export default Admin;
