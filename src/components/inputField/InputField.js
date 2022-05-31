import React from 'react';
import styles from './InputField.module.css'

function InputField({type, placeholder}) {
    return (
        <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
        />
    );
};

export default InputField;