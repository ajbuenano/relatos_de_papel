import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; 
import '../styles/Header.css';

const Header = ({ search, setSearch }) => {
    const { cart } = useCart();
    const totalItems = cart.length;

    return (
        <header className="header">
            <div className="header__left">
                <h1 className="header__title">Relatos de papel</h1>
            </div>
            <div className="header__center">
                <SearchBar search={search} setSearch={setSearch} />
            </div>
            <div className="header__right">
                <div className="header__cart">
                    <span className="material-icons">shopping_cart</span>
                    {totalItems > 0 && <span className="header__cart-count">{totalItems}</span>}
                </div>
            </div>
        </header>
    );
};

export default Header;
