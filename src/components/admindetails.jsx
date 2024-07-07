import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { auth, firestore, storage } from '../firebase';
import { doc, getDoc, getDocs, collection } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL } from "firebase/storage";
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
};

const BookDetails = ({ open, handleClose, selectedBook }) => {
    const darkMode = document.querySelector("body").getAttribute('data-theme') === 'Dark';
    const [isReserved, setIsReserved] = useState(false);
    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (selectedBook) {
                    const booksCollection = collection(db, 'Library', `book${selectedBook.bookID.toString()}`);
                    const historyCollection = collection(booksCollection, 'BookReserveHistory');
                    const historySnapshot = await getDocs(historyCollection);
                    const historyList = historySnapshot.docs.map(doc => doc.data());
                    setBookData(historyList);
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
                        <Typography className='modalstatus' id="transition-modal-description" sx={{ mt: 2 }} 
                            style={{ fontFamily: 'Prompt', fontSize: 18 }}>
                            <a><strong>{selectedBook?.status.charAt(0).toUpperCase() + selectedBook?.status.slice(1)}</strong></a>        
                        </Typography>
                        
                        <Typography variant="h6" component="h2" style={{ marginTop: '16px', fontFamily: 'Prompt', fontSize: 18 }}>
                            Borrow History
                        </Typography>
                        <ul>
                            {bookData.map((history, index) => (
                                <li key={index}>
                                    reserved: {history.reserveDateTime}
                                    return on: {history.returnDateTime}
                                </li>
                            ))}
                        </ul>
                        
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};

export default BookDetails;
