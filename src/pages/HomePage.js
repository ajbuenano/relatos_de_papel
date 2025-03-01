import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import Cart from '../components/Cart';
import Header from '../components/Header';
import '../styles/HomePage.css';

const HomePage = () => {
    const [search, setSearch] = useState('');
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Todas');

    const categories = [
        'Programación',
        'Ficción',
        'Ciencia',
        'Historia',
        'Arte',
        'Tecnología'
    ];

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            let data = {}
            if (process.env.REACT_APP_AMBIENTE==='prod'){
                const queryParams = new URLSearchParams();
                if (search.trim() !== '') {
                    queryParams.append('title', search);
                    queryParams.append('description', search);
                }
                if (selectedCategory !== 'Todas') {
                    queryParams.append('category', selectedCategory);
                }
                const apiUrl = process.env.REACT_APP_API_URL;
                const url = `${apiUrl}/books?${queryParams.toString()}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response.ok) {
                    throw new Error(`Error en la respuesta: ${response.status}`);
                }
                data = await response.json();
            } else {
                const queryParams = {
                    targetMethod: 'GET',
                    queryParams: {}
                };
                if (search.trim() !== '') {
                    queryParams.queryParams.title = [search];
                    queryParams.queryParams.description = [search];
                }
                if (selectedCategory !== 'Todas') {
                    queryParams.queryParams.category = [selectedCategory];
                }
                const apiUrl = process.env.REACT_APP_API_URL; 
                const response = await fetch(`${apiUrl}/books`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(queryParams)
                });
                if (!response.ok) {
                    throw new Error(`Error en la respuesta: ${response.status}`);
                }
                data = await response.json();
            }
            setLibros(data.books);
        } catch (error) {
            console.error('Error al cargar los libros:', error);
            setError('Error al obtener los libros. Intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [search, selectedCategory]);

    return (
        <div className='home'>
            <div>
                <Header search={search} setSearch={setSearch} />
            </div>
            <div className="home-page">
                <div className="home-page__filters">
                    <h3>Categorías</h3>
                    <div className="category-filters">
                        {/* Opción "Todas" */}
                        <div key="Todas">
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value="Todas"
                                    checked={selectedCategory === 'Todas'}
                                    onChange={() => handleCategoryChange('Todas')}
                                />
                                Todas
                            </label>
                        </div>

                        {categories.map((category) => (
                            <div key={category}>
                                <label>
                                    <input
                                        type="radio"
                                        name="category"
                                        value={category}
                                        checked={selectedCategory === category}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    {category}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="home-page__book-cards">
                    {loading ? (
                        <p>Cargando...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <ul>
                            {libros.length > 0 ? (
                                libros.map((libro) => (
                                    <li key={libro.id}>
                                        <BookCard libro={libro} />
                                    </li>
                                ))
                            ) : (
                                <p>No se encontraron libros que coincidan con la búsqueda.</p>
                            )}
                        </ul>
                    )}
                </div>
                <Cart />
            </div>
        </div>
    );
};

export default HomePage;
