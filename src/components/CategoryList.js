import React from 'react';

const categories = [
    {
        image: '/images/literature.jpg',
        name: 'Literatura',
        alt: 'Literatura',
    },
    {
        image: '/images/programming.jpg',
        name: 'Programación',
        alt: 'Programación',
    },
    {
        image: '/images/business.jpg',
        name: 'Negocios',
        alt: 'Negocios',
    },
];

const CategoryList = () => {
    return (
        <div className="landing-page__categories">
            <h2>Explora por Categorías</h2>
            <div className="landing-page__category-list">
                {categories.map((category, index) => (
                    <div key={index} className="landing-page__category">
                        <img
                            className="landing-page__category-image"
                            src={category.image}
                            alt={category.alt}
                        />
                        <p>{category.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
