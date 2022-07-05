import styles from './Personnel.module.css'
import React, {useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import Select from "react-select";
import SelectElement from "../../components/selectElement/SelectElement";
import Icon from "../../components/icon/Icon";
import saveIcon from "../../assets/save_task_icon.svg";
import {useForm} from "react-hook-form";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "../../Firebase";


function Personnel({navDrawer, toggleNavDrawer, setCurrentPage}) {

    //State management
    const [volunteers, setVolunteers] = React.useState([]);
    const [error, toggleError] = React.useState(false);
    const [loading, toggleLoading] = React.useState(false);


    const {register, reset, formState: {errors}, watch, control, handleSubmit} = useForm();


    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Personeel")
        toggleNavDrawer(false);

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
                            specialties: doc.data().specialties,
                        },
                    })
                })
                setVolunteers([...volunteers, ...volunteersArray]);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        fetchVolunteers();
    }, []);

    async function handleSave(data) {
        toggleError(false);
        toggleLoading(true);
        try {
            // Create Firestore reference to task document
            const taskRef = doc(db, "users", data.volunteers.id);
            // Update Firestore task document
            await updateDoc(taskRef, {
                function: "manager",
            });
            // Remove volunteer from the state
            setVolunteers(current =>
                current.filter(volunteers => {
                    return volunteers.label !== `${data.volunteers.firstName} ${data.volunteers.lastName}`;
                }),
            );
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <h3 className={styles.h3}>Overzicht vrijwilligers</h3>
            <ContentCard stylingClass="table">
                <table className={styles.table}>
                    <thead className={styles.thead}>
                    <tr>
                        <th className={styles.th}>Voornaam</th>
                        <th className={styles.th}>Achternaam</th>
                        <th className={styles.th}>Specialiteiten</th>
                    </tr>
                    </thead>
                    <tbody>
                    {volunteers.length > 0 &&
                        volunteers.map((volunteer) => {
                            return (
                                <tr key={volunteer.value.id}>
                                    <td className={styles.td}>{volunteer.value.firstName}</td>
                                    <td className={styles.td}>{volunteer.value.lastName}</td>
                                    <td className={styles.td}>{volunteer.value.specialties.join(", ")}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </ContentCard>
            <h3 className={styles.h3}>Manager toevoegen</h3>
            <ContentCard stylingClass="personnel">
                <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
                    {loading && !error ? <span className={styles.loading}>Gegevens worden opgehaald...</span>
                        :
                        <>
                            <SelectElement
                                name="volunteers"
                                options={volunteers}
                                controller={control}
                                isMulti={false}
                                placeholder="Selecteer vrijwilligers"
                                errorMessage="Selecteer minimaal een vrijwilliger"
                            />
                            <div className={styles["icon-container"]}>
                                <Icon
                                    text="Opslaan"
                                    image={saveIcon}
                                />
                            </div>
                        </>
                    }
                    {errors["volunteers"] && <p className={styles.error}>{errors["volunteers"].message}</p>}
                </form>
                {error && <span
                    className={styles.error}>Oeps, er ging iets mis. Probeer het opnieuw</span>}
            </ContentCard>
        </InnerOuterContainer>
    );
}

export default Personnel;