import React, {useEffect, useContext} from 'react';
import styles from './OpenTasks.module.css';
import Task from '../../components/task/Task'
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import ContentCard from "../../components/contentCard/ContentCard";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

function OpenTasksPage({navDrawer, toggleNavDrawer, setCurrentPage}) {

    // State management
    const [data, setData] = React.useState();

    const {user} = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Openstaande taken");
        toggleNavDrawer(false);

        if (user.function === "vrijwilliger") {
            // TODO: haal taken voor de ingelogde vrijwilliger op
        }
        if (user.function === "manager") {
            // TODO: haal taken voor de ingelogde vrijwilliger op
        }

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
                    onClick={() => {
                        history.push(`/openstaande-taken/${'1'}`)
                    }}
                />
                <Task
                    prio="low"
                    dateAdded="2-5-22"
                    status="In behandeling"
                    title="Lamp vervangen"
                    id="1"
                    onClick={() => {
                        history.push(`/openstaande-taken/${'1'}`)
                    }}
                />
                <Task
                    prio="low"
                    dateAdded="2-5-22"
                    status="In behandeling"
                    title="Lamp vervangen"
                    id="1"
                    onClick={() => {
                        history.push(`/openstaande-taken/1`)
                    }}
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
                {/*<Task*/}
                {/*    prio="low"*/}
                {/*    dateAdded="2-5-22"*/}
                {/*    status="In behandeling"*/}
                {/*    title="Lamp vervangen"*/}
                {/*/>*/}
                {/*<Task*/}
                {/*    prio="low"*/}
                {/*    dateAdded="2-5-22"*/}
                {/*    status="In behandeling"*/}
                {/*    title="Lamp vervangen"*/}
                {/*/>*/}
                {/*<Task*/}
                {/*    prio="low"*/}
                {/*    dateAdded="2-5-22"*/}
                {/*    status="In behandeling"*/}
                {/*    title="Lamp vervangen"*/}
                {/*/>*/}
                {/*<Task*/}
                {/*    prio="low"*/}
                {/*    dateAdded="2-5-22"*/}
                {/*    status="In behandeling"*/}
                {/*    title="Lamp vervangen"*/}
                {/*/>*/}
                {/*<Task*/}
                {/*    prio="low"*/}
                {/*    dateAdded="2-5-22"*/}
                {/*    status="In behandeling"*/}
                {/*    title="Lamp vervangen"*/}
                {/*/>*/}
                {/*<Task*/}
                {/*    prio="low"*/}
                {/*    dateAdded="2-5-22"*/}
                {/*    status="In behandeling"*/}
                {/*    title="Lamp vervangen"*/}
                {/*/>*/}
                {/*<Task*/}
                {/*    prio="low"*/}
                {/*    dateAdded="2-5-22"*/}
                {/*    status="In behandeling"*/}
                {/*    title="Lamp vervangen"*/}
                {/*/>*/}
                {/*<Task*/}
                {/*    prio="low"*/}
                {/*    dateAdded="2-5-22"*/}
                {/*    status="In behandeling"*/}
                {/*    title="Lamp vervangen"*/}
                {/*/>*/}
                {/*<Task*/}
                {/*    prio="low"*/}
                {/*    dateAdded="2-5-22"*/}
                {/*    status="In behandeling"*/}
                {/*    title="Lamp vervangen"*/}
                {/*/>*/}
                {/*<Task*/}
                {/*    prio="low"*/}
                {/*    dateAdded="2-5-22"*/}
                {/*    status="In behandeling"*/}
                {/*    title="Lamp vervangen"*/}
                {/*/>*/}

                {/*ICOON VOOR DE MANAGER*/}
                {user.function === "manager" && <button onClick={() => {
                    history.push("/openstaande-taken/toevoegen")
                }} className={styles["add-button"]}/>}
            </ContentCard>
        </InnerOuterContainer>
    );
}

export default OpenTasksPage;