import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/BookCard.css';

const BookCard = ({ libro }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    return (
        <div className="book-card">
            {libro.stock === 0 && <span className="book-card__sold-out">Agotado</span>}
    
            <img src={libro.image} alt={libro.title} className="book-card__image" />
            <h3>{libro.title}</h3>
            <p><strong>Autor:</strong> {libro.author}</p>
            <p><strong>Categoría:</strong> {libro.category}</p>
            <p><strong>Precio: $</strong> {libro.price}</p>
    
            <div className="book-card__buttons">
                <button 
                    className='book-card__add' 
                    onClick={() => addToCart(libro)}
                    disabled={libro.stock === 0}
                >
                    Añadir al carrito
                </button>
                <button onClick={() => navigate(`/book/${libro.id}`, { state: { libro } })}>
                    Ver
                </button>
            </div>
        </div>
    );
    
};

export default BookCard;
