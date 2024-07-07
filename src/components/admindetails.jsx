import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { auth, firestore, storage } from '../firebase';
import { doc, getDoc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore"; 
import { ref, getDownloadURL, deleteObject } from "firebase/storage";
import db from '../firebase';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    bgcolor: '#EBE6E0',
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
    maxHeight: '80vh', 
    overflowY: 'auto'
};

const BookDetails = ({ open, handleClose, selectedBook }) => {
    const darkMode = document.querySelector("body").getAttribute('data-theme') === 'Dark';
    const [isReserved, setIsReserved] = useState(false);
    const [bookData, setBookData] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (selectedBook) {
                    const booksCollection = collection(db, 'Library', `book${selectedBook.bookID.toString()}`, 'BookReserveHistory');
                    const historySnapshot = await getDocs(booksCollection);
                    const historyList = historySnapshot.docs.map(doc => doc.data());
                    setBookData(historyList);
                    console.log('Fetched history:', historyList);
                }
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };
    
        if (open && selectedBook) {
            fetchBooks();
        }
    }, [open, selectedBook]);

    useEffect(() => {
        const checkIfReserved = async () => {
            try {
                const currentUser = auth.currentUser;
                if (currentUser && selectedBook) {
                    const userRef = doc(firestore, 'Users', currentUser.uid);
                    const bookRef = doc(userRef, 'borrowed', `book${selectedBook.bookID.toString()}`);
                    const bookDoc = await getDoc(bookRef);
                    setIsReserved(bookDoc.exists());
                }
            } catch (error) {
                console.error('Error checking reservation:', error);
            }
        };

        if (open && selectedBook) {
            checkIfReserved();
        }
    }, [open, selectedBook]);

    const handleDownload = () => {
        try {
            getDownloadURL(ref(storage, `bookfiles/${selectedBook?.title}.pdf`)).then(url => {
                window.open(url, '_blank');
            });
        } catch (error) {
            console.error('Error fetching file URL:', error.code, error.message);
        }
    };

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
        if (selectedBook) {
            try {
                const bookRef = doc(db, 'Library', `book${selectedBook.bookID.toString()}`);
                await updateDoc(bookRef, { status: newStatus });
                console.log('Book status updated to:', newStatus);
            } catch (error) {
                console.error('Error updating book status:', error);
            }
        }
    };

    const handleDeleteBook = async () => {
        if (selectedBook) {
            try {
                const bookRef = doc(db, 'Library', `book${selectedBook.bookID.toString()}`);
                console.log(`Attempting to delete Firestore document: book${selectedBook.bookID.toString()}`);
                
                const imageRef = ref(storage, `covers/book${selectedBook.bookID.toString()}.jpg` || `covers/book${selectedBook.bookID.toString()}.png` );
                console.log(`Attempting to delete image from Firebase Storage: covers/book${selectedBook.bookID.toString()}`);

                await deleteDoc(bookRef);
                console.log('Book deleted from Firestore');

                await deleteObject(imageRef);
                console.log('Image deleted from Firebase Storage');

                handleClose(); 
            } catch (error) {
                console.error('Error deleting book or image:', error);
            }
        }
    };

    useEffect(() => {
        if (selectedBook) {
            setStatus(selectedBook.status);
        }
    }, [selectedBook]);

    if (!selectedBook) {
        return null;
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={{
                    ...style,
                    bgcolor: darkMode ? '#1e1e1e' : '#EBE6E0',
                    color: darkMode ? '#EBE6E0' : '#1e1e1e',
                    border: darkMode ? '5px solid #404040' : '5px solid #D3D3D3',
                }} className="modalContent">
                    <img src={selectedBook.cover} alt={selectedBook.title} id='bookcover' />
                    <div className="textContent">
                        <Typography className='modaltitle' id="transition-modal-title" variant="h6" component="h2" 
                            style={{ fontFamily: 'Prompt', fontWeight: 'bold', fontSize: 18 }}>
                            {selectedBook.title}
                        </Typography>
                        { selectedBook.collection === 'elibrary' ? (
                        <>
                            <Typography className='modaltitle' id="transition-modal-title" variant="h6" component="h2" 
                                style={{ fontFamily: 'Prompt', fontSize: 16, marginTop: 10 }}>
                                <strong>Recent Holder:</strong> {selectedBook.borrowerName}
                            </Typography>
                            <Typography className='modaltitle' id="transition-modal-title" variant="h6" component="h2" 
                                style={{ fontFamily: 'Prompt', fontSize: 16 }}>
                                <strong>Student Number:</strong> {selectedBook.borrowerNumber}
                            </Typography>
                            <Typography className='modaltitle' id="transition-modal-title" variant="h6" component="h2" 
                                style={{ fontFamily: 'Prompt', fontSize: 16, marginTop: 10 }}>
                                <strong>Borrow Date:</strong> {selectedBook.reserveDateTime}
                            </Typography>
                            <Typography className='modaltitle' id="transition-modal-title" variant="h6" component="h2" 
                                style={{ fontFamily: 'Prompt', fontSize: 16 }}>
                                <strong>Return Date:</strong> {selectedBook.returnDateTime}
                            </Typography>
                            <Select
                                className='dropdownstatus'
                                value={status}
                                onChange={handleStatusChange}
                                displayEmpty
                                inputProps={{ 'Prompt': 'Select book status' }}
                                sx={{ marginTop: 2, fontFamily: 'Prompt', fontSize: 18, fontWeight: 'bold', color: '#EBE6E0', borderRadius: 4, border: 'none' }}
                            >
                                <MenuItem value="reserved">Reserved</MenuItem>
                                <MenuItem value="available">Available</MenuItem>
                                <MenuItem value="unavailable">Unavailable</MenuItem>
                                <MenuItem value="borrowed">Borrowed</MenuItem>
                            </Select>
                            
                            <Typography variant="h6" component="h2" style={{ marginTop: '16px', fontFamily: 'Prompt', fontSize: 18 }}>
                                <strong>Borrow History</strong>
                            </Typography>
                            <ul>
                                {bookData.map((history, index) => (
                                    <li key={index}>
                                        <div><strong>Borrower: </strong>{history.borrowerName}-{history.borrowerNumber}</div>
                                        <div><strong>Reserve: </strong>{history.reserveDateTime}</div>
                                        <div><strong>Return: </strong>{history.returnDateTime}</div>
                                    </li>
                                ))}
                            </ul>
                        </>
                        ) : <button className='modalbtn' onClick={handleDownload} style={{ width: 300 }} ><strong>OPEN</strong></button> }

                        <button className='deletebtn' onClick={handleDeleteBook} style={{ marginTop: 10 }}><strong>DELETE BOOK</strong></button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};

export default BookDetails;
