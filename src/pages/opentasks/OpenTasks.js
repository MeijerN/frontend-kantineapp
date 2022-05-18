import React from 'react';
import styles from './OpenTasks.module.css';
import Header from '../../components/header/Header'
import Task from '../../components/task/Task'
import ContentCard from '../../components/contentcard/ContentCard'

function OpenTasksPage() {
    return (
        <div className="page-container">
            <Header
                page="Openstaande taken"
                highPrioNumber="1"
                mediumPrioNumber="2"
                lowPrioNumber="3"
                openTasksNumber="4"
            />
            <section className="page-section">
                <p className={styles.sort}>Sorteer</p>
                <ContentCard>
                    <Task
                        prio="low"
                        dateAdded="2-5-22"
                        status="In behandeling"
                        title="Lamp vervangen"
                    />
                    <Task
                        prio="low"
                        dateAdded="2-5-22"
                        status="In behandeling"
                        title="Lamp vervangen"
                    />
                    <Task
                        prio="low"
                        dateAdded="2-5-22"
                        status="In behandeling"
                        title="Lamp vervangen"
                    />
                    <Task
                        prio="low"
                        dateAdded="2-5-22"
                        status="In behandeling"
                        title="Lamp vervangen"
                    />
                    <Task
                        prio="low"
                        dateAdded="2-5-22"
                        status="In behandeling"
                        title="Lamp vervangen"
                    />
                    <Task
                        prio="low"
                        dateAdded="2-5-22"
                        status="In behandeling"
                        title="Lamp vervangen"
                    />
                    <Task
                        prio="low"
                        dateAdded="2-5-22"
                        status="In behandeling"
                        title="Lamp vervangen"
                    />
                    <Task
                        prio="low"
                        dateAdded="2-5-22"
                        status="In behandeling"
                        title="Lamp vervangen"
                    />
                    <Task
                        prio="low"
                        dateAdded="2-5-22"
                        status="In behandeling"
                        title="Lamp vervangen"
                    />
                    <Task
                        prio="low"
                        dateAdded="2-5-22"
                        status="In behandeling"
                        title="Lamp vervangen"
                    />
                    <button className={styles["add-button"]}></button>
                </ContentCard>
            </section>
        </div>
    );
}

export default OpenTasksPage;