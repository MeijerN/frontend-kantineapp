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
import {useForm, Controller} from 'react-hook-form';
import selectElementStyles from "../../helpers/selectElementStyles";

function AddTask({navDrawer, toggleNavDrawer, setCurrentPage}) {

    const history = useHistory();
    const {register, reset, formState: {errors}, watch, control, handleSubmit} = useForm();

    // const {
    //     control
    // } = useForm();

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


    function handleSave(data) {
        console.log("Form submit aangesproken");
        console.log(data);
    }

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <ContentCard stylingClass="add-task">
                <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
                    <label htmlFor="title" className={styles["label-textarea-add-task"]}>
                        Titel:
                        <input
                            className={styles["add-task"]}
                            type="text"
                            id="title"
                            {...register("title", {
                                required: "Vul de titel in",
                            })}
                        />
                    </label>
                    <label htmlFor="textarea-add-task" className={styles["label-textarea-add-task"]}>
                        Omschrijving van de taak:
                        <textarea
                            className={styles["textarea-add-task"]}
                            id="description"
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: "Vul de titel in"},
                                maxLength: {
                                    value: 1000,
                                    message: "Er mogen maximaal 1000 karakters gebruikt worden"
                                }
                            })}
                        />
                    </label>
                    <SelectElement
                        name="priority"
                        options={priorities}
                        controller={control}
                        stylingClass="select"
                        isMulti={true}
                        placeholder="Selecteer prioriteit"
                        errorMessage="Selecteer een prioriteit"
                    />
                    <SelectElement
                        name="volunteers"
                        options={volunteers}
                        controller={control}
                        isMulti={true}
                        placeholder="Selecteer vrijwilligers"
                        errorMessage="Selecteer minimaal een vrijwilliger"
                    />
                    <div className={styles["icon-container"]}>
                        <Icon
                            text="Opslaan"
                            image={saveIcon}
                        />
                    </div>
                    {errors["title"] && <p className={styles.error}>{errors["title"].message}</p>}
                    {errors["description"] && <p className={styles.error}>{errors["description"].message}</p>}
                    {errors["priority"] && <p className={styles.error}>{errors["priority"].message}</p>}
                    {errors["volunteers"] && <p className={styles.error}>{errors["volunteers"].message}</p>}
                </form>
            </ContentCard>
            <img onClick={() => {
                history.goBack()
            }} className={styles["back-icon"]} src={backIcon} alt="back"/>
        </InnerOuterContainer>
    );
}

export default AddTask;