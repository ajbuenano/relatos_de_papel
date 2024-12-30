import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (book) => {
        setCart((prevCart) => {
            const bookIndex = prevCart.findIndex((item) => item.id === book.id);
            if (bookIndex >= 0) {
                const newCart = [...prevCart];
                newCart[bookIndex].cantidad += 1;
                return newCart;
            } else {
                return [...prevCart, { ...book, cantidad: 1 }];
            }
        });
    };

    const removeFromCart = (bookId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
    };

    const updateQuantity = (bookId, newQuantity) => {
        setCart((prevCart) => {
            const newCart = [...prevCart];
            const bookIndex = newCart.findIndex((item) => item.id === bookId);
            if (bookIndex >= 0) {
                newCart[bookIndex].cantidad = newQuantity;
            }
            return newCart;
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
