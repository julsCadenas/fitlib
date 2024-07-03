import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { firestore } from '../firebase';
// import '../styles/modal.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //   maxWidth: 750,
    //   maxHeight: 550,
    width: 'auto',
    height: 'auto',
    bgcolor: 'background.paper',
    bgcolor: '#EBE6E0',
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
};

const BookDetails = ({ open, handleClose, selectedBook }) => {
    const darkMode = document.querySelector("body").getAttribute('data-theme') == 'Dark';

    if (!selectedBook) {
        return null; 
    }
    

    return (
        <Modal className='modalcontainer'
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
            backdrop: {
            timeout: 500,
            },
        }}
        >
        <Fade in={open}>
            <Box sx={{
                ...style,
                bgcolor: darkMode ? '#1e1e1e' : '#EBE6E0', 
                color: darkMode ? '#EBE6E0' : '#1e1e1e', 
                border: darkMode ? '5px solid #404040': '5px solid #D3D3D3',
            }} className="modalContent">
            <img src={selectedBook?.cover} alt={selectedBook?.title} id='bookcover' />
            <div className="textContent">
                <Typography className='modaltitle' id="transition-modal-title" variant="h6" component="h2" style={{ fontFamily: 'Prompt', fontWeight: 'bold', fontSize: 18}}>
                {selectedBook?.title}
                </Typography>
                <Typography className='modalauthor' id="transition-modal-description" sx={{ mt: 2 }} style={{ fontFamily: 'Prompt', fontSize: 16}}>
                <strong>Author:</strong> {selectedBook?.author}
                </Typography>
                <Typography className='modalauthor' id="transition-modal-description" sx={{ mt: 2 }} style={{ fontFamily: 'Prompt', fontSize: 16, marginTop: 5}}>
                <strong>Program:</strong> {selectedBook?.class} 
                </Typography>
                {/* <Typography className='modalstatus' id="transition-modal-description" sx={{ mt: 2 }} style={{ fontFamily: 'Prompt', fontSize: 18}}>
                <strong>{(selectedBook?.status).charAt(0).toUpperCase() + (selectedBook?.status).slice(1) }</strong> 
                </Typography> */}
                <Typography className='modalstatus' id="transition-modal-description" sx={{ mt: 2 }} style={{ fontFamily: 'Prompt', fontSize: 18}}>
                <a><strong>Add to Favorites</strong></a> 
                </Typography>
                <button className='modalbtn' ><strong>Download</strong></button>
            </div>
            </Box>
        </Fade>
        </Modal>
    );
};

export default BookDetails;
