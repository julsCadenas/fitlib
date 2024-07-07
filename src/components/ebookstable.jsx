import Header from '../components/header';
import SideBar from '../components/sidebar';
import Login from '../pages/login';
import { useAuth } from '../contexts/authContext';
import React, { useState, useEffect } from 'react';
import db from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ElibModal from '../components/admindetails'; 
import AddPdfModal from '../components/addpdf'; 
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const EbookAdmin = () => {
    const { userLoggedIn } = useAuth(); 
    const storage = getStorage();
    const [books, setBooks] = useState([]);
    const [openDetails, setOpenDetails] = useState(false);
    const [openAddBook, setOpenAddBook] = useState(false); 
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const booksCollection = collection(db, 'Books');
            const booksSnapshot = await getDocs(booksCollection);
            const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBooks(booksList);
        };

        fetchBooks();
    }, []); 

    const handleOpenDetails = (book) => {
        setSelectedBook(book);
        setOpenDetails(true);
    };

    const handleCloseDetails = () => setOpenDetails(false);

    const handleOpenAddBook = () => setOpenAddBook(true);

    const handleCloseAddBook = () => setOpenAddBook(false);

    const handleDownload = () => {
        try {
            const url = getDownloadURL(ref(storage, `bookfiles/${selectedBook?.title}.pdf`)).then(url=>{
                window.open(url,'_blank')
            });

        } catch (error) {
            console.error('Error fetching file URL:', error.code, error.message);
        }
    };


    return (
        <>
        { userLoggedIn ? 
            <>
                <div className='ebookadmincontainer'>
                    <div className='bookstablecontainer'>
                        <div className='elibraryadmin'>
                            <p><strong>eBooks</strong></p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Book ID</th>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Class</th>
                                        {/* <th>Status</th> */}
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map((book, index) => (
                                        <tr key={book.id}>
                                            <td>{book.bookID}</td>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.class}</td>
                                            {/* <td>{book.status}</td> */}
                                            <td>
                                                <button onClick={() => handleOpenDetails(book)}>
                                                    <strong>Details</strong>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button className='addbtn' onClick={handleOpenAddBook}><strong>ADD BOOK</strong></button>
                    </div>
                </div> 
                <ElibModal
                    open={openDetails}
                    handleClose={handleCloseDetails}
                    selectedBook={selectedBook}
                />
                <AddPdfModal
                    open={openAddBook}
                    handleClose={handleCloseAddBook}
                />
            </>
            :
            <Login />
        }
        </>
    );
}

export default EbookAdmin;
