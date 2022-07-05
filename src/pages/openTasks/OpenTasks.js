import React, {useEffect, useContext} from 'react';
import styles from './OpenTasks.module.css';
import Task from '../../components/task/Task'
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import ContentCard from "../../components/contentCard/ContentCard";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../Firebase";

function OpenTasksPage({navDrawer, toggleNavDrawer, setCurrentPage}) {

    // State management
    const [data, setData] = React.useState([]);
    const [loading, toggleLoading] = React.useState(true);
    const [error, toggleError] = React.useState(false);

    const {user} = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Openstaande taken");
        toggleNavDrawer(false);
        toggleLoading(true);
        toggleError(false);

        async function fetchTasks() {
            const tasksArray = [];
            try {
                if (user.function === "manager") {
                    //Fetch all tasks
                    const querySnapshot = await getDocs(collection(db, "tasks"));
                    querySnapshot.forEach((doc) => {
                        // Filter out completed tasks
                        if (!doc.data().status.includes("Voltooid")) {
                            tasksArray.push(doc.data());
                        }
                    });
                } else {
                    //Create a query for fetching tasks for signed in user only
                    const q = query(collection(db, "tasks"), where("assignedVolunteersId", "array-contains", user.id));
                    // Execute query and push data to array
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        // Filter out completed tasks
                        if (!doc.data().status.includes("Voltooid")) {
                            tasksArray.push(doc.data());
                        }
                    })
                }
                setData([...data, ...tasksArray]);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        fetchTasks()
    }, [])

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <div className={styles["title-sort"]}>
                <h3 className={styles.h3}>Takenlijst</h3>
                <figure className={styles.sort}/>
            </div>
            <ContentCard stylingClass="tasks">
                {error &&
                    <span className={styles.error}>Oeps, er ging iets mis met het ophalen van de taken. Probeer het opnieuw</span>}
                {loading && <span>Taken binnenhalen...</span>}
                {data.length === 0 && !error && !loading && <span>Er zijn geen taken toegewezen</span>}
                {data.length !== 0 &&
                    data.map((task) => {
                        // console.log(data)
                        return (
                            <Task
                                prio={task.priority.value}
                                date={"Toegevoegd op: " + task.createdOn}
                                status={task.status}
                                title={task.title}
                                onClick={() => {
                                    history.push(`/openstaande-taken/${task.createdOn}`)
                                }}
                                key={task.createdOn}
                            />
                        )
                    })
                }
                {user.function === "manager" && <button onClick={() => {
                    history.push("/openstaande-taken/toevoegen")
                }} className={styles["add-button"]}/>}
            </ContentCard>
        </InnerOuterContainer>
    );
}

export default OpenTasksPage;