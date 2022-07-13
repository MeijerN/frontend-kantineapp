import styles from './SortPopup.module.css'
import React from 'react';
import sortOnTitle from "../../helpers/sortOnTitle";
import sortOnPriority from "../../helpers/sortOnPriority";
import sortOnDate from "../../helpers/sortOnDate";

function SortPopup({sortCard, toggleSortCard, tasks, children}) {
    return (
        <span className={sortCard ? styles["sort-popup-open"] : styles["sort-popup-closed"]}>
            <p>Sorteer op</p>
            <button
                onClick={() => {toggleSortCard(false);sortOnTitle(tasks)}}
                className={styles.button}
            >
                Titel
            </button>
            <button
                onClick={() => {toggleSortCard(false);sortOnPriority(tasks)}}
                className={styles.button}
            >
                Prioriteit
            </button>
            <button
                onClick={() => {toggleSortCard(false);
                    sortOnDate(tasks)}}
                className={styles.button}
            >
                Datum toegev.
            </button>
            {children}
        </span>
    );
};

export default SortPopup;