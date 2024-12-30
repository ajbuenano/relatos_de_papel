import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import Cart from '../components/Cart'; 
import Header from '../components/Header';
import '../styles/HomePage.css';

const HomePage = () => {
    const [search, setSearch] = useState(''); 
    const [libros, setLibros] = useState([]); 

    useEffect(() => {
        fetch('/mocks/books.json')
            .then((response) => response.json())
            .then((data) => setLibros(data))
            .catch((error) => console.error('Error al cargar los libros:', error));
    }, []);

    const filteredBooks = libros.filter((libro) =>
        libro.titulo.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="home-page">
            <Header search={search} setSearch={setSearch} />
            <div className="home-page__book-cards">
                <ul>
                    {filteredBooks.map((libro) => (
                        <li key={libro.id}>
                            <BookCard libro={libro} />
                        </li>
                    ))}
                </ul>
            </div>
            <Cart /> 
        </div>
    );
};

export default HomePage;
