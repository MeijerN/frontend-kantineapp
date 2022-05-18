import React from 'react';
import styles from './Header.module.css'
import navigationHamburger from '../../assets/navigation_hamburger.svg'

function Header({page, highPrioNumber, mediumPrioNumber, lowPrioNumber, openTasksNumber}) {
    return (
        <header className={styles.header}>
            <section className={styles["left-side"]}>
                <img src={navigationHamburger} alt="navigation-menu" width="30px" height="30px"/>
                <h1>{page}</h1>
                <p className={styles.date}>Datum</p>
            </section>
            <section className={styles["right-side"]}>
                <div className={styles["priorities-overview-container"]}>
                    <div className={styles["prio-container"]}>
                        <p>{highPrioNumber}</p>
                        <p>Hoog</p>
                    </div>
                    <div className={styles["prio-container"]}>
                        <p>{mediumPrioNumber}</p>
                        <p>Middel</p>
                    </div>
                    <div className={styles["prio-container"]}>
                        <p>{lowPrioNumber}</p>
                        <p>Laag</p>
                    </div>
                </div>
                <div className={styles["open-tasks-container"]}>
                    <p>{openTasksNumber}</p>
                    <p>in behandeling</p>
                </div>
            </section>
            <div className={styles.line}></div>
        </header>
    );
};

export default Header;