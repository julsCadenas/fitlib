import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from '../firebase';

const AddBookModal = ({ open, handleClose }) => {
    const [bookID, setBookID] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [bookClass, setBookClass] = useState('');
    const [cover, setCover] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookData = {
            bookID,
            title,
            author,
            class: bookClass,
            cover,
        };

        try {
            const docRef = await addDoc(collection(db, 'Library'), bookData);
            console.log("Document written with ID: ", docRef.id);
            handleClose();
        } catch (e) {
            console.error("Error adding document: ", e);
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
                            <label htmlFor="cover"><strong>Cover: </strong></label>
                        </div>
                        <input type="text" id="cover" value={cover} onChange={(e) => setCover(e.target.value)} required />
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

export default AddBookModal;
