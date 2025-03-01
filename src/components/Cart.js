import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity } = useCart(); 
    const [isOpen, setIsOpen] = useState(true); 

    const toggleCart = () => {
        setIsOpen(!isOpen); 
    };

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const handleQuantityChange = (id, cantidad) => {
        if (cantidad <= 0) return;
        updateQuantity(id, cantidad);
    };

    return (
        <div className={`cart ${isOpen ? 'cart--open' : 'cart--closed'}`}>
            <div className="cart__header">
                <h2 className="cart__title">Carrito de Compras</h2>
                <button className="cart__toggle" onClick={toggleCart}>
                    <span className="material-icons">{isOpen ? 'arrow_downward' : 'arrow_upward'}</span>
                </button>
            </div>
            {isOpen && (
                <div className="cart__content">
                    {cart.length === 0 ? (
                        <p className="cart__empty">Tu carrito está vacío</p>
                    ) : (
                        <ul className="cart__items">
                            {cart.map((item) => (
                                <li key={item.id} className="cart__item">
                                    <img src={item.image} alt={item.title} className="cart__item-image" />
                                    <div className="cart__item-details">
                                        <h3 className="cart__item-title">{item.title}</h3>
                                        <p className="cart__item-author">{item.author}</p>
                                        <div className="cart__item-quantity">
                                            <button
                                                className="cart__quantity-button"
                                                onClick={() => handleQuantityChange(item.id, item.cantidad - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="cart__quantity">{item.cantidad}</span>
                                            <button
                                                className="cart__quantity-button"
                                                onClick={() => handleQuantityChange(item.id, item.cantidad + 1)}
                                            >
                                                +
                                            </button>
                                            <button
                                                className="cart__remove"
                                                onClick={() => handleRemove(item.id)}
                                            >
                                                <span className="material-icons">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            {isOpen && cart.length > 0 && (
                <div className="cart__footer">
                    <button className="cart__checkout"  onClick={() => navigate(`/checkout`)}>Proceder al pago</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
