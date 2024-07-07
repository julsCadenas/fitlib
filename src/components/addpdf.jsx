import React, { useState } from 'react';
import { collection, setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import db, { storage } from '../firebase'; 

const AddPdfModal = ({ open, handleClose }) => {
    const [bookID, setBookID] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [bookClass, setBookClass] = useState('');
    const [cover, setCover] = useState('');
    const [bookCollection, setBookCollection] = useState('');
    const [coverImage, setCoverImage] = useState(null); 
    const [pdfFile, setPdfFile] = useState(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]; 
        const storageRef = ref(storage, `books/${file.name}`);

        try {
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            setCover(downloadURL); 
            setCoverImage(file); 
        } catch (error) {
            console.error('Error uploading file: ', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookData = {
            bookID,
            title,
            author,
            class: bookClass,
            cover,
            collection: bookCollection,
        };

        try {
            const collectionRef = collection(db, 'Books');
            await setDoc(doc(collectionRef, `book${bookID.toString()}`), bookData);
            handleClose();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handlePdfUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            try {
                const storageRef = ref(storage, `bookfiles/${title}.pdf`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                setPdfFile(file);
                console.log('PDF uploaded successfully:', downloadURL);
            } catch (error) {
                console.error('Error uploading PDF:', error);
            }
        }
    };

    return (
        <div className={`modal ${open ? 'is-open' : ''}`}>
            <div className="modal-content">
                <h2>Add Book</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className='label'>
                            <label htmlFor="bookID"><strong>Book ID: </strong></label>
                        </div>
                        <input type="text" id="bookID" value={bookID} onChange={(e) => setBookID(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <div className='label'>
                            <label htmlFor="title"><strong>Title: </strong></label>
                        </div>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <div className='label'>
                            <label htmlFor="author"><strong>Author: </strong></label>
                        </div>
                        <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <div className='label'>
                            <label htmlFor="class"><strong>Class: </strong></label>
                        </div>
                        <input type="text" id="class" value={bookClass} onChange={(e) => setBookClass(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <div className='label'>
                            <label htmlFor="collection"><strong>Collection: </strong></label>
                        </div>
                        <input type="text" id="collection" value={bookCollection} onChange={(e) => setBookCollection(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <div className='label'>
                            <label htmlFor="cover"><strong>Cover: </strong></label>
                        </div>
                        <input className='coverupload' type="file" id="cover" onChange={handleFileUpload} accept="image/*" />
                        {cover && (
                            <img src={cover} alt="Cover Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                        )}
                    </div>
                    <div className="form-group">
                        <div className='label'>
                            <label htmlFor="cover"><strong>PDF: </strong></label>
                        </div>
                        <input className='coverupload' type="file" id="cover" onChange={handlePdfUpload} accept="application/pdf" />
                    </div>
                    <div className='addclosebtn'>
                        <button onClick={handleClose}><strong>CLOSE</strong></button>
                        <button type="submit"><strong>ADD BOOK</strong></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPdfModal;
