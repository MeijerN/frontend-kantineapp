import React from 'react';
import styles from './Task.module.css'

function Task({prio, dateAdded, status, title}) {
    return (
        <li className={styles.li}>
            <div className={styles[prio]}/>
            <p className={styles["task-added-date"]}>Toegevoegd op {dateAdded}</p>
            <p className={styles["task-status"]}>{status}</p>
            <p>{title}</p>
        </li>
    );
};

export default Task;