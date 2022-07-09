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
import createTaskDate from "../../helpers/createTaskDate";
import calculateHours from "../../helpers/calculateHours";
import calculateMinutes from "../../helpers/calculateMinutes";

function Statistics({setCurrentPage}) {

    //State management
    const [volunteers, setVolunteers] = React.useState([]);
    const [tasks, setTasks] = React.useState([]);
    const [error, toggleError] = React.useState(false);
    const [loading, toggleLoading] = React.useState(false);

    const {user} = useContext(AuthContext);

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Statistieken");
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
                        totalTime: doc.data().totalTime,
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
                        tasksArray.push(doc.data());
                    })
                    setTasks([...tasks, ...tasksArray])
                } else {
                    //Create a query for fetching tasks for signed in user only
                    const q = query(collection(db, "tasks"), where("completedById", "==", user.id));
                    // Execute query and push data to array
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        tasksArray.push(doc.data());
                    })
                }
                setTasks([...tasks, ...tasksArray]);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        // async function fetchHours() {
        //     const q = query(collection(db, "sessions"), where("session", "==", {active: false, id: "WkWCdsDTqaNTYEtX9kONC9NbGSi1"}));
        //     const querySnapshot = await getDocs(q);
        //     querySnapshot.forEach((doc) => {
        //         // console.log("Hours:", doc.data());
        //         console.log(new Date(doc.data().loginTime).getMonth())
        //
        //     })
        // }
        //TODO: maandnummer toevoegen als field aan de sessie. Dit scheel een hele boel documents gets. Hier kan op gefilterd worden.

        fetchTasks()
        fetchVolunteers();
        // fetchHours()
    }, [])

    console.log(volunteers);

    return (
        <InnerOuterContainer>
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
                                <th className={styles.th}>Tijd p.m.</th>
                                <th className={styles.th}>Totale tijd</th>
                            </tr>
                            </thead>
                            <tbody>
                            {volunteers.length > 0 &&
                                volunteers.map((volunteer) => {
                                    return (
                                        <tr key={volunteer.id}>
                                            <td className={styles.td}>{volunteer.firstName}</td>
                                            <td className={styles.td}>{volunteer.lastName}</td>
                                            <td className={styles.td}>{calculateHours(volunteer.totalTime)} u {calculateMinutes(volunteer.totalTime)} m</td>
                                            <td className={styles.td}>{calculateHours(volunteer.totalTime)} u {calculateMinutes(volunteer.totalTime)} m</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </ContentCard>
                }
                {user.function === "vrijwilliger" &&
                    <ContentCard stylingClass="time-registration">
                        <p className={styles.p}>Je geregisteerde tijd voor deze maand is: <span
                            className={styles.time}>{calculateHours(user.totalTime)} uur</span> en <span
                            className={styles.time}>{calculateMinutes(user.totalTime)} minuten</span></p>
                    </ContentCard>
                }
            </section>
            <section className={styles.section}>
                <div className={styles["title-sort"]}>
                    <h3 className={styles.h3}>Voltooide taken</h3>
                    <figure className={styles.sort}/>
                </div>

                <ContentCard stylingClass="tasks">
                    {tasks.length === 0 && !loading && <span>Er zijn geen voltooide taken</span>}
                    {loading && !error && <span>Gegevens worden opgehaald...</span>}
                    {error &&
                        <span className={styles.error}>Oeps, er ging iets mis met het ophalen van de taken. Probeer het opnieuw</span>}
                    {user.function === "manager" && tasks.length > 0 &&
                        tasks.map((task) => {
                            return (
                                <Task
                                    date={`Toegevoegd: ${createTaskDate(task.createdOn)}`}
                                    status={task.status}
                                    title={task.title}
                                    completedBy={task.completedBy}
                                    key={task.createdOn}
                                />
                            )
                        })
                    }
                    {user.function === "vrijwilliger" && tasks.length > 0 &&
                        tasks.map((task) => {
                            return (
                                <Task
                                    date={`Toegevoegd: ${createTaskDate(task.createdOn)}`}
                                    status={task.status}
                                    title={task.title}
                                    key={task.createdOn}
                                />
                            )
                        })
                    }
                </ContentCard>
            </section>
        </InnerOuterContainer>
    );
}

export default Statistics;