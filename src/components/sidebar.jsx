import React, { useState, useEffect, useRef } from 'react';
import '../styles/App.css';  

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
                    <p className='title'><strong>FIT LIBRARY</strong></p>
                    <p className='subtitle'><strong>Official Library of FEU Institute of Technology</strong></p>
                </div>
                <ul className='nav'>
                    <li><a href='#'>Discover</a></li>
                    <li><a href='#'>My Catalog</a></li>
                    <li><a href='#'>eBooks</a></li>
                    <li><a href='#'>eLibrary</a></li>
                    {/* <li><a href='#'  onClick={toggleMode} defaultChecked={selectedTheme === "light"}>{mode}</a></li> */}
                </ul>
            </div>
        </>
    );
};

export default SideBar;
