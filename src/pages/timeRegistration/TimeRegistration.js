import styles from './TimeRegistration.module.css'
import React, {useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import getLocation from "../../helpers/getLocation";


function TimeRegistration({setCurrentPage}) {

    //State management
    const [location, setLocation] = React.useState({});
    const [error, setError] = React.useState({error: false, message: ""});
    const [loading, toggleLoading] = React.useState(false);

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Urenregistratie")
    }, []);
    console.log(location);
    return (
        <InnerOuterContainer>
            <h3 className={styles.h3}>Timer</h3>
            <ContentCard stylingClass="time-registration">
                {loading ? <span>Uw locatie wordt opgehaald...</span> :
                    <p className={styles.p}>Je bent momenteel niet ingeklokt</p>}
                {error.error && <span className={styles.error}>{error.message}</span>}
                <button disabled={loading} onClick={() => {
                    getLocation(setLocation, setError, toggleLoading)
                }} className={styles.button} type="button">Inklokken
                </button>
            </ContentCard>
        </InnerOuterContainer>
    );
}

export default TimeRegistration;