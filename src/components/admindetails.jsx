import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { auth, firestore, storage } from '../firebase';
import { doc, setDoc, getDoc, collection, deleteDoc, updateDoc } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'; 

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
    const storage = getStorage();

    const handleDownload = () => {
        try {
            const url = getDownloadURL(ref(storage, `bookfiles/${selectedBook?.title}.pdf`)).then(url=>{
                window.open(url,'_blank')
            });

        } catch (error) {
            console.error('Error fetching file URL:', error.code, error.message);
        }
    };
    

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
                console.error('error:', error);
            }
        };

        if (open && selectedBook) {
            checkIfReserved();
        }
    }, [open, selectedBook]);

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
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};

export default BookDetails;