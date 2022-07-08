import styles from './Profile.module.css'
import React, {useContext, useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
// import profilePicture from '../../assets/profile_picture.jpeg'
import editIcon from '../../assets/edit_task_icon.svg'
import {useHistory} from "react-router-dom";
import Icon from "../../components/icon/Icon";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
//Firebase imports
import {getStorage, ref} from "firebase/storage";
import {db, storage} from "../../Firebase";
import {uploadBytes} from "firebase/storage";
import {deleteObject, getDownloadURL} from "firebase/storage";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";

function Profile({setCurrentPage}) {

    //Statemanagement
    const [uploadCard, toggleUploadCard] = React.useState(false);
    const [error, setError] = React.useState({error: false, message: ""});
    const [loading, toggleLoading] = React.useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = React.useState("");

    const history = useHistory();
    const {register, reset, formState: {errors}, watch, control, handleSubmit} = useForm();
    const {user, auth, toggleAuth} = useContext(AuthContext);


    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Profiel");

        async function fetchProfilePicture() {

            const pictureReference = await getDownloadURL(ref(storage, user.profilePicture))
            setProfilePictureUrl(pictureReference)
        }

        fetchProfilePicture()
    }, [])

    // Fetch new profile picture on user profile picture change
    useEffect(() => {
        async function fetchProfilePicture() {
            const pictureReference = await getDownloadURL(ref(storage, user.profilePicture))
            setProfilePictureUrl(pictureReference)
        }
        fetchProfilePicture()
    }, [user.profilePicture])

    async function handleFileUpload(data) {
        setError({error: false, message: ""});
        toggleLoading(true);

        if (!data.file[0].type.includes("image")) {
            setError({error: true, message: "Alleen afbeeldingen zijn toegestaan"});
        }
        if (data.file[0].size > 4000000) {
            setError({error: true, message: "De afbeelding mag niet groter zijn dan 4 MB"})
        }
        try {
            const imageRef = ref(storage, 'profilePictures/' + user.id + "_" + data.file[0].name);
            await uploadBytes(imageRef, data.file[0]);

            // Change profile picture url in Firebase user information
            // Create Firestore reference to task document
            const taskRef = doc(db, "users", user.id);
            // Update Firestore task document
            await updateDoc(taskRef, {
                // Make image name unique to trigger update useEffect
                profilePicture: 'profilePictures/' + user.id + "_" + data.file[0].name,
            });

            // Delete old profile picture
            const desertRef = ref(storage, user.profilePicture);
            await deleteObject(desertRef);

            toggleAuth({
                ...auth,
                user: {
                    ...user,
                    profilePicture: 'profilePictures/' + user.id + "_" + data.file[0].name,
                },
            })
        } catch (e) {
            console.error(e);
            setError({error: true, message: "Het uploaden is niet gelukt. Probeer opnieuw"})
        }
        toggleLoading(false);
        toggleUploadCard(false);
    }



    return (
        <InnerOuterContainer>
            <h3 className={styles.h3}>Mijn gegevens</h3>
            <ContentCard stylingClass="profile">
                <section className={styles["content-wrapper"]}>
                    <div className={styles["top-section"]}>
                        {uploadCard &&
                            <span className={styles["file-upload"]}>
                                <p className={styles["upload-title"]}>Selecteer een bestand</p>
                                <form className={styles.form} onSubmit={handleSubmit(handleFileUpload)}>
                                    <input className={styles["input-file"]}
                                           type="file" {...register("file", {required: "Selecteer een bestand"})}/>
                                    <div className={styles["buttons-container"]}>
                                        <button className={styles.button} type="submit">Uploaden</button>
                                        <button onClick={() => {
                                            toggleUploadCard(false)
                                        }} className={styles.button}>Annuleren</button>
                                    </div>
                                    {errors["file"] && <p className={styles.error}>{errors["file"].message}</p>}
                                    {error.error && <span className={styles.error}>{error.message}</span>}
                                    {loading && !error.error && <span>Even geduld...</span>}
                                </form>

                            </span>
                        }
                        <figure className={styles["profile-picture-container"]}>
                            <img className={styles.img} src={profilePictureUrl} alt="profiel"/>
                            <button type="button" onClick={() => {
                                toggleUploadCard(true)
                            }} disabled={uploadCard} className={styles["edit-profile-button"]}>Wijzig
                            </button>
                        </figure>
                        <div className={styles["name-container"]}>
                            <p className={styles.name}>{user.firstName}</p>
                            <p className={styles.name}>{user.lastName}</p>
                        </div>
                    </div>
                    <div className={styles["bottom-section"]}>
                        <p className={styles["profile-details"]}>Email: <span>{user.email}</span></p>
                        <p className={styles["profile-details"]}>Functie: <span>{user.function}</span></p>
                        <p className={styles["profile-details"]}>Specialiteiten: <span>{user.specialties.join(", ")}</span>
                        </p>
                    </div>
                </section>
                <figure className={styles["icon-container"]}>
                    <Icon
                        text="Bewerken"
                        image={editIcon}
                        alt="edit"
                        onClick={() => {
                            history.push("/profiel-wijzigen")
                        }}
                    />
                </figure>
            </ContentCard>
        </InnerOuterContainer>
    );
}

export default Profile;