import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons'; 

const Search = ({ setSearchTerm }) => {
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); 
    };

    return (
        <div className="searchContainer">
                <input
                    type="text"
                    placeholder="Search by title..."
                    onChange={handleSearchChange} 
                />
                {/* <button type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                </button> */}
        </div>
    );
};

export default Search;
