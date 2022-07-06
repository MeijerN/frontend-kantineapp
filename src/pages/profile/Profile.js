import styles from './Profile.module.css'
import React, {useContext, useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import profilePicture from '../../assets/profile_picture.jpeg'
import editIcon from '../../assets/edit_task_icon.svg'
import {useHistory} from "react-router-dom";
import Icon from "../../components/icon/Icon";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
//Firebase imports
import { getStorage, ref } from "firebase/storage";
import {storage} from "../../Firebase";

function Profile({navDrawer, toggleNavDrawer, setCurrentPage}) {

    //Statemanagement
    const [uploadCard, toggleUploadCard] = React.useState(false);

    const history = useHistory();
    const {register, reset, formState: {errors}, watch, control, handleSubmit} = useForm();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Profiel");
        toggleNavDrawer(false);
    }, [])

    function handleFileUpload(data) {
        console.log(data);
        try {
            const spaceRef = ref(storage, 'images/space.jpg');

        } catch (e) {
            console.error(e);

        }
    }

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <h3 className={styles.h3}>Mijn gegevens</h3>
            <ContentCard stylingClass="profile">
                <section className={styles["content-wrapper"]}>
                    <div className={styles["top-section"]}>
                        {uploadCard &&
                            <span className={styles["file-upload"]}>
                                <p className={styles["upload-title"]}>Selecteer een bestand</p>
                                <form onSubmit={handleSubmit(handleFileUpload)}>
                                    <input className={styles["input-file"]} type="file" {...register("file", {
                                        required: true,
                                    })}/>
                                    <button type="submit">Uploaden</button>
                                </form>
                                <button onClick={() => {
                                    toggleUploadCard(false)
                                }} className={styles['cancel-button']}>Annuleren</button>
                            </span>
                        }
                        <figure className={styles["profile-picture-container"]}>
                            <img className={styles.img} src={profilePicture} alt="profiel"/>
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