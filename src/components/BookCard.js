import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/BookCard.css';

const BookCard = ({ libro }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    return (
        <div className="book-card" >
            <img src={libro.imagen} alt={libro.titulo} className="book-card__image" />
            <h3>{libro.titulo}</h3>
            <p><strong>Autor:</strong> {libro.autor}</p>
            <p><strong>Categoría:</strong> {libro.categoria}</p>
            <p><strong>Precio: $</strong> {libro.precio}</p>
            <div className="book-card__buttons">
                <button className='book-card__add' onClick={() => addToCart(libro)}>Añadir al carrito</button>
                <button onClick={() => navigate(`/book/${libro.id}`,{state:{libro}})}>Ver</button>
            </div>
        </div>
    );
};

export default BookCard;
