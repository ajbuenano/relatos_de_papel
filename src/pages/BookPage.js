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
                    <div className="book-page__image-container">
                        {libro.stock === 0 && <span className="book-page__sold-out">Agotado</span>}
                        <img src={libro.image} alt={libro.title} className="book-page__image" />
                    </div>
                    <div className="book-page__info">
                        <h3 className="book-page__title">{libro.title}</h3>
                        <p className="book-page__author"><strong>Autor:</strong> {libro.author}</p>
                        <p className="book-page__year"><strong>Año:</strong> {libro.year}</p>
                        <p className="book-page__category"><strong>Categoría:</strong> {libro.category}</p>
                        <p className="book-page__price"><strong>Precio: $</strong> {libro.price}</p>
                        <p className="book-page__description">{libro.description}</p>
                        <Rating rating={libro.score} />

                        <div className="book-page__actions">
                            <button 
                                className="book-page__button" 
                                onClick={() => addToCart(libro)}
                                disabled={libro.stock === 0} 
                            >
                                Añadir al carrito
                            </button>
                            <button 
                                className="book-page__button book-page__back-button" 
                                onClick={() => navigate('/home')}
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                </div>
                
                <Cart />
            </div>
        </div>
    );
};

export default BookPage;
