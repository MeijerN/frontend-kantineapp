import styles from './Profile.module.css';
import React, {useContext, useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import editIcon from '../../assets/edit_task_icon.svg';
import deleteAccountIcon from '../../assets/delete_account.svg';
import {useHistory} from "react-router-dom";
import Icon from "../../components/icon/Icon";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import specialtiesString from "../../helpers/specialtiesString";
//Firebase imports
import {ref} from "firebase/storage";
import {authFirebase, db, storage} from "../../Firebase";
import {uploadBytes} from "firebase/storage";
import {deleteObject, getDownloadURL} from "firebase/storage";
import {collection, deleteDoc, doc, getDocs, updateDoc, query, where} from "firebase/firestore";
import WarningPopup from "../../components/warningPopup/WarningPopup";
import {deleteUser} from "firebase/auth";

function Profile({setCurrentPage}) {

    //Statemanagement
    const [uploadCard, toggleUploadCard] = React.useState(false);
    const [error, setError] = React.useState({error: false, message: ""});
    const [loading, toggleLoading] = React.useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = React.useState("");
    const [warningPopup, toggleWarningPopup] = React.useState(false);

    const history = useHistory();
    const {register, formState: {errors}, handleSubmit} = useForm();
    const {user, auth, toggleAuth} = useContext(AuthContext);


    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Profiel");
        toggleLoading(true);

        async function fetchProfilePicture() {
            const pictureReference = await getDownloadURL(ref(storage, user.profilePicture));
            setProfilePictureUrl(pictureReference);
            toggleLoading(false);
        }

        fetchProfilePicture()
    }, [])

    // Fetch new profile picture on user profile picture change
    useEffect(() => {
        toggleLoading(true);

        async function fetchProfilePicture() {
            const pictureReference = await getDownloadURL(ref(storage, user.profilePicture));
            setProfilePictureUrl(pictureReference);
            toggleLoading(false);
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
            setError({error: true, message: "De afbeelding mag niet groter zijn dan 4 MB"});
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
            // Don't delete the default profile picture
            if (desertRef.name !== "default_profile_picture.jpeg") {
                await deleteObject(desertRef);
            }
            toggleAuth({
                ...auth,
                user: {
                    ...user,
                    profilePicture: 'profilePictures/' + user.id + "_" + data.file[0].name,
                },
            });
        } catch (e) {
            console.error(e);
            setError({error: true, message: "Het uploaden is niet gelukt. Probeer opnieuw"});
        }
        toggleLoading(false);
        toggleUploadCard(false);
    }

    async function handleDeleteAccountClick() {
        try {
            // Delete user from Firebase authentication
            const userFirebase = authFirebase.currentUser;
            await deleteUser(userFirebase);
            // Delete Firebase user details documents
            await deleteDoc(doc(db, "users", user.id));
            // Delete Firebase user sessions
            const q = query(collection(db, "sessions"), where("session.id", "==", user.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref);
            });
            // Delete Firebase profile picture if picture is NOT default picture
            if (user.profilePicture !== "profilePictures/default_profile_picture.jpeg") {
                const profilePictureRef = ref(storage, user.profilePicture);
                await deleteObject(profilePictureRef);
            }
        } catch (e) {
            if (e.message.includes("auth/requires-recent-login")) {
                setError({
                    error: true,
                    message: "Wegens veiligheidskwesties moet er opnieuw ingelogd worden om dit account te verwijderen"
                });
                toggleWarningPopup(false);
            } else {
                console.error(e);
                setError({
                    error: true,
                    message: "Er is iets misgegaan met het verwijderen van het account. Probeer het opnieuw"
                });
                toggleWarningPopup(false);
            }
        }
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
                                    <input
                                        className={styles["input-file"]}
                                        type="file" {...register("file", {required: "Selecteer een bestand"})}
                                    />
                                    <div className={styles["buttons-container"]}>
                                        <button
                                            className={styles.button}
                                            type="submit">Uploaden
                                        </button>
                                        <button
                                            onClick={() => {
                                                toggleUploadCard(false);
                                            }}
                                            className={styles.button}>Annuleren
                                        </button>
                                    </div>
                                    {errors["file"] && <p className={styles.error}>{errors["file"].message}</p>}
                                    {error.error && <span className={styles.error}>{error.message}</span>}
                                    {loading && !error.error && <span>Even geduld...</span>}
                                </form>
                            </span>
                        }
                        {loading && !error ? <span>Profielfoto wordt opgehaald...</span>
                            :
                            <figure className={styles["profile-picture-container"]}>
                                <img
                                    className={styles.img}
                                    src={profilePictureUrl}
                                    alt="profiel"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        toggleUploadCard(true)
                                    }}
                                    disabled={uploadCard}
                                    className={styles["edit-profile-button"]}
                                >
                                    Wijzig
                                </button>
                            </figure>}
                        <div className={styles["name-container"]}>
                            <p className={styles.name}>{user.firstName}</p>
                            <p className={styles.name}>{user.lastName}</p>
                        </div>
                    </div>
                    <div className={styles["bottom-section"]}>
                        <p className={styles["profile-details"]}>Email: <span>{user.email}</span></p>
                        <p className={styles["profile-details"]}>Functie: <span>{user.function.charAt(0).toUpperCase() + user.function.slice(1)}</span></p>
                        <p className={styles["profile-details"]}>Specialiteiten: <span>{specialtiesString(user.specialties)}</span></p>
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
                    <Icon
                        text="Account verwijderen"
                        image={deleteAccountIcon}
                        alt="delete-account"
                        onClick={() => {
                            toggleWarningPopup(true);
                        }}
                    />
                </figure>
                {error.error && <span className={styles.error}>{error.message}</span>}
                {warningPopup &&
                    <WarningPopup
                        text="Deze actie zal uw account en bijbehorende geregistreerde uren definitief verwijderen."
                        toggleWarningPopup={toggleWarningPopup}
                        handleButtonClick={handleDeleteAccountClick}
                    />
                }
            </ContentCard>
        </InnerOuterContainer>
    );
}

export default Profile;