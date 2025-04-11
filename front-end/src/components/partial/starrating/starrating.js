import React, { useState, useEffect } from 'react';

const StarRating = ({ rating, colorChecked, isEdit, handleRate }) => {
    const [rate, setRate] = useState(rating);
    useEffect(() => {
        setRate(rating); // Cập nhật state rate khi rating props thay đổi
    }, [rating]);

    const handleStarClick = (index) => {
        setRate(index + 1);
        handleRate(index + 1);
    };


    return (
        <span className="rating">
            {[...Array(5)].map((_, index) => {
                const isChecked = index < rate;

                return (
                    <i
                        key={index}
                        className={`fa fa-star ${isChecked ? 'checked' : ''}`}
                        style={{
                            color: isChecked ? colorChecked : 'inherit',
                            margin: '1px',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleStarClick(index)}
                    />
                );
            })}
        </span>
    );
};

export default StarRating;