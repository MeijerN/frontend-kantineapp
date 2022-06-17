import styles from './TaskDetails.module.css'
import React, {useEffect} from 'react';
import NavigationDrawer from "../../components/navigationDrawer/NavigationDrawer";
import ContentCard from "../../components/contentCard/ContentCard";
import profilePicture from '../../assets/profile_picture.jpeg'
import editIcon from '../../assets/edit_icon.svg'
import Select from 'react-select'
import {Redirect, useHistory, useParams} from "react-router-dom";

function TaskDetails({navDrawer, toggleNavDrawer, setCurrentPage}) {

    const history = useHistory();
    const {id} = useParams();
    const [uploadCard, toggleUploadCard] = React.useState(false);

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Taak details");
        toggleNavDrawer(false);
    }, [])

    return (
        <main>
            <NavigationDrawer
                navDrawer={navDrawer}
                toggleNavDrawer={toggleNavDrawer}
            />
            <section className="page-section">
                <h3 className={styles.h3}>Details</h3>
                <ContentCard>
                    Content
                    Parameter: {id}
                </ContentCard>
            </section>
        </main>
    );
}

export default TaskDetails;