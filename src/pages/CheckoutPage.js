import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CheckoutPage.css';
import Header from '../components/Header';
import SuccessNotification from '../components/SuccessNotification';

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const calculateTotal = () => {
        return cart.reduce((total, libro) => total + (libro.price * libro.cantidad), 0).toFixed(2);
    };

    const handleCheckout = async () => {
        try {
            let pedido = {}
            if (process.env.REACT_APP_AMBIENTE==='prod'){
                pedido = {
                        orders: cart.map(item => ({
                            bookId: item.id,
                            price: item.price,
                            quantity: item.cantidad
                        }))
                };
            } else {
                pedido = {
                    "targetMethod": "POST",
                    "body":{
                        orders: cart.map(item => ({
                            bookId: item.id,
                            price: item.price,
                            quantity: item.cantidad
                        }))
                    }
                };
            }
            const apiUrl = process.env.REACT_APP_API_URL_ORDERS; 
            const response = await fetch(`${apiUrl}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pedido)
            });
    
            if (response.status === 200) {
                setNotificationMessage('¡Compra realizada con éxito!');
                setShowNotification(true);
                clearCart();
                setTimeout(() => navigate('/home'), 5000);
            } else {
                setNotificationMessage('Stock insuficiente o no visible para alguno de los libros');
                setShowNotification(true);
            }
        } catch (error) {
            alert('Error de conexión. Intenta nuevamente.');
        }
    };

    return (
        <div>
            <Header search={null} setSearch={null} />
            <div className="checkout-page">
                {showNotification && (
                    <SuccessNotification
                        message={notificationMessage}
                        onClose={() => setShowNotification(false)}
                    />
                )}
                <div className="checkout-page__header">
                    <h1 className="checkout-page__title">Resumen de tu compra</h1>
                </div>
                <ul className="checkout-page__items">
                    {cart.map((libro, index) => (
                        <li key={index} className="checkout-page__item">
                            <img src={libro.image} alt={libro.title} className="checkout-page__item-image" />
                            <div className="checkout-page__item-details">
                                <h2 className="checkout-page__item-title">{libro.title}</h2>
                                <p className="checkout-page__item-author">{libro.author}</p>
                                <p className="checkout-page__item-quantity">Cantidad: {libro.cantidad}</p>
                                <p className="checkout-page__item-price">${(libro.price * libro.cantidad).toFixed(2)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="checkout-page__total">
                    <h3 className="checkout-page__total-label">Total: </h3>
                    <p className="checkout-page__total-amount">${calculateTotal()}</p>
                </div>
                <div className="checkout-page__footer">
                    <button className="checkout-page__checkout-button" onClick={handleCheckout}>Finalizar Compra</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
