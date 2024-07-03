import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { auth, firestore } from '../firebase';
import { doc, setDoc, getDoc, collection, deleteDoc } from "firebase/firestore"; 

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
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkIfFavorite = async () => {
            try {
                const currentUser = auth.currentUser;
                if (currentUser && selectedBook) {
                    const userRef = doc(firestore, 'Users', currentUser.uid);
                    const bookRef = doc(userRef, 'favorites', `book${selectedBook.bookID.toString()}`);
                    const bookDoc = await getDoc(bookRef);
                    setIsFavorite(bookDoc.exists());
                }
            } catch (error) {
                console.error('error:', error);
            }
        };

        if (open && selectedBook) {
            checkIfFavorite();
        }
    }, [open, selectedBook]);

    if (!selectedBook) {
        return null;
    }

    const addToFavorites = async () => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userRef = doc(firestore, 'Users', currentUser.uid);
                const favoritesCollectionRef = collection(userRef, 'favorites');
    
                await setDoc(doc(favoritesCollectionRef, `book${selectedBook.bookID.toString()}`), {
                    title: selectedBook.title,
                    author: selectedBook.author,
                    class: selectedBook.class,
                    cover: selectedBook.cover,
                    status: selectedBook.status,
                    bookID: selectedBook.bookID,
                });
                console.log('added to favorites');
                setIsFavorite(true);
            } else {
                console.log('user not logged in');
            }
        } catch (error) {
            console.error('error:', error);
        }
    };

    const removeFromFavorites = async () => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userRef = doc(firestore, 'Users', currentUser.uid);
                const favoritesCollectionRef = collection(userRef, 'favorites');
                await deleteDoc(doc(favoritesCollectionRef, `book${selectedBook.bookID.toString()}`));
                console.log('removed from favorites');
                setIsFavorite(false);
            } else {
                console.log('user not logged in');
            }
        } catch (error) {
            console.error('error:', error);
        }
    };

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
                        <Typography className='modaltitle' id="transition-modal-title" variant="h6" component="h2" style={{ fontFamily: 'Prompt', fontWeight: 'bold', fontSize: 18 }}>
                            {selectedBook.title}
                        </Typography>
                        <Typography className='modalauthor' id="transition-modal-description" sx={{ mt: 2 }} style={{ fontFamily: 'Prompt', fontSize: 16 }}>
                            <strong>Author:</strong> {selectedBook.author}
                        </Typography>
                        <Typography className='modalauthor' id="transition-modal-description" sx={{ mt: 2 }} style={{ fontFamily: 'Prompt', fontSize: 16, marginTop: 5 }}>
                            <strong>Program:</strong> {selectedBook.class}
                        </Typography>
                        <Typography className='modalstatus' id="transition-modal-description" sx={{ mt: 2 }} style={{ fontFamily: 'Prompt', fontSize: 18 }}>
                            {selectedBook.bookID <= 30 ?
                                isFavorite ? <a onClick={removeFromFavorites} style={{ backgroundColor: '#D0312D', width: 240, borderRadius: 10 }} ><strong>Remove from Favorites</strong></a> : <a onClick={addToFavorites}><strong>Add to Favorites</strong></a>
                                : <strong>{selectedBook.status.charAt(0).toUpperCase() + selectedBook.status.slice(1)}</strong>
                            }
                        </Typography>
                        <button className='modalbtn'><strong>Download</strong></button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};

export default BookDetails;
