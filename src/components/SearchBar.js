import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ search, setSearch }) => {
    return (
        <input
            className="search-bar__input" 
            type="text"
            placeholder="Buscar libros..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
};

export default SearchBar;
