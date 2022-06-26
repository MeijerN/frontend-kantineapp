import React from 'react';
import styles from './Task.module.css'
import {useHistory} from "react-router-dom";

function Task({prio, dateAdded, status, title, completedBy, isComplete, ...rest}) {

    const history = useHistory();

    // Dynamically switch between cursor pointer (open task) and no pointer (completed task)
    let styling = "";
    if (isComplete) {
        styling =  "completed-task";
    }
    else {
        styling =  "task";
    }

    return (
        <div className={styles[`${styling}`]} {...rest} >
            <span className={styles[prio]}/>
            <p className={styles["task-added-date"]}>Toegevoegd op {dateAdded}</p>
            <p className={styles["task-status"]}>{status}</p>
            <p>{title}</p>
            {completedBy && <p className={styles["completed-by"]}>Voltooid door: {completedBy}</p>}
        </div>
    );
};

export default Task;