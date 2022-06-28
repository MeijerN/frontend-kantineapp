import React from 'react';
import styles from './Submitbutton.module.css'

function SubmitButton({text, onSubmit}) {
    return (
        <button
            className={styles.button}
            type="submit"
        >
            {text}
        </button>
    );
};

export default SubmitButton;