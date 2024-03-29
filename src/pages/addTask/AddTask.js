import styles from './AddTask.module.css';
import React, {useContext, useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import {useHistory} from "react-router-dom";
import saveIcon from '../../assets/save_task_icon.svg';
import backIcon from '../../assets/back_icon.svg';
import Icon from "../../components/icon/Icon";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import SelectElement from "../../components/selectElement/SelectElement";
import {useForm} from 'react-hook-form';
import {AuthContext} from "../../context/AuthContext";
import priorityOptions from "../../helpers/priorityOptions";
// Firestore imports
import {addDoc} from "firebase/firestore";
import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from '../../Firebase';
import sortOnFirstName from "../../helpers/sortOnFirstName";

function AddTask({setCurrentPage}) {

    //Stage management
    const [volunteers, setVolunteers] = React.useState([]);
    const [error, toggleError] = React.useState(false);

    const history = useHistory();
    const {register, reset, formState: {errors}, control, handleSubmit} = useForm();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Taak toevoegen");
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
                });
                sortOnFirstName(volunteersArray);
                setVolunteers([...volunteers, ...volunteersArray]);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        fetchVolunteers();
    }, [])

    async function handleSave(data) {
        toggleError(false);
        try {
            const volunteersId = data.volunteers.map((volunteer) => {
                return volunteer.id
            });
            // Create new firebase document with task information
            await addDoc(collection(db, "tasks"), {
                title: data.title.trim(),
                description: data.description,
                status: "In afwachting",
                priority: data.priority,
                createdOn: new Date().toString(),
                createdBy: user.id,
                assignedVolunteers: data.volunteers,
                assignedVolunteersId: volunteersId,
            });
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        reset();
        history.push("/openstaande-taken")
    }

    return (
        <InnerOuterContainer>
            <ContentCard stylingClass="add-task">
                <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
                    <label htmlFor="title" className={styles["label-textarea-add-task"]}>
                        Titel:
                        <input
                            className={styles["add-task"]}
                            type="text"
                            id="title"
                            {...register("title", {
                                required: "Vul de titel in",
                                maxLength: {
                                    value: 40,
                                    message: "Titel mag maximaal 40 karakters bevatten",
                                },
                                pattern: {
                                    value: /^[^#%/?]+$/,
                                    message: "De titel mag geen #, % of / karakters bevatten"
                                },
                            })}
                        />
                    </label>
                    <label htmlFor="textarea-add-task" className={styles["label-textarea-add-task"]}>
                        Omschrijving van de taak:
                        <textarea
                            className={styles["textarea-add-task"]}
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
                        />
                    </label>
                    <SelectElement
                        name="priority"
                        options={priorityOptions()}
                        controller={control}
                        stylingClass="select"
                        isMulti={false}
                        placeholder="Selecteer prioriteit"
                        errorMessage="Selecteer een prioriteit"
                    />
                    <SelectElement
                        name="volunteers"
                        options={volunteers}
                        controller={control}
                        isMulti={true}
                        placeholder="Selecteer vrijwilligers"
                        errorMessage="Selecteer minimaal een vrijwilliger"
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
                    {error && <span className={styles.error}>Oeps, er ging iets mis. Probeer het opnieuw</span>}
                </form>
            </ContentCard>
            <img
                onClick={() => {
                    history.goBack()
                }}
                className={styles["back-icon"]}
                src={backIcon}
                alt="back"
            />
        </InnerOuterContainer>
    );
}

export default AddTask;