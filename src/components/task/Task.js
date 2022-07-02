import React from 'react';
import styles from './Task.module.css'

function Task({prio, date, status, title, completedBy, ...rest}) {

    // Dynamically switch between cursor pointer (open task) and no pointer (completed task)
    let styling = "";
    if (status.includes("Voltooid")) {
        styling =  "completed-task";
    }
    else {
        styling =  "task";
    }

    return (
        <div className={styles[`${styling}`]} {...rest} >
            <span className={styles[prio]}/>
            <p className={styles["task-added-date"]}>{date}</p>
            <p className={styles["task-status"]}>{status}</p>
            <p>{title}</p>
            {completedBy && <p className={styles["completed-by"]}>Voltooid door: {completedBy}</p>}
        </div>
    );
};

export default Task;