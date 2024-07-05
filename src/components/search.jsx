import React from 'react';

const Search = ({ setSearchTerm }) => {
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); 
    };

    return (
        <div className="searchContainer">
                <input
                    type="text"
                    placeholder="Search for books by genre, title, or author"
                    onChange={handleSearchChange} 
                />
        </div>
    );
};

export default Search;
