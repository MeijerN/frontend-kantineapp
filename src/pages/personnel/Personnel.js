import styles from './Personnel.module.css'
import React, {useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import Select from "react-select";


function Personnel({navDrawer, toggleNavDrawer, setCurrentPage}) {

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Personeel")
        toggleNavDrawer(false);
    }, []);

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <h3 className={styles.h3}>Manager toevoegen</h3>
            <ContentCard stylingClass="standard">
                <form onSubmit="">
                    Select en button
                </form>
            </ContentCard>
            <h3 className={styles.h3}>Vrijwilliger verwijderen</h3>
            <ContentCard stylingClass="standard">
                <form onSubmit="">
                    Select en button
                </form>
            </ContentCard>
        </InnerOuterContainer>
    );
}

export default Personnel;