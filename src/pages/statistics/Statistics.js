import styles from './Statistics.module.css';
import React, {useContext, useEffect} from 'react';
import Task from "../../components/task/Task";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import ContentCard from "../../components/contentCard/ContentCard";
import {AuthContext} from "../../context/AuthContext";
import sortOnFirstName from "../../helpers/sortOnFirstName";
import createTaskDate from "../../helpers/createTaskDate";
import calculateHours from "../../helpers/calculateHours";
import calculateMinutes from "../../helpers/calculateMinutes";
import SortPopup from "../../components/sortPopup/SortPopup";
import sortOnCompletedDate from "../../helpers/sortOnCompletedDate";
//Firebase imports
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../Firebase";

function Statistics({setCurrentPage}) {

    //State management
    const [volunteers, setVolunteers] = React.useState([]);
    const [monthlyHours, setMonthlyHours] = React.useState(0);
    const [tasks, setTasks] = React.useState([]);
    const [error, toggleError] = React.useState(false);
    const [loading, toggleLoading] = React.useState(false);
    const [sortCard, toggleSortCard] = React.useState(false);

    const {user} = useContext(AuthContext);

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Statistieken");
        toggleLoading(true);
        toggleError(false);

        async function fetchVolunteers() {
            try {
                if (user.function === "manager") {
                    //Fetch all volunteers
                    const volunteersArray = [];
                    // Create a query for fetching only volunteers
                    const q = query(collection(db, "users"), where("function", "==", "vrijwilliger"));
                    // Execute query and push data to array
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        volunteersArray.push({
                            firstName: doc.data().firstName,
                            lastName: doc.data().lastName,
                            totalTime: doc.data().totalTime,
                            id: doc.data().id,
                        });
                    });
                    sortOnFirstName(volunteersArray);

                    // Loop over volunteers and calculate and append montly hours to the volunteer state
                    const volunteersWithHours = [];
                    for (let i = 0; i < volunteersArray.length; i++) {
                        const q = await query(collection(db, "sessions"), where("session", "==", {
                            active: false,
                            id: volunteersArray[i].id
                        }), where("month", "==", new Date().getMonth()));
                        const querySnapshot = await getDocs(q);
                        let monthlyTimeAllVolunteers = 0;
                        querySnapshot.forEach((doc) => {
                            monthlyTimeAllVolunteers += Math.floor((doc.data().logoutTime - doc.data().loginTime));
                        });
                        volunteersWithHours.push({...volunteersArray[i], monthlyHours: monthlyTimeAllVolunteers});
                    }
                    setVolunteers(volunteersWithHours);
                } else {
                    // User is a volunteer, fetch and calculate monthly hour data
                    const q = await query(collection(db, "sessions"), where("session", "==", {
                        active: false,
                        id: user.id
                    }), where("month", "==", new Date().getMonth()));
                    const querySnapshot = await getDocs(q);
                    let monthlyTimeVolunteer = 0;
                    querySnapshot.forEach((doc) => {
                        monthlyTimeVolunteer += Math.floor((doc.data().logoutTime - doc.data().loginTime));
                    });
                    setMonthlyHours(monthlyTimeVolunteer)
                }
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
                    });
                    setTasks([...tasks, ...tasksArray]);
                } else {
                    //Create a query for fetching tasks for signed in user only
                    const q = query(collection(db, "tasks"), where("completedById", "==", user.id));
                    // Execute query and push data to array
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        tasksArray.push(doc.data());
                    });
                }
                setTasks([...tasks, ...tasksArray]);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        fetchTasks();
        fetchVolunteers();
    }, [])

    return (
        <InnerOuterContainer>
            <section className={styles["section-top"]}>
                <div className={styles["title-sort"]}>
                    {user.function === "manager" &&
                        <h3 className={styles.h3}>Urenoverzicht</h3>
                    }
                    {user.function === "vrijwilliger" &&
                        <h3 className={styles.h3}>Maandelijks urenoverzicht</h3>
                    }
                </div>
                {user.function === "manager" &&
                    <ContentCard stylingClass="table">
                        {loading && !error ? <span>Gegevens worden opgehaald...</span>
                            :
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
                                                <td className={styles.td}>{calculateHours(volunteer.monthlyHours)} u {calculateMinutes(volunteer.monthlyHours)} m</td>
                                                <td className={styles.td}>{calculateHours(volunteer.totalTime)} u {calculateMinutes(volunteer.totalTime)} m</td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>}
                    </ContentCard>
                }
                {user.function === "vrijwilliger" &&
                    <ContentCard stylingClass="time-registration">
                        {loading && !error ? <span>Gegevens worden opgehaald...</span>
                            :
                            <p className={styles.p}>Je geregisteerde tijd voor deze maand is: <span
                                className={styles.time}>{calculateHours(monthlyHours)} uur</span> en <span
                                className={styles.time}>{calculateMinutes(monthlyHours)} minuten</span>
                            </p>
                        }
                    </ContentCard>
                }
            </section>
            <section className={styles["section-bottom"]}>
                <div className={styles["title-sort"]}>
                    <h3 className={styles.h3}>Voltooide taken</h3>
                    <figure onClick={() => {
                        toggleSortCard(true);
                    }} className={styles.sort}/>
                    <SortPopup
                        sortCard={sortCard}
                        toggleSortCard={toggleSortCard}
                        tasks={tasks}
                        children={
                            <button
                                onClick={() => {
                                    toggleSortCard(false);
                                    sortOnCompletedDate(tasks);
                                }}
                                className="styles.button"
                            >
                                Datum volt.
                            </button>}
                    />
                </div>
                <ContentCard stylingClass="tasks">
                    {loading && !error && <span>Gegevens worden opgehaald...</span>}
                    {tasks.length === 0 && !loading && !error && <span>Er zijn geen voltooide taken</span>}
                    {error && <span className={styles.error}>Oeps, er ging iets mis met het ophalen van de taken. Probeer het opnieuw</span>}
                    {user.function === "manager" && tasks.length > 0 && !loading &&
                        tasks.map((task) => {
                            return (
                                <Task
                                    date={`Toegevoegd: ${createTaskDate(task.createdOn)}`}
                                    status={task.status}
                                    title={task.title}
                                    completedBy={task.completedBy}
                                    key={task.createdOn}
                                />
                            );
                        })
                    }
                    {user.function === "vrijwilliger" && tasks.length > 0 && !loading &&
                        tasks.map((task) => {
                            return (
                                <Task
                                    date={`Toegevoegd: ${createTaskDate(task.createdOn)}`}
                                    status={task.status}
                                    title={task.title}
                                    key={task.createdOn}
                                />
                            );
                        })
                    }
                </ContentCard>
            </section>
        </InnerOuterContainer>
    );
}

export default Statistics;