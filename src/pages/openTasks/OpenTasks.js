import React, {useEffect} from 'react';
import styles from './OpenTasks.module.css';
import Task from '../../components/task/Task'
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import ContentCard from "../../components/contentCard/ContentCard";

function OpenTasksPage({navDrawer, toggleNavDrawer, setCurrentPage}) {

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Openstaande taken");
        toggleNavDrawer(false);
    }, [])

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <div className={styles["title-sort"]}>
                <h3 className={styles.h3}>Takenlijst</h3>
                <figure className={styles.sort}/>
            </div>
            <ContentCard stylingClass="tasks">
                <Task
                    prio="low"
                    dateAdded="2-5-22"
                    status="In behandeling"
                    title="Lamp vervangen"
                    id="1"
                />
                <Task
                    prio="low"
                    dateAdded="2-5-22"
                    status="In behandeling"
                    title="Lamp vervangen"
                    id="1"
                />
                <Task
                    prio="low"
                    dateAdded="2-5-22"
                    status="In behandeling"
                    title="Lamp vervangen"
                    id="1"
                />
                <Task
                    prio="high"
                    dateAdded="2-5-22"
                    status="In behandeling"
                    title="Lamp vervangen"
                    id="1"
                />
                <Task
                    prio="medium"
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
            </ContentCard>
        </InnerOuterContainer>
    );
}

export default OpenTasksPage;