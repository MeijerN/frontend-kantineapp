import styles from './Statistics.module.css'
import React, {useContext, useEffect} from 'react';
import Task from "../../components/task/Task";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import ContentCard from "../../components/contentCard/ContentCard";
import {AuthContext} from "../../context/AuthContext";
import Icon from "../../components/icon/Icon";
import taskDoneIcon from "../../assets/task_done_icon.svg";
import editIcon from "../../assets/edit_task_icon.svg";
import deleteTaskIcon from "../../assets/delete_task_icon.svg"
//Firebase imports
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../Firebase";

function Statistics({navDrawer, toggleNavDrawer, setCurrentPage}) {

    //State management
    const [volunteers, setVolunteers] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [error, toggleError] = React.useState(false);
    const [loading, toggleLoading] = React.useState(false);

    const {user} = useContext(AuthContext);

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Statistieken");
        toggleNavDrawer(false);
        toggleLoading(true);
        toggleError(false);

        async function fetchVolunteers() {
            try {
                const volunteersArray = [];
                // Create a query for fetching only "vrijwilliger" users
                const q = query(collection(db, "users"), where("function", "==", "vrijwilliger"));
                // Execute query and push data to array
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    volunteersArray.push({
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        monthlyHours: doc.data().monthlyHours,
                        totalHours: doc.data().totalHours,
                        id: doc.data().id,
                    })
                })
                setVolunteers([...volunteers, ...volunteersArray]);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        async function fetchTasks() {
            const tasksArray = [];
            try {
                if (user.function === "manager") {
                    //Create a query for fetching tasks for signed in user only
                    const q = query(collection(db, "tasks"), where("completedBy", "!=", null));
                    // Execute query and push data to array
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data());
                        tasksArray.push(doc.data());
                    })
                    setData([...data, ...tasksArray])
                } else {
                    // TODO: USER IS VRIJWILLIGER, HAAL ALLEEN DE VOLTOOIDE TAKEN VOOR DE VRIJWILLIGER OP
                    // //Create a query for fetching tasks for signed in user only
                    // const q = query(collection(db, "tasks"), where("assignedVolunteers", "array-contains", {
                    //     firstName: user.firstName,
                    //     id: user.id,
                    //     lastName: user.lastName,
                    // }));
                    // // Execute query and push data to array
                    // const querySnapshot = await getDocs(q);
                    // querySnapshot.forEach((doc) => {
                    //     // Filter out completed tasks
                    //     if (!doc.data().status.includes("Voltooid")) {
                    //         tasksArray.push(doc.data());
                    //     }
                    // })
                }
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        fetchTasks()
        fetchVolunteers();

    }, [])

    console.log(loading);
    console.log(data.length)

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <section className={styles.section}>
                <div className={styles["title-sort"]}>
                    {user.function === "manager" &&
                        <>
                            <h3 className={styles.h3}>Urenoverzicht</h3>
                            <figure className={styles.sort}/>
                        </>
                    }
                    {user.function === "vrijwilliger" &&
                        <h3 className={styles.h3}>Maandelijks urenoverzicht</h3>
                    }
                </div>
                {user.function === "manager" &&
                    <ContentCard stylingClass="table">
                        <table className={styles.table}>
                            <thead className={styles.thead}>
                            <tr>
                                <th className={styles.th}>Voornaam</th>
                                <th className={styles.th}>Achternaam</th>
                                <th className={styles.th}>Uren p.m.</th>
                                <th className={styles.th}>Uren totaal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {volunteers.length > 0 &&
                                volunteers.map((volunteer) => {
                                    return (
                                        <tr key={volunteer.id}>
                                            <td className={styles.td}>{volunteer.firstName}</td>
                                            <td className={styles.td}>{volunteer.lastName}</td>
                                            <td className={styles.td}>{volunteer.monthlyHours}</td>
                                            <td className={styles.td}>{volunteer.totalHours}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </ContentCard>
                }
            </section>
            {/*/!*CONTENT VOOR DE NORMALE USER*!/*/}
            {/*/!*<ContentCard>*!/*/}
            {/*/!*    <p className={styles.p}>Je geregisteerde tijd voor deze maand is: <span className={styles.time}>3 uur</span > en <span className={styles.time}>10 minuten</span></p>*!/*/}
            {/*/!*</ContentCard>*!/*/}
            <section className={styles.section}>
                <div className={styles["title-sort"]}>
                    <h3 className={styles.h3}>Voltooide taken</h3>
                    <figure className={styles.sort}/>
                </div>
                {/*CONTENT VOOR DE MANAGER*/}
                <ContentCard stylingClass="tasks">
                    {data.length === 0 && !loading && <span>Er zijn geen voltooide taken</span>}
                    {user.function === "manager" && data.length > 0 &&
                        data.map((task) => {
                            return (
                                <Task
                                    date={`Toegevoegd op: ${task.createdOn}`}
                                    status={task.status}
                                    title={task.title}
                                    completedBy={task.completedBy}
                                    key={task.createdOn}
                                />
                            )
                        })
                    }
                    {/*</ContentCard>*/}
                    {/*CONTENT VOOR DE NORMALE GEBRUIKER*/}
                    {/*<ContentCard stylingClass="tasks">*/}
                    {/*    <Task*/}
                    {/*        date="Toegevoegd op: <datum>"*/}
                    {/*        status="Voltooid op: <datum>"*/}
                    {/*        title="Lamp vervangen"*/}
                    {/*        completedBy="Jan Petersen"*/}
                    {/*    />*/}
                    {/*    <Task*/}
                    {/*        date="Toegevoegd op: <datum>"*/}
                    {/*        status="Voltooid op: <datum>"*/}
                    {/*        title="Lamp vervangen"*/}
                    {/*        completedBy="Jan Petersen"*/}
                    {/*    />*/}
                    {/*    <Task*/}
                    {/*        date="Toegevoegd op: <datum>"*/}
                    {/*        status="Voltooid op: <datum>"*/}
                    {/*        title="Lamp vervangen"*/}
                    {/*        completedBy="Jan Petersen"*/}
                    {/*    />*/}
                </ContentCard>
            </section>
        </InnerOuterContainer>
    );
}

export default Statistics;