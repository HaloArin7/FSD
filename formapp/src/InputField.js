// src/InputField.js
import React from 'react';

const InputField = ({ label, type, name, value, onChange, error }) => {
    return (
        <div>
            <label>{label}: </label>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={label}
                autoComplete='off'
                onChange={onChange}
            />
            
            {error && <span>{error}</span>}
        </div>
    );
};

export default InputField;
