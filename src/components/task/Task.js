import React from 'react';
import styles from './Task.module.css'
import {useHistory} from "react-router-dom";

function Task({prio, dateAdded, status, title, completedBy, id}) {

    const history = useHistory();

    function handleOnClick() {
        history.push(`/openstaande-taken/${id}`)
    }

    return (
        <div onClick={handleOnClick} className={styles.task}>
            <span className={styles[prio]}/>
            <p className={styles["task-added-date"]}>Toegevoegd op {dateAdded}</p>
            <p className={styles["task-status"]}>{status}</p>
            <p>{title}</p>
            {completedBy && <p className={styles["completed-by"]}>Voltooid door: {completedBy}</p>}
        </div>
    );
};

export default Task;