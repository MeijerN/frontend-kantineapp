import React, {useContext, useEffect} from 'react';
import styles from './NavigationDrawer.module.css'
import SVDLogo from '../../assets/SVDlogo.png'
import closeMenuIcon from '../../assets/close_menu.svg'
import NavigationDrawerItem from "../navigationDrawerItem/NavigationDrawerItem";
import {AuthContext} from "../../context/AuthContext";
//Firebase imports
import {getDownloadURL} from "firebase/storage";
import {ref} from "firebase/storage";
import {storage} from "../../Firebase";

function NavigationDrawer({navDrawer, toggleNavDrawer}) {

    // State management
    const [profilePictureUrl, setProfilePictureUrl] = React.useState("");

    const {logout, user} = useContext(AuthContext);

    useEffect(() => {
        async function fetchProfilePicture() {
            const pictureReference = await getDownloadURL(ref(storage, user.profilePicture));
            setProfilePictureUrl(pictureReference);
        }

        fetchProfilePicture();
    }, [])

    // Fetch new profile picture on user profile picture change
    useEffect(() => {
        async function fetchProfilePicture() {
            const pictureReference = await getDownloadURL(ref(storage, user.profilePicture));
            setProfilePictureUrl(pictureReference);
        }

        fetchProfilePicture()
    }, [user.profilePicture])

    function closeNav() {
        toggleNavDrawer(!navDrawer);
    }

    return (
        <nav className={navDrawer ? styles["side-nav-open"] : styles["side-nav-closed"]}>
            <header className={styles.header}>
                <img
                    className={styles["close-menu"]}
                    src={closeMenuIcon}
                    alt="close-menu"
                    width="30px"
                    height="30px"
                    onClick={closeNav}
                />
                <figure className={styles["profile-picture-container"]}>
                    <img
                        className={styles["profile-picture"]}
                        src={profilePictureUrl}
                        alt="profile"
                    />
                </figure>
                <div className={styles["details-container"]}>
                    <h1>{user.firstName}</h1>
                    <p>{user.function}</p>
                </div>
                <div className={styles.line}/>
            </header>
            <ul className={styles.ul}>
                <NavigationDrawerItem
                    text="Openstaande taken"
                    path="/openstaande-taken"
                    onClick={() => {
                        toggleNavDrawer(false);
                    }}
                />
                {user.function === "manager" ?
                    <NavigationDrawerItem
                        text="Personeel"
                        path="/personeel"
                        onClick={() => {
                            toggleNavDrawer(false);
                        }}
                    /> :
                    <NavigationDrawerItem
                        text="Urenregistratie"
                        path="/urenregistratie"
                        onClick={() => {
                            toggleNavDrawer(false);
                        }}
                    />
                }
                <NavigationDrawerItem
                    text="Statistieken"
                    path="/statistieken"
                    onClick={() => {
                        toggleNavDrawer(false)
                    }}
                />
                <NavigationDrawerItem
                    text="Profiel"
                    path="/profiel"
                    onClick={() => {
                        toggleNavDrawer(false)
                    }}
                />
                <NavigationDrawerItem
                    text="Uitloggen"
                    path=""
                    onClick={logout}
                />
            </ul>
            <figure className={styles["SVD-logo-container"]}>
                <img src={SVDLogo} alt="SVD-logo"/>
            </figure>
        </nav>
    );
}

export default NavigationDrawer;