import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Cart from '../components/Cart';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';
import '../styles/BookPage.css';
import Rating from '../components/Rating';

const BookPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart(); 

    
    const location = useLocation();
    const { libro } = location.state;

    if (!libro) return <p>Libro no encontrado</p>;

    return (
        <div>
            <Header search={null} setSearch={null} />
            <div className="book-page">
                <div className="book-page__content">
                    <img src={libro.imagen} alt={libro.titulo} className="book-page__image" />
                    <h3 className="book-page__title">{libro.titulo}</h3>
                    <p className="book-page__author"><strong>Autor:</strong> {libro.autor}</p>
                    <p className="book-page__year"><strong>Año:</strong> {libro.anio}</p>
                    <p className="book-page__category"><strong>Categoría:</strong> {libro.categoria}</p>
                    <p className="book-page__price"><strong>Precio: $</strong> {libro.precio}</p>
                    <p className="book-page__description">{libro.descripcion}</p>
                    <Rating rating={libro.puntaje} />
                    <div className="book-page__actions">
                        <button className="book-page__button" onClick={() => addToCart(libro)}>Añadir al carrito</button>
                        <button className="book-page__button book-page__back-button" onClick={() => navigate('/home')}>Volver</button>
                    </div>
                </div>
                <Cart />
            </div>
        </div>
    );
};

export default BookPage;
