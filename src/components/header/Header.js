import React, {useEffect, useState} from 'react';
import styles from './Header.module.css'
import navigationHamburger from '../../assets/navigation_hamburger.svg'

function Header({page, highPrioNumber, mediumPrioNumber, lowPrioNumber, openTasksNumber, navDrawer, toggleNavDrawer}) {

    function handleOnClick() {
        toggleNavDrawer(!navDrawer);
    }

    return (
        <header className={styles.header}>
            <div className={styles["content-container"]}>
                <section className={styles["left-side"]}>
                    <img className={styles.img} src={navigationHamburger} onClick={handleOnClick} alt="navigation-menu" width="30px"
                         height="30px"/>
                    <h1 className={styles.h1}>{page}</h1>
                    <p className={styles.date}>Datum</p>
                </section>
                <section className={styles["right-side"]}>
                    <div className={styles["priorities-overview-container"]}>
                        <div className={styles["prio-container"]}>
                            <p className={styles.p}>{highPrioNumber}</p>
                            <p className={styles.p}>Hoog</p>
                        </div>
                        <div className={styles["prio-container"]}>
                            <p className={styles.p}>{mediumPrioNumber}</p>
                            <p className={styles.p}>Middel</p>
                        </div>
                        <div className={styles["prio-container"]}>
                            <p className={styles.p}>{lowPrioNumber}</p>
                            <p className={styles.p}>Laag</p>
                        </div>
                    </div>
                    <div className={styles["open-tasks-container"]}>
                        <p className={styles.p}>{openTasksNumber}</p>
                        <p className={styles.p}>in behandeling</p>
                    </div>
                </section>
                <div className={styles.line}/>
            </div>
        </header>
    );
};

export default Header;