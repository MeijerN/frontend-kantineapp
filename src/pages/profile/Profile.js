import styles from './Profile.module.css'
import React, {useEffect} from 'react';
import NavigationDrawer from "../../components/navigationDrawer/NavigationDrawer";
import ContentCard from "../../components/contentCard/ContentCard";
import profilePicture from '../../assets/profile_picture.jpeg'
import editIcon from '../../assets/edit_icon.svg'
import Select from 'react-select'
import {Redirect, useHistory} from "react-router-dom";

function Profile({navDrawer, toggleNavDrawer, setCurrentPage}) {

    const history = useHistory();

    // const [edit, toggleEdit] = React.useState(false);
    // const [firstName, setFirstName] = React.useState("Niek");
    // const [lastName, setLastName] = React.useState("Meijer");
    // const [email, setEmail] = React.useState("meyerniek@hotmail.com");
    // const [role, setRole] = React.useState("manager");

    // const options = [
    //     {value: 'chocolate', label: 'Chocolate'},
    //     {value: 'strawberry', label: 'Strawberry'},
    //     {value: 'poep', label: 'Poep'},
    //     {value: 'tegel', label: 'Tegel'},
    //     {value: 'snoep', label: 'Snoep'},
    //     {value: 'plant', label: 'Plant'},
    //     {value: 'stroo', label: 'Stroo'},
    // ]

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Profiel");
        toggleNavDrawer(false);
    }, [])

    function handleOnclick() {
        history.push("/profiel/wijzigen");
    }

    return (
        <main>
            <NavigationDrawer
                navDrawer={navDrawer}
                toggleNavDrawer={toggleNavDrawer}
            />
            <section className="page-section">
                <h3 className={styles.h3}>Mijn gegevens</h3>
                <ContentCard>
                    <section className={styles["content-wrapper"]}>
                        <div className={styles["top-section"]}>
                            <figure className={styles["profile-picture-container"]}>
                                <img className={styles.img} src={profilePicture} alt="profiel"/>
                            </figure>
                            <div className={styles["name-container"]}>
                                <p className={styles.name}>Niek</p>
                                <p className={styles.name}>Meijer</p>
                                {/*{!edit &&*/}
                                {/*    <>*/}
                                {/*        <p className={styles.name}>Niek</p>*/}
                                {/*        <p className={styles.name}>Meijer</p>*/}
                                {/*    </>*/}
                                {/*}*/}
                                {/*{edit &&*/}
                                {/*    <>*/}
                                {/*        <input*/}
                                {/*            className={styles["input-name"]}*/}
                                {/*            id="first-name"*/}
                                {/*            type="text"*/}
                                {/*            placeholder="Voornaam"*/}
                                {/*            value={firstName}*/}
                                {/*            onChange={(e) => {*/}
                                {/*                setFirstName(e.target.value)*/}
                                {/*            }}*/}
                                {/*        />*/}
                                {/*        <input*/}
                                {/*            className={styles["input-name"]}*/}
                                {/*            id="last-name"*/}
                                {/*            type="text"*/}
                                {/*            placeholder="Achternaam"*/}
                                {/*            value={lastName}*/}
                                {/*            onChange={(e) => {*/}
                                {/*                setLastName(e.target.value)*/}
                                {/*            }}*/}
                                {/*        />*/}
                                {/*    </>*/}
                                {/*}*/}
                            </div>
                        </div>
                        <div className={styles["bottom-section"]}>
                            <p>Email: meyerniek@hotmail.com</p>
                            <p>Functie: manager</p>
                            <p>Specialiteiten: ICT, schilderen, santair </p>
                            {/*{!edit &&*/}
                            {/*    <>*/}
                            {/*        <p>Email: {email}</p>*/}
                            {/*        <p>Functie: manager</p>*/}
                            {/*        <p>Specialiteiten: ICT, schilderen, santair </p>*/}
                            {/*    </>*/}
                            {/*}*/}
                            {/*{edit &&*/}
                            {/*    <>*/}
                            {/*        <p>Email: <input*/}
                            {/*            className={styles["edit-bottom-information"]}*/}
                            {/*            id="email"*/}
                            {/*            type="email"*/}
                            {/*            placeholder="Email"*/}
                            {/*            value={email}*/}
                            {/*            onChange={(e) => {*/}
                            {/*                setEmail(e.target.value)*/}
                            {/*            }}*/}
                            {/*        />*/}
                            {/*        </p>*/}
                            {/*        <p>Functie: {role}</p>*/}
                            {/*        <p>Specialiteiten:<Select className={styles.select} options={options} isMulti/></p>*/}
                            {/*    </>*/}
                            {/*}*/}
                        </div>
                    </section>
                    <figure onClick={handleOnclick} className={styles["edit-icon-container"]}>
                        <img className={styles["edit-icon"]} src={editIcon} alt="edit"/>
                        <p className={styles["edit-icon-text"]}>Bewerken</p>
                    </figure>
                </ContentCard>
            </section>
        </main>
    );
}

export default Profile;