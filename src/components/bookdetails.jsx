import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 800,
  bgcolor: 'background.paper',
  border: '5px solid #D3D3D3',
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
};

const BookDetails = ({ open, handleClose, selectedBook }) => {
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
          <Box sx={style} className="content">
            <img src={selectedBook?.cover} alt={selectedBook?.title} id='bookcover' />
            <Typography id="transition-modal-title" variant="h6" component="h2" style={{ fontFamily: 'Prompt', fontWeight: 'bold' }}>
              {selectedBook?.title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }} style={{ fontFamily: 'Prompt'}}>
              <strong>Author:</strong> {selectedBook?.author}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }} style={{ fontFamily: 'Prompt'}}>
              <strong>Status:</strong> {selectedBook?.status}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    );
  };

export default BookDetails;
