import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryList from '../components/CategoryList'; // Importamos el nuevo componente
import '../styles/LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => navigate('/home'), 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="landing-page">
            <div className="landing-page__content">
                <h1>Bienvenido a Relatos de Papel</h1>
                <p>Explora el mejor catálogo de libros, desde los clásicos hasta los más modernos.</p>
                <div className="landing-page__cta">
                    <button className="button button--primary" onClick={() => navigate('/home')}>Explora nuestros libros</button>
                </div>
            </div>
            <CategoryList />
            
            <p>Desarrollado por Adriana Buenaño</p>
        </div>
    );
};

export default LandingPage;
