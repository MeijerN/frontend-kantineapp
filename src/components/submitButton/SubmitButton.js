import React from 'react';
import styles from './Submitbutton.module.css'

function SubmitButton({text, onSubmit}) {
    return (
        <button
            className={styles.button}
            type="submit"
            // CHANGE THIS TO ONSUBMIT
            onClick={onSubmit}
        >
            {text}
        </button>
    );
};

export default SubmitButton;