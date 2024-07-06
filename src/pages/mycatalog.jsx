import Header from '../components/header';
import SideBar from '../components/sidebar';
import Login from './login';
import { useAuth } from '../contexts/authContext';
import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import db from '../firebase';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import BookModal from '../components/catalogdetails';

const MyCatalog = () => {
    const { userLoggedIn } = useAuth();
    const auth = getAuth();
    const user = auth.currentUser;
    const [profile, setProfile] = useState(null);
    const [faves, setFaves] = useState([]);
    const [borrow, setBorrow] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleOpen = (book) => {
        setSelectedBook(book);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                const profCollection = collection(db, 'Users');
                const profileDocRef = doc(profCollection, user.uid);
                const profSnapshot = await getDoc(profileDocRef);
                if (profSnapshot.exists()) {
                    setProfile(profSnapshot.data());
                } else {
                    console.log("No such profile document!");
                }
            }
        };

        fetchProfile();
    }, [user]);

    useEffect(() => {
        const fetchBooks = async () => {
            const booksCollection = doc(db, 'Users', user.uid);
            const favsCollection = collection(booksCollection, 'favorites');
            const favsSnapshot = await getDocs(favsCollection);
            const favsList = favsSnapshot.docs.map(doc => doc.data());
            setFaves(favsList);
        };

        fetchBooks();
    }, [user]);

    useEffect(() => {
        const fetchBooks = async () => {
            const booksCollection = doc(db, 'Users', user.uid);
            const borrowCollection = collection(booksCollection, 'borrowed');
            const borrowSnapshot = await getDocs(borrowCollection);
            const borrowList = borrowSnapshot.docs.map(doc => doc.data());
            setBorrow(borrowList);
        };

        fetchBooks();
    }, [user]);

    return (
        <>
            {userLoggedIn ? (
                <>
                    <SideBar />
                    <div className='catalogcontainer'>
                        {profile && (
                            <div className='profilecontainer'>
                                <p className='profiletitle'><strong>Profile</strong></p>
                                <p className='profilename'><strong>Name: </strong>{profile.name}</p>
                                <p className='profilenum'><strong>Student Number: </strong>{profile.student_number}</p>
                                <p className='profileprog'><strong>Program: </strong>{profile.program}</p>
                            </div>
                        )}
                        <div className='favborcontainer'>
                            <div className='favcontainer'>
                                <p className='favtitle'><strong>Favorites</strong></p>
                                <div className='favcase'>
                                    <ul>
                                        {faves && faves.map((fave, index) => (
                                            <li key={index}>
                                                <img src={fave.cover} alt={`${fave.title}`} onClick={() => handleOpen(fave)} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className='borrowcontainer'>
                                <p className='borrowtitle'><strong>Borrowed Books</strong></p>
                                <div className='borrowcase'>
                                    <ul>
                                        {borrow && borrow.map((bor, index) => (
                                            <li key={index}>
                                                <img src={bor.cover} alt={`${bor.title}`} onClick={() => handleOpen(bor)} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <BookModal
                        open={open}
                        handleClose={handleClose}
                        selectedBook={selectedBook}
                    />
                </>
            ) : (
                <Login />
            )}
        </>
    );
};

export default MyCatalog;
