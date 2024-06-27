import { auth } from "../firebase";
import { useAuth } from '../contexts/authContext';
import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import db from '../firebase'; 
import { collection, doc, getDoc } from "firebase/firestore";

const Welcome = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [name, setName] = useState('');      

    useEffect(() => {
        const fetchNames = async () => {
            const nameCollection = collection(db, 'Users'); 
            const nameDoc = doc(nameCollection, user.uid); 
            const nameGet = await getDoc(nameDoc);

            const myname = nameGet.data();
            setName(myname.name)    
        };

        fetchNames();
    }, [user]);

    return (
        <header className='welcome'>
            Welcome back! <span className='name'><strong>{name.split(' ')[0]}</strong></span>
        </header>
    );
};

export default Welcome;
