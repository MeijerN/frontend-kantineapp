import styles from './WarningPopup.module.css';
import React from 'react';

function WarningPopup({text, toggleWarningPopup, handleButtonClick}) {

    return (
        <span className={styles["warning-popup"]}>
            <p>Waarschuwing</p>
            <p>{text}</p>
            <div className={styles["button-container"]}>
                <button onClick={() => {
                    toggleWarningPopup(false);
                }} className={styles.button}>Annuleren</button>
                <button
                    onClick={handleButtonClick}
                    className={styles.button}>Verwijderen
                </button>
            </div>
        </span>
    );
}

export default WarningPopup;