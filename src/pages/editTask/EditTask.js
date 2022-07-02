import styles from './EditTask.module.css'
import React, {useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import Select from 'react-select';
import {useHistory, useParams} from "react-router-dom";
import InputField from "../../components/inputField/InputField";
import saveIcon from '../../assets/save_task_icon.svg';
import backIcon from '../../assets/back_icon.svg';
import Icon from "../../components/icon/Icon";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import SelectElement from "../../components/selectElement/SelectElement";
import {useForm} from "react-hook-form";

function EditTask({navDrawer, toggleNavDrawer, setCurrentPage}) {

    const history = useHistory();
    const {id} = useParams();
    const {register, reset, formState: {errors}, watch, control, handleSubmit} = useForm();


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
        setCurrentPage("Taak bewerken");
        toggleNavDrawer(false);

        // TODO:
        // VRIJWILLIGERS OPHALEN UIT DATABASE (HERGEBRUIK VAN ADD TASK PAGE)
        // DATA VAN DE TAAK OPHALEN EN ALS VALUE IN DE INPUTS ZETTEN
        // HERGEBRUIK DE ADD TASK PAGINA ZOVEEL MOGELIJK (KAN BIJNA HELEMAAL, ALLEEN MOET ER EEN FETCH TASK DATA TOEGEVOEGD WORDEN IN DE ONMOUNT USEEFFECT)

    }, [])


    function handleOnSubmit() {
        console.log("Form submit aangesproken");
    }

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <ContentCard stylingClass="edit-task-details">
                <form className={styles.form} onSubmit={handleOnSubmit}>
                    <label htmlFor="title" className={styles["label-textarea-add-task"]}>
                        Titel:
                        <InputField
                            stylingClass="edit-profile"
                            type="text"
                            placeholder=""
                            value={id}
                            id="title"
                        />
                    </label>
                    <label htmlFor="textarea-add-task" className={styles["label-textarea-edit-task"]}>
                        Omschrijving van de taak:
                        <textarea className={styles["textarea-edit-task"]} name="description" id="description"
                                  value="Waarde uit de database"/>
                    </label>
                    <SelectElement
                        name="priority"
                        options={[
                            {label: "Lage prioriteit", value: "laag"},
                            {label: "Gemiddelde prioriteit", value: "middel"},
                            {label: "Hoge prioriteit", value: "hoog"},
                        ]}
                        controller={control}
                        stylingClass="select"
                        isMulti={false}
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
                    {/*<SelectElement*/}
                    {/*    stylingClass={styles.select}*/}
                    {/*    id="select-priority"*/}
                    {/*    name="priority"*/}
                    {/*    options={priorities}*/}
                    {/*    placeholder="Selecteer prioriteit"*/}
                    {/*    isSearchable={false}*/}
                    {/*    isMulti={false}*/}
                    {/*/>*/}
                    {/*<SelectElement*/}
                    {/*    id="select-volunteers"*/}
                    {/*    name="volunteers"*/}
                    {/*    options={volunteers}*/}
                    {/*    placeholder="Selecteer vrijwilligers"*/}
                    {/*    isSearchable={false}*/}
                    {/*    isMulti={true}*/}
                    {/*/>*/}
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

export default EditTask;