import styles from './AddTask.module.css'
import React, {useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import Select from 'react-select';
import {useHistory} from "react-router-dom";
import InputField from "../../components/inputField/InputField";
import saveIcon from '../../assets/save_task_icon.svg';
import backIcon from '../../assets/back_icon.svg';
import Icon from "../../components/icon/Icon";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import SelectElement from "../../components/selectElement/SelectElement";

function AddTask({navDrawer, toggleNavDrawer, setCurrentPage}) {

    const history = useHistory();

    // Select priorities dropdown values
    // MOET UIT DE DATABASE GAAN KOMEN!!
    const priorities = [
        {label: "Lage prioriteit", value: "Laag"},
        {label: "Gemiddelde prioriteit", value: "Middel"},
        {label: "Hoge prioriteit", value: "Hoog"},
    ];

    // Select volunteers dropdown values
    // MOET UIT DE DATABASE GAAN KOMEN!!
    const volunteers = [
        {label: "Niek Meijer", value: "Niek Meijer"},
        {label: "Gert van Pijkereren", value: "Gert van Pijkereren"},
        {label: "Piet Dijkstra", value: "Piet Dijkstra"},
        {label: "Els van Lunteren", value: "Els van Lunteren"},
        {label: "Tom Bartels", value: "Tom Bartels"},

    ]

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Taak toevoegen");
        toggleNavDrawer(false);

        // VRIJWILLIGERS EN PRIORITEITEN OPHALEN UIT DATABASE

    }, [])


    function handleOnSubmit() {
        console.log("Form submit aangesproken");
    }

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <ContentCard stylingClass="add-task">
                <form className={styles.form} onSubmit={handleOnSubmit}>
                    <label htmlFor="title" className={styles["label-textarea-add-task"]}>
                        Titel:
                        <InputField
                            stylingClass="edit-profile"
                            type="text"
                            placeholder=""
                            value=""
                            id="title"
                        />
                    </label>
                    <label htmlFor="textarea-add-task" className={styles["label-textarea-add-task"]}>
                        Omschrijving van de taak:
                        <textarea className={styles["textarea-add-task"]} name="description" id="description"/>
                    </label>
                    <SelectElement
                        stylingClass={styles.select}
                        id="select-priority"
                        name="priority"
                        options={priorities}
                        placeholder="Selecteer prioriteit"
                        isSearchable={false}
                        isMulti={false}
                    />
                    <SelectElement
                        id="select-volunteers"
                        name="volunteers"
                        options={volunteers}
                        placeholder="Selecteer vrijwilligers"
                        isSearchable={false}
                        isMulti={true}
                    />
                    <div className={styles["icon-container"]}>
                        <Icon
                            text="Opslaan"
                            image={saveIcon}
                        />
                    </div>
                </form>
            </ContentCard>
            <img onClick={() => {
                history.goBack()
            }} className={styles["back-icon"]} src={backIcon} alt="back"/>
        </InnerOuterContainer>

    );
}


export default AddTask;