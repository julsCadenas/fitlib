import React, { useState, useEffect, useRef } from 'react';
import '../styles/App.css';  // Adjust the path as needed

const SideBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

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

    return (
        <>
            <button className={`sidebarBtn ${sidebarOpen ? 'open' : 'closed'}`} onClick={toggleSidebar}>&#9776;</button>
            <div ref={sidebarRef} className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className='maintitle'>
                    <p className='title'><strong>FIT LIBRARY</strong></p>
                    <p className='subtitle'><strong>Official Library of FEU Institute of Technology</strong></p>
                </div>
                <ul className='nav'>
                    <li><a href='#'>Discover</a></li>
                    <li><a href='#'>My Catalog</a></li>
                    <li><a href='#'>eBooks</a></li>
                    <li><a href='#'>eLibrary</a></li>
                </ul>
            </div>
        </>
    );
};

export default SideBar;
