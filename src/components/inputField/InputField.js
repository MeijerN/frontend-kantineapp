import React from 'react';
import styles from './InputField.module.css'

function InputField({type, placeholder, value, stylingClass}) {
    return (
        <input
            className={styles[(stylingClass)]}
            type={type}
            placeholder={placeholder}
            value={value}
        />
    );
};

export default InputField;