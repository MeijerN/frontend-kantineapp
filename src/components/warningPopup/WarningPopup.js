import styles from './WarningPopup.module.css'
import React from 'react';

function WarningPopup({toggleWarningPopup, handleButtonClick}) {

    return (
        <span className={styles["warning-popup"]}>
            <p>Waarschuwing</p>
            <p>Deze actie zal de taak definitief verwijderen.</p>
            <div className={styles["button-container"]}>
                <button onClick={() => {
                    toggleWarningPopup(false)
                }} className={styles.button}>Annuleren</button>
                <button onClick={handleButtonClick} className={styles.button}>Verwijder</button>
            </div>
        </span>
    );
};

export default WarningPopup;