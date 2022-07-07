import styles from './EditTask.module.css'
import React, {useContext, useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import {useHistory, useParams} from "react-router-dom";
import saveIcon from '../../assets/save_task_icon.svg';
import backIcon from '../../assets/back_icon.svg';
import Icon from "../../components/icon/Icon";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import SelectElement from "../../components/selectElement/SelectElement";
import {useForm} from 'react-hook-form';
import {AuthContext} from "../../context/AuthContext";
// Firestore imports
import {addDoc, doc, updateDoc} from "firebase/firestore";
import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from '../../Firebase'

function EditTask({setCurrentPage}) {

    //Stage management
    const [volunteers, setVolunteers] = React.useState([]);
    const [error, toggleError] = React.useState(false);
    const [docId, setDocId] = React.useState();
    const [data, setData] = React.useState({});
    const [loading, toggleLoading] = React.useState(true);


    const history = useHistory();
    const {register, reset, formState: {errors}, watch, control, handleSubmit} = useForm();
    const {user} = useContext(AuthContext);
    const {id} = useParams();


    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Taak bewerken");
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
                        label: `${doc.data().firstName} ${doc.data().lastName}`,
                        value: {
                            firstName: doc.data().firstName,
                            lastName: doc.data().lastName,
                            id: doc.data().id,
                        },
                    })
                })
                setVolunteers([...volunteers, ...volunteersArray]);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

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

        fetchVolunteers();
        fetchTaskDetails()
    }, [])

    async function handleSave(data) {
        toggleError(false);
        toggleLoading(true);
        // Map over assigned volunteers input data and create array array for Firestore
        const assignedVolunteersArray = data.volunteers.map((volunteer) => {
            return (
                {
                    firstName: volunteer.value.firstName,
                    lastName: volunteer.value.lastName,
                    id: volunteer.value.id,
                }
            )
        })
        try {
            // Create Firestore reference to task document
            const taskRef = doc(db, "tasks", docId);
            // Update Firestore task document
            await updateDoc(taskRef, {
                title: data.title,
                description: data.description,
                priority: {
                    label: data.priority.label,
                    value: data.priority.value,
                },
                assignedVolunteers: assignedVolunteersArray,
            });
            history.push("/openstaande-taken")
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        reset();
        toggleLoading(false);
    }

    return (
        <InnerOuterContainer>
            <ContentCard stylingClass="add-task">
                {loading && !error ? <span className={styles.loading}>Gegevens worden opgehaald...</span>
                    :
                    <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
                        <label htmlFor="title" className={styles["label-textarea-edit-task"]}>
                            Titel:
                            <input
                                className={styles["edit-task"]}
                                type="text"
                                id="title"
                                {...register("title", {
                                    required: "Vul de titel in",
                                })}
                                defaultValue={data.title}
                            />
                        </label>
                        <label htmlFor="textarea-edit-task" className={styles["label-textarea-edit-task"]}>
                            Omschrijving van de taak:
                            <textarea
                                className={styles["textarea-edit-task"]}
                                id="description"
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: "Vul de titel in"
                                    },
                                    maxLength: {
                                        value: 1000,
                                        message: "Er mogen maximaal 1000 karakters gebruikt worden"
                                    }
                                })}
                                defaultValue={data.description}
                            />
                        </label>

                        <SelectElement
                            name="priority"
                            options={[
                                {
                                    label: "Lage prioriteit",
                                    value: "laag",
                                },
                                {
                                    label: "Gemiddelde prioriteit",
                                    value: "middel",
                                },
                                {
                                    label: "Hoge prioriteit",
                                    value: "hoog",
                                },
                            ]}
                            controller={control}
                            stylingClass="select"
                            isMulti={false}
                            placeholder="Selecteer prioriteit"
                            errorMessage="Selecteer een prioriteit"
                            defaultValues={data.priority}
                        />
                        <SelectElement
                            name="volunteers"
                            options={volunteers}
                            controller={control}
                            isMulti={true}
                            placeholder="Selecteer vrijwilligers"
                            errorMessage="Selecteer minimaal een vrijwilliger"
                            defaultValues={data.assignedVolunteers.map((volunteer) => {
                                return {
                                    label: `${volunteer.firstName} ${volunteer.lastName}`,
                                    value: {
                                        firstName: volunteer.firstName,
                                        id: volunteer.id,
                                        lastName: volunteer.lastName,
                                    },
                                }
                            })}
                        />

                        <div className={styles["icon-container"]}>
                            <Icon
                                text="Opslaan"
                                image={saveIcon}
                            />
                        </div>
                        {errors["title"] && <p className={styles.error}>{errors["title"].message}</p>}
                        {errors["description"] && <p className={styles.error}>{errors["description"].message}</p>}
                        {errors["priority"] && <p className={styles.error}>{errors["priority"].message}</p>}
                        {errors["volunteers"] && <p className={styles.error}>{errors["volunteers"].message}</p>}
                        {error && <span
                            className={styles.error}>Oeps, er ging iets mis. Probeer het opnieuw</span>}
                    </form>
                }
            </ContentCard>
            <img onClick={() => {
                history.goBack()
            }} className={styles["back-icon"]} src={backIcon} alt="back"/>
        </InnerOuterContainer>
    );
}

export default EditTask;