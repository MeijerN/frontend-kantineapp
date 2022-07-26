import styles from './TaskDetails.module.css';
import React, {useContext, useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import editIcon from '../../assets/edit_task_icon.svg';
import {useHistory, useParams} from "react-router-dom";
import backIcon from "../../assets/back_icon.svg";
import Icon from "../../components/icon/Icon";
import taskDoneIcon from '../../assets/task_done_icon.svg';
import deleteTaskIcon from '../../assets/delete_task_icon.svg';
import acceptTaskIcon from '../../assets/accept_task_icon.svg';
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import assignedVolunteerString from "../../helpers/assignedVolunteerString";
import WarningPopup from "../../components/warningPopup/WarningPopup";
import {AuthContext} from "../../context/AuthContext";
//Firebase imports
import {collection, getDocs, query, where, doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from "../../Firebase";
import createTaskDate from "../../helpers/createTaskDate";

function TaskDetails({setCurrentPage}) {

    //Stage management
    const [tasks, setTasks] = React.useState({});
    const [docId, setDocId] = React.useState();
    const [error, toggleError] = React.useState(false);
    const [loading, toggleLoading] = React.useState(true);
    const [warningPopup, toggleWarningPopup] = React.useState(false);

    const history = useHistory();
    const {title} = useParams();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Taak details");
        toggleError(false);
        toggleLoading(true);

        async function fetchTaskDetails() {
            try {
                // Create a query to fetch task details on uniqe createdOn timestamp
                const q = query(collection(db, "tasks"), where("title", "==", title));
                // Execute query
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setTasks(doc.data());
                    setDocId(doc.id);
                });
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        fetchTaskDetails();
    }, [])

    async function handleAccepButtonClick() {
        toggleError(false);
        toggleLoading(true);
        try {
            //Create task reference
            const taskRef = doc(db, "tasks", docId);
            //Update Firebase task document
            await updateDoc(taskRef, {
                status: "In behandeling",
            });
            setTasks({
                ...tasks,
                status: "In behandeling",
            });
        } catch (e) {
            console.log(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function handleCompleteButtonClick() {
        toggleError(false);
        toggleLoading(true);
        try {
            //Create task reference
            const taskRef = doc(db, "tasks", docId);
            //Update Firebase task document
            await updateDoc(taskRef, {
                status: "Voltooid: " + createTaskDate(Date.now()),
                completedOn: new Date().toString(),
                completedBy: `${user.firstName} ${user.lastName}`,
                completedById: user.id,
            });
            history.push("/openstaande-taken")
        } catch (e) {
            console.log(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function handleDeleteButtonClick() {
        toggleError(false);
        toggleLoading(true);
        try {
            await deleteDoc(doc(db, "tasks", docId));
        } catch (e) {
            console.log(e);
            toggleError(true);
        }
        toggleLoading(false);
        history.push("/openstaande-taken");
    }

    return (
        <InnerOuterContainer>
            <ContentCard stylingClass="task-details">
                {loading && !error ? <span className={styles.loading}>De gegevens worden opgehaald...</span>
                    :
                    <>
                        <p className={styles.status}>{tasks.status}</p>
                        <h3>{tasks.title}</h3>
                        <label htmlFor="textarea-task-details" className={styles["label-textarea-task-details"]}>
                            Beschrijving:
                            <p className={styles["textarea-task-details"]}>{tasks.description}</p>
                        </label>
                        <p className={styles.p}>Prioriteit: <span>{tasks.priority.value}</span></p>
                        <label htmlFor="task-owners-table" className={styles["label-task-owners-table"]}>
                            Aangewezen vrijwilligers:
                            <p
                                className={styles["assigned-users"]}
                            >
                                {Object.keys(tasks).length > 0 &&
                                    assignedVolunteerString(tasks.assignedVolunteers, user)}
                            </p>
                        </label>
                        <div className={styles["icon-container"]}>
                            {user.function === "vrijwilliger" && tasks.status === "In afwachting" &&
                                <Icon
                                    text="In behandeling nemen"
                                    image={acceptTaskIcon}
                                    alt="accept"
                                    onClick={handleAccepButtonClick}
                                />
                            }
                            {user.function === "vrijwilliger" && tasks.status === "In behandeling" &&
                                <Icon
                                    text="Voltooien"
                                    image={taskDoneIcon}
                                    alt="complete"
                                    onClick={handleCompleteButtonClick}
                                />
                            }

                            {user.function === "manager" &&
                                <>
                                    <Icon
                                        text="Voltooien"
                                        image={taskDoneIcon}
                                        alt="complete"
                                        onClick={handleCompleteButtonClick}
                                    />
                                    <Icon
                                        text="Bewerken"
                                        image={editIcon}
                                        alt="edit"
                                        onClick={() => {
                                            history.push(`/openstaande-taken/${title}/bewerken`)
                                        }}
                                    />
                                    <Icon
                                        text="Verwijderen"
                                        image={deleteTaskIcon}
                                        alt="delete"
                                        onClick={toggleWarningPopup}
                                    />
                                </>
                            }
                        </div>
                    </>
                }
                {error && <span className={styles.error}>Oeps, er ging iets mis. Probeer het opnieuw</span>}
            </ContentCard>
            <img
                onClick={() => {
                    history.goBack()
                }}
                className={styles["back-icon"]}
                src={backIcon}
                alt="back"
            />
            {warningPopup &&
                <WarningPopup
                    text="Deze actie zal de taak definitief verwijderen."
                    toggleWarningPopup={toggleWarningPopup}
                    handleButtonClick={handleDeleteButtonClick}
                />}
        </InnerOuterContainer>
    );
}

export default TaskDetails;