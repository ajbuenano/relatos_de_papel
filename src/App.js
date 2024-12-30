import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (libro) => setCart([...cart, libro]);
  const clearCart = () => setCart([]);
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
  );
}

export default App;
