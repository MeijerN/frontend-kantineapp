import styles from './TaskDetails.module.css'
import React, {useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import editIcon from '../../assets/edit_task_icon.svg'
import {useHistory, useParams} from "react-router-dom";
import backIcon from "../../assets/back_icon.svg";
import Icon from "../../components/icon/Icon";
import taskDoneIcon from '../../assets/task_done_icon.svg'
import deleteTaskIcon from '../../assets/delete_task_icon.svg'
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";

function TaskDetails({navDrawer, toggleNavDrawer, setCurrentPage}) {

    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Taak details");
        toggleNavDrawer(false);

        // DETAILS VAN DE TAAK OPHALEN

    }, [])

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <ContentCard stylingClass="task-details">
                <p className={styles["status"]}><span className={styles["dot-low"]}/> In afwachting</p>
                <h3>Lamp vervangen</h3>
                <label htmlFor="textarea-task-details" className={styles["label-textarea-task-details"]}>
                    Beschrijving:
                    <p className={styles["textarea-task-details"]}>
                        De lamp in kleedkamer 4 moet vervangen worden. Het is een gloeilwamp van 4W met een fitting van
                        G10.
                    </p>
                </label>

                <p className={styles.p}>Prioriteit: <span>Hoog</span></p>
                <label htmlFor="task-owners-table" className={styles["label-task-owners-table"]}>
                    Aangewezen vrijwilligers:
                    <p className={styles["assigned-users"]}>
                        <span>Er zijn geen andere vrijwilligers aangewezen</span>
                    </p>
                </label>

                <div className={styles["icon-container"]}>
                    {/*USER ICON*/}
                    {/*<Icon*/}
                    {/*    text="In behandeling nemen"*/}
                    {/*    image={acceptTaskIcon}*/}
                    {/*    alt="accept"*/}
                    {/*/>*/}

                    {/*MANAGER ICONS*/}
                    <Icon
                        text="Voltooien"
                        image={taskDoneIcon}
                        alt="complete"
                    />
                    <Icon
                        text="Bewerken"
                        image={editIcon}
                        alt="edit"
                    />
                    <Icon
                        text="Verwijderen"
                        image={deleteTaskIcon}
                        alt="delete"
                    />
                </div>
            </ContentCard>
            <img onClick={() => {
                history.goBack()
            }} className={styles["back-icon"]} src={backIcon} alt="back"/>
        </InnerOuterContainer>
    );
}

export default TaskDetails;