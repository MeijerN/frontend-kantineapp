import React, {useContext, useEffect, useState} from 'react';
import styles from './Header.module.css'
import navigationHamburger from '../../assets/navigation_hamburger.svg'
import {AuthContext} from "../../context/AuthContext";
import calculateInProgressHeaderTasks from "../../helpers/calculateInProgressHeaderTasks";
import calculateHeaderTasks from "../../helpers/calculateHeaderTasks";
import createCurrentDate from "../../helpers/createCurrentDate";
//Firebase imports
import {db} from "../../Firebase";
import {collection, query, where, onSnapshot} from "firebase/firestore";


function Header({page, highPrioNumber, mediumPrioNumber, lowPrioNumber, openTasksNumber, navDrawer, toggleNavDrawer}) {

    //State management
    const [tasks, setTasks] = React.useState([]);

    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (user.function === "manager") {
            const q = query(collection(db, "tasks"), where("status", "in", ["In afwachting", "In behandeling"]));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const openTasks = [];
                querySnapshot.forEach((doc) => {
                    openTasks.push(doc.data());
                });
                setTasks(openTasks);
            });
            return function cleanUp() {
                unsubscribe();
            }
        } else {
            const q = query(collection(db, "tasks"), where("assignedVolunteersId", "array-contains", user.id), where("status", "in", ["In afwachting", "In behandeling"]));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const openTasks = [];
                querySnapshot.forEach((doc) => {
                    openTasks.push(doc.data());
                });
                setTasks(openTasks);
            });
            return function cleanUp() {
                unsubscribe();
            }
        }

    }, []);

    function handleOnClick() {
        toggleNavDrawer(!navDrawer);
    }

    return (
        <header className={styles.header}>
            <div className={styles["content-container"]}>
                <section className={styles["left-side"]}>
                    <img className={styles.img} src={navigationHamburger} onClick={handleOnClick} alt="navigation-menu"
                         width="30px"
                         height="30px"/>
                    <h1 className={styles.h1}>{page}</h1>
                    <p className={styles.date}>{createCurrentDate()}</p>
                </section>
                <section className={styles["right-side"]}>
                    <div className={styles["priorities-overview-container"]}>
                        <div className={styles["prio-container"]}>
                            <p className={styles.p}>{calculateHeaderTasks(tasks, "hoog")}</p>
                            <p className={styles.p}>Hoog</p>
                        </div>
                        <div className={styles["prio-container"]}>
                            <p className={styles.p}>{calculateHeaderTasks(tasks, "middel")}</p>
                            <p className={styles.p}>Middel</p>
                        </div>
                        <div className={styles["prio-container"]}>
                            <p className={styles.p}>{calculateHeaderTasks(tasks, "laag")}</p>
                            <p className={styles.p}>Laag</p>
                        </div>
                    </div>
                    <div className={styles["open-tasks-container"]}>
                        <p className={styles.p}>{calculateInProgressHeaderTasks(tasks)}</p>
                        <p className={styles.p}>in behandeling</p>
                    </div>
                </section>
                <div className={styles.line}/>
            </div>
        </header>
    );
};

export default Header;