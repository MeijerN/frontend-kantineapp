import React, {useEffect} from 'react';
import styles from './OpenTasks.module.css';
import Task from '../../components/task/Task'
import ListContentCard from "../../components/listContentCard/ListContentCard";
import NavigationDrawer from "../../components/navigationDrawer/NavigationDrawer";

function OpenTasksPage({navDrawer, toggleNavDrawer, setCurrentPage}) {

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Openstaande taken");
        toggleNavDrawer(false);
    }, [])

    return (
        <main>
            <NavigationDrawer
                navDrawer={navDrawer}
                toggleNavDrawer={toggleNavDrawer}
            />
            <section className="page-section">
                <div className={styles["title-sort"]}>
                    <h3 className={styles.h3}>Takenlijst</h3>
                    <figure className={styles.sort}/>
                </div>
                <ListContentCard stylingClass="open-tasks">
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
                    {/*CONTENT VOOR DE MANAGER*/}
                    {/*<button className={styles["add-button"]}/>*/}

                </ListContentCard>

            </section>
        </main>
    );
}

export default OpenTasksPage;