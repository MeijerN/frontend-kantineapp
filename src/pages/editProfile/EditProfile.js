import styles from './EditProfile.module.css';
import React, {useContext, useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import Select from 'react-select';
import {useHistory} from "react-router-dom";
import InputField from "../../components/inputField/InputField";
import saveIcon from '../../assets/save_task_icon.svg';
import backIcon from '../../assets/back_icon.svg';
import Icon from "../../components/icon/Icon";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import SelectElement from "../../components/selectElement/SelectElement";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../Firebase";

function EditProfile({setCurrentPage}) {

    //State management
    const [error, toggleError] = React.useState(false);

    const history = useHistory();
    const {register, reset, formState: {errors}, watch, control, handleSubmit} = useForm();
    const {user, auth, toggleAuth} = useContext(AuthContext);

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Profiel wijzigen");
    }, [])

    async function handleSave(data) {
        toggleError(false);
        try {
            const specialtiesArray = [];
            data.specialties.map((specialty) => {
                specialtiesArray.push(specialty.value)
            })
            // Create Firestore reference to task document
            const taskRef = doc(db, "users", user.id);
            // Update Firestore task document
            await updateDoc(taskRef, {
                firstName: data["first-name"],
                lastName: data["last-name"],
                email: data.email,
                specialties: specialtiesArray,
            });
            toggleAuth({
                ...auth,
                user: {
                    ...user,
                    firstName: data["first-name"],
                    lastName: data["last-name"],
                    email: data.email,
                    specialties: specialtiesArray,
                },
            })
            history.push("/profiel")
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
                        options={[
                            {value: 'sanitair', label: 'Sanitair'},
                            {value: 'elektra', label: 'Elektra'},
                            {value: 'schilderwerk', label: 'Schilderwerk'},
                            {value: 'bouwen', label: 'Bouwen'},
                            {value: 'dakwerk', label: 'Dakwerk'},
                            {value: 'slopen', label: 'Slopen'},
                            {value: 'tuin', label: 'Tuin'},
                        ]}
                        controller={control}
                        isMulti={true}
                        placeholder="Selecteer specialisaties"
                        errorMessage="Selecteer minimaal een specialisatie"
                        defaultValues={user.specialties === "Geen specialisaties toegevoegd" ? ""
                            :
                            user.specialties.map((specialty) => {
                                return (
                                    {
                                        label: specialty,
                                        value: specialty,
                                    }
                                )
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
                    {error && <span
                        className={styles.error}>Oeps, er ging iets mis. Probeer het opnieuw</span>}
                </form>
            </ContentCard>
            <img onClick={() => {
                history.goBack()
            }} className={styles["back-icon"]} src={backIcon} alt="back"/>
        </InnerOuterContainer>
    );
}

export default EditProfile;