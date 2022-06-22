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
import taskDoneIcon from "../../assets/task_done_icon.svg";
import editIcon from "../../assets/edit_task_icon.svg";
import deleteTaskIcon from "../../assets/delete_task_icon.svg";

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

    // Remove blue border in <Select/> element when in focus
    const customStyle = {
        control: provided => ({
            ...provided,
            boxShadow: 'none',
            border: "solid black 1px",
            borderRadius: "8px",
        })
    }

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Taak toevoegen");
        toggleNavDrawer(false);
    }, [])


    function handleOnSubmit() {
        console.log("Form submit aangesproken");
    }

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <ContentCard stylingClass="task-details">
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
                        <textarea className={styles["textarea-add-task"]} name="" id=""/>
                    </label>
                    <Select className={styles.select} id="select-priority" name="select-priority" styles={customStyle} options={priorities}
                            placeholder="Selecteer prioriteit"/>
                    <Select
                        className={styles["select-specialities"]}
                        styles={customStyle}
                        options={volunteers}
                        placeholder="Selecteer vrijwilligers"
                        // value={selectedOptions}
                        // onChange={handleSelect}
                        isMulti
                        isSearchable={false}
                    />
                    <div className={styles["icon-container"]}>
                        Hier komen icoontjes
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