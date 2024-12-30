import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Rating.css';

const Rating = ({ rating }) => {
    const MAX_RATING = 5;

    return (
        <div className="rating">
            {[...Array(MAX_RATING)].map((_, index) => (
                <span
                    key={index}
                    className={`rating__star ${index < rating ? 'rating__star--filled' : ''}`}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

Rating.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default Rating;
