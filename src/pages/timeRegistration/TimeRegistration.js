import styles from './TimeRegistration.module.css'
import React, {useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";


function TimeRegistration({navDrawer, toggleNavDrawer, setCurrentPage}) {

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Urenregistratie")
        toggleNavDrawer(false);
    }, []);

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <h3 className={styles.h3}>Timer</h3>
            <ContentCard stylingClass="standard">
                <p className={styles.p}>Je bent momenteel niet ingeklokt</p>
                <button className={styles.button} type="button">Inklokken</button>
            </ContentCard>
        </InnerOuterContainer>
    );
}

export default TimeRegistration;