import React from 'react';
import styles from './NavigationDrawer.module.css'
import { Link } from "react-router-dom";
import SVDLogo from '../../assets/SVDlogo.png'
import closeMenuIcon from '../../assets/close_menu.svg'
import profilePicture from '../../assets/profile_picture.jpeg'

function NavigationDrawer({navDrawer, toggleNavDrawer}) {

    function closeNav() {
        toggleNavDrawer(!navDrawer);
    }

    return (
        <nav className={navDrawer === true ? styles["side-nav-open"] : styles["side-nav-closed"]}>
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
                    <img className={styles["profile-picture"]} src={profilePicture} alt="profile"/>
                </figure>
                <div className={styles["details-container"]}>
                    <h1>Voornaam</h1>
                    <p>Functie</p>
                </div>
                <div className={styles.line}/>
            </header>
            <ul className={styles.ul}>
                <li>
                    <Link to="/openstaande-taken">Openstaande taken</Link>
                </li>
                <li>
                    <Link to="#">Urenregistratie</Link>
                </li>
                <li>
                    <Link to="#">Statistieken</Link>
                </li>
                <li>
                    <Link to="#">Profiel</Link>
                </li>
                <li>
                    <Link to="/">Uitloggen</Link>
                </li>
            </ul>
            <figure className={styles["SVD-logo-container"]}>
                <img src={SVDLogo} alt="SVD-logo"/>
            </figure>
        </nav>
    );
}

export default NavigationDrawer;