import styles from './TaskDetails.module.css'
import React, {useContext, useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import editIcon from '../../assets/edit_task_icon.svg'
import {useHistory, useParams} from "react-router-dom";
import backIcon from "../../assets/back_icon.svg";
import Icon from "../../components/icon/Icon";
import taskDoneIcon from '../../assets/task_done_icon.svg'
import deleteTaskIcon from '../../assets/delete_task_icon.svg'
import acceptTaskIcon from '../../assets/accept_task_icon.svg'
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import assignedVolunteerString from "../../helpers/assignedVolunteerString";
import {AuthContext} from "../../context/AuthContext";
//Firebase imports
import {collection, getDocs, query, where, doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from "../../Firebase";

function TaskDetails({navDrawer, toggleNavDrawer, setCurrentPage}) {

    //Stage management
    const [data, setData] = React.useState({});
    const [docId, setDocId] = React.useState();
    const [error, toggleError] = React.useState(false);
    const [loading, toggleLoading] = React.useState(true);

    const history = useHistory();
    const {id} = useParams();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Taak details");
        toggleNavDrawer(false);
        toggleError(false);
        toggleLoading(true);

        async function fetchTaskDetails() {
            try {
                // Create a query to fetch task details on uniqe createdOn timestamp
                const q = query(collection(db, "tasks"), where("createdOn", "==", parseInt(id, 10)));
                // Execute query
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setData(doc.data());
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

    function handleEditButtonClick() {
        history.push(`/openstaande-taken/${id}/bewerken`)
    }

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
            setData({
                ...data,
                status: "In behandeling",
            })
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
                status: "Voltooid op: " + Date.now(),
                completedBy: `${user.firstName} ${user.lastName}`,
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
        history.push("/openstaande-taken")
    }

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <ContentCard stylingClass="task-details">
                {loading && !error ? <span className={styles.loading}>De gegevens worden opgehaald...</span>
                    :
                    <>
                        <p className={styles.status}><span className={styles["dot-low"]}/> {data.status}</p>
                        <h3>{data.title}</h3>
                        <label htmlFor="textarea-task-details" className={styles["label-textarea-task-details"]}>
                            Beschrijving:
                            <p className={styles["textarea-task-details"]}>
                                {data.description}
                            </p>
                        </label>

                        <p className={styles.p}>Prioriteit: <span>{data.priority.value}</span></p>
                        <label htmlFor="task-owners-table" className={styles["label-task-owners-table"]}>
                            Aangewezen vrijwilligers:
                            <p className={styles["assigned-users"]}>
                                {Object.keys(data).length > 0 &&
                                    assignedVolunteerString(data.assignedVolunteers, user)
                                }
                            </p>
                        </label>

                        <div className={styles["icon-container"]}>
                            {user.function === "vrijwilliger" && data.status === "In afwachting" &&
                                <Icon
                                    text="In behandeling nemen"
                                    image={acceptTaskIcon}
                                    alt="accept"
                                    onClick={handleAccepButtonClick}
                                />
                            }
                            {user.function === "vrijwilliger" && data.status === "In behandeling" &&
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
                                            history.push(`/openstaande-taken/${data.createdOn}/bewerken`)
                                        }}
                                    />
                                    <Icon
                                        text="Verwijderen"
                                        image={deleteTaskIcon}
                                        alt="delete"
                                        onClick={handleDeleteButtonClick}
                                    />
                                </>
                            }
                        </div>
                    </>
                }
                {error && <span className={styles.error}>Oeps, er ging iets mis. Probeer het opnieuw</span>}
            </ContentCard>
            <img onClick={() => {
                history.goBack()
            }} className={styles["back-icon"]} src={backIcon} alt="back"/>
        </InnerOuterContainer>
    );
}

export default TaskDetails;