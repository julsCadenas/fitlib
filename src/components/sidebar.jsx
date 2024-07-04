import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBook, faFileAlt, faDatabase, faSignOutAlt, faMoon, faSun, faUserCog } from '@fortawesome/free-solid-svg-icons'; 
import '../styles/App.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/fitlib.png'
import { useAuth } from '../contexts/authContext'
import { doSignOut } from '../auth'
import Login from '../pages/login';
import db from '../firebase'; 
import { collection, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const SideBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const [mode, setMode] = React.useState("Dark");
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth(); 
    const auth = getAuth();
    const [name, setName] = useState('');     
    const user = auth.currentUser; 

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleLogout = async () => {
        try {
            await doSignOut();
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    // DARK MODE FUNCTION
    useEffect(() => {
        const selectedTheme = localStorage.getItem("selectedTheme");
        if (selectedTheme) {
            setMode(selectedTheme);
            document.querySelector("body").setAttribute('data-theme', selectedTheme);
        }
    }, []); 
  
    const toggleMode = (e) => {
        const newMode = mode === "Dark" ? "Light" : "Dark";
        setMode(newMode);
        localStorage.setItem("selectedTheme", newMode);
        document.querySelector("body").setAttribute('data-theme', newMode);
    }

    return (
        <>
        { userLoggedIn ?
        <> 
            <button className={`sidebarBtn ${sidebarOpen ? 'open' : 'closed'}`} onClick={toggleSidebar}>&#9776;</button>
            <div ref={sidebarRef} className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className='maintitle'>
                    <div className='title'><img src={logo} alt="logo" /></div>
                    <p className='subtitle'><strong>Official Library of FEU Institute of Technology</strong></p>
                </div>
                <ul className='nav'>
                    <li><Link to='/dashboard'><FontAwesomeIcon className='icon' icon={faSearch} /> Discover</Link></li>
                    <li><Link to='/mycatalog'><FontAwesomeIcon className='icon' icon={faBook} /> My Catalog</Link></li>
                    <li><Link to='/ebooks'><FontAwesomeIcon className='icon' icon={faFileAlt} /> eBooks</Link></li>
                    <li><Link to='/elibrary'><FontAwesomeIcon className='icon' icon={faDatabase} /> eLibrary</Link></li>
                    { name === "admin" ? <li><Link to='/admin'><FontAwesomeIcon className='icon' icon={faUserCog} /> Admin</Link></li> 
                        : <span></span>
                    }
                    <div className='bottomBtns'>
                        <li className='modetoggle'>
                            <FontAwesomeIcon className='icon' icon={mode === "Dark" ? faMoon : faSun } />
                            <a href='#' onClick={toggleMode}>{mode === "Dark" ? "Light" : "Dark"}</a>
                        </li>
                        <li className='logout'>
                            <a onClick={handleLogout}>
                                <FontAwesomeIcon className='icon' icon={faSignOutAlt} /> Logout
                            </a>
                        </li>
                    </div>
                </ul>
            </div>
        </>
        :
        <Login />
        }
        </>
    );
};
export default SideBar;
