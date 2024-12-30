import React, { useState, useEffect } from 'react';
import '../styles/SuccessNotification.css';

const SuccessNotification = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 10000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!isVisible) return null;

    return (
        <div className="success-notification">
            <div className="success-notification__content">
                <span className="success-notification__message">{message}</span>
                <button className="success-notification__close" onClick={() => setIsVisible(false)}>
                    ×
                </button>
            </div>
        </div>
    );
};

export default SuccessNotification;
