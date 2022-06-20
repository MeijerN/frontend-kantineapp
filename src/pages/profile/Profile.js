import styles from './Profile.module.css'
import React, {useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import profilePicture from '../../assets/profile_picture.jpeg'
import editIcon from '../../assets/edit_task_icon.svg'
import {useHistory} from "react-router-dom";
import Icon from "../../components/icon/Icon";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";

function Profile({navDrawer, toggleNavDrawer, setCurrentPage}) {

    const history = useHistory();
    const [uploadCard, toggleUploadCard] = React.useState(false);

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Profiel");
        toggleNavDrawer(false);
    }, [])

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <h3 className={styles.h3}>Mijn gegevens</h3>
            <ContentCard stylingClass="standard">
                <section className={styles["content-wrapper"]}>
                    <div className={styles["top-section"]}>
                        {uploadCard &&
                            <span className={styles["file-upload"]}>
                                <p className={styles["upload-title"]}>Selecteer een bestand</p>
                                <input className={styles["input-file"]} type="file"/>
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
                            <p className={styles.name}>Niek</p>
                            <p className={styles.name}>Meijer</p>
                        </div>
                    </div>
                    <div className={styles["bottom-section"]}>
                        <p className={styles["profile-details"]}>Email: <span>meyerniek@hotmail.com</span></p>
                        <p className={styles["profile-details"]}>Functie: <span>manager</span></p>
                        <p className={styles["profile-details"]}>Specialiteiten: <span>ICT, schilderen, santair</span>
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