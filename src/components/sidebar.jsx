import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBook, faFileAlt, faDatabase, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import icons you want to use
import '../styles/App.css';
import { Link } from 'react-router-dom';
import logo from '../images/fitlib.png'

const SideBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const [mode, setMode] = React.useState("dark");

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

    // DARK MODE FUNCTION
    // NOTE: nilagay ko pa dark mode, hindi pa final colors yan 
    useEffect(() => {
      const selectedTheme = localStorage.getItem("selectedTheme");
        if (selectedTheme) {
          setMode(selectedTheme);
          document.querySelector("body").setAttribute('data-theme', selectedTheme);
        }
    }, []); 
  
    const selectedTheme = localStorage.getItem("selectedTheme");
  
    const toggleMode = (e) => {
      const newMode = mode === "Dark" ? "Light" : "Dark";
      setMode(newMode);
      localStorage.setItem("selectedTheme", newMode)
      document.querySelector("body").setAttribute('data-theme', newMode);
    }

    return (
        <>
            <button className={`sidebarBtn ${sidebarOpen ? 'open' : 'closed'}`} onClick={toggleSidebar}>&#9776;</button>
            <div ref={sidebarRef} className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className='maintitle'>
                    {/* <p className='title'><strong>FIT LIBRARY</strong></p>    */}
                    <div className='title'><img src={logo}></img></div>
                    <p className='subtitle'><strong>Official Library of FEU Institute of Technology</strong></p>
                </div>
                <ul className='nav'>
                    <li><Link to='/dashboard'><FontAwesomeIcon className='icon' icon={faSearch} /> Discover</Link></li>
                    <li><Link to='/mycatalog'><FontAwesomeIcon className='icon' icon={faBook} /> My Catalog</Link></li>
                    <li><Link to='/ebooks'><FontAwesomeIcon className='icon' icon={faFileAlt} /> eBooks</Link></li>
                    <li><Link to='/elibrary'><FontAwesomeIcon className='icon' icon={faDatabase} /> eLibrary</Link></li>
                    <li className='logout'><Link to='/login'><FontAwesomeIcon className='icon' icon={faSignOutAlt} /> Logout</Link></li>
                </ul>
            </div>
        </>
    );
};

export default SideBar;
