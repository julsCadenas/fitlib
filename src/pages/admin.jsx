import Header from '../components/header';
import SideBar from '../components/sidebar';
import Login from './login';
import { useAuth } from '../contexts/authContext';
import React, { useState, useEffect } from 'react';
import db from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ElibModal from '../components/admindetails'; 
import AddBookModal from '../components/addbook'; 
import ElibAdmin from '../components/elibrarytable';
import EbookAdmin from '../components/ebookstable';
import UserAdmin from '../components/users';

const Admin = () => {
    const { userLoggedIn } = useAuth(); 

    return (
        <>
        { userLoggedIn ? 
            <>
                <Header />
                <SideBar />
                <div className='admincontainer'>
                    <div className='bookstablecontainer'>
                        {/* <ElibAdmin /> */}
                        <EbookAdmin />
                        {/* <UserAdmin /> */}
                    </div>
                </div> 
            </>
            :
            <Login />
        }
        </>
    );
}

export default Admin;
