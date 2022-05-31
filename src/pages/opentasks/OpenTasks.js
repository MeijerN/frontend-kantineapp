import React from 'react';
import styles from './OpenTasks.module.css';
import Header from '../../components/header/Header'
import Task from '../../components/task/Task'
import ContentCard from '../../components/contentCard/ContentCard'
import NavigationDrawer from "../../components/navigationDrawer/NavigationDrawer";

function OpenTasksPage({navDrawer, toggleNavDrawer}) {
    return (
        <main>
            <NavigationDrawer
                navDrawer={navDrawer}
                toggleNavDrawer={toggleNavDrawer}
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
                    <button className={styles["add-button"]}/>
                </ContentCard>
            </section>
        </main>
    );
}

export default OpenTasksPage;