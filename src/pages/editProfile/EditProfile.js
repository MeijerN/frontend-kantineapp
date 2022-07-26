import styles from './EditProfile.module.css';
import React, {useContext, useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import {useHistory} from "react-router-dom";
import saveIcon from '../../assets/save_task_icon.svg';
import backIcon from '../../assets/back_icon.svg';
import Icon from "../../components/icon/Icon";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import SelectElement from "../../components/selectElement/SelectElement";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext";
import specialtiesOptions from "../../helpers/specialtiesOptions";
// Firebase imports
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../Firebase";
import {updateEmail} from "firebase/auth";
import {authFirebase} from "../../Firebase";

function EditProfile({setCurrentPage}) {

    //State management
    const [error, toggleError] = React.useState(false);

    const history = useHistory();
    const {register, formState: {errors}, control, handleSubmit} = useForm();
    const {user, auth, toggleAuth} = useContext(AuthContext);

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Profiel wijzigen");
    }, [])

    async function handleSave(data) {
        toggleError(false);
        try {
            // Collect specialties from user input
            const specialtiesArray = [];
            data.specialties.map((specialty) => {
                // If data is comming from new select input
                if (specialty.value) {
                    specialtiesArray.push(specialty.value);
                    // If data is unaltered and comming from Firebase
                } else {
                    specialtiesArray.push(specialty)
                }
            });
            // Create Firestore reference to user details document
            const taskRef = doc(db, "users", user.id);
            // Update Firestore user details document
            await updateDoc(taskRef, {
                firstName: data["first-name"],
                lastName: data["last-name"],
                email: data.email,
                specialties: specialtiesArray,
            });
            // Update user email in Firebase Authentication for login purposes
            await updateEmail(authFirebase.currentUser, data.email.toLowerCase());
            toggleAuth({
                ...auth,
                user: {
                    ...user,
                    firstName: data["first-name"],
                    lastName: data["last-name"],
                    email: data.email,
                    specialties: specialtiesArray,
                },
            });
            history.push("/profiel");
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    return (
        <InnerOuterContainer>
            <h3 className={styles.h3}>Mijn gegevens</h3>
            <ContentCard stylingClass="edit-profile">
                <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
                    <input
                        type="text"
                        placeholder="Voornaam"
                        className={styles["edit-profile"]}
                        {...register("first-name", {
                            required: "Vul uw voornaam in",
                        })}
                        defaultValue={user.firstName}
                    />
                    <input
                        type="text"
                        placeholder="Achternaam"
                        className={styles["edit-profile"]}
                        {...register("last-name", {
                            required: "Vul uw achternaam in",
                        })}
                        defaultValue={user.lastName}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className={styles["edit-profile"]}
                        {...register("email", {
                            required: "Vul uw email in",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Ongeldige email",
                            }
                        })}
                        defaultValue={user.email}
                    />
                    <SelectElement
                        name="specialties"
                        options={specialtiesOptions()}
                        controller={control}
                        isMulti={true}
                        placeholder="Selecteer specialisaties"
                        errorMessage="Selecteer minimaal een specialisatie"
                        defaultValues={user.specialties[0] === "Geen specialiteiten toegevoegd" ? ""
                            :
                            user.specialties.map((specialty) => {
                                return (
                                    {
                                        label: specialty,
                                        value: specialty,
                                    }
                                );
                            })}
                    />
                    <div className={styles["icon-container"]}>
                        <Icon
                            text="Opslaan"
                            image={saveIcon}
                        />
                    </div>
                    {errors["first-name"] && <p className={styles.error}>{errors["first-name"].message}</p>}
                    {errors["last-name"] && <p className={styles.error}>{errors["last-name"].message}</p>}
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    {errors["specialties"] && <p className={styles.error}>{errors["specialties"].message}</p>}
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

export default EditProfile;