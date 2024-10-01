// src/Button.js
import React from 'react';

function Button({ value, onClick, className }) {
    return (
        <input
            type="button"
            value={value}
            onClick={onClick}
            className={className}
        />
    );
}

export default Button;
