import styles from './TimeRegistration.module.css'
import React, {useEffect} from 'react';
import NavigationDrawer from "../../components/navigationDrawer/NavigationDrawer";
import ContentCard from "../../components/contentCard/ContentCard";
function TimeRegistration({navDrawer, toggleNavDrawer, setCurrentPage}) {

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Urenregistratie")
        toggleNavDrawer(false);
    }, []);

    return (
        <main>
            <NavigationDrawer
                navDrawer={navDrawer}
                toggleNavDrawer={toggleNavDrawer}
            />
            <section className="page-section">
                <h3 className={styles.h3}>Timer</h3>
                <ContentCard stylingClass="content-card">
                        <p className={styles.p}>Je bent momenteel niet ingeklokt</p>
                        <button className={styles.button} type="button">Inklokken</button>
                </ContentCard>
            </section>
        </main>
    );
}

export default TimeRegistration;