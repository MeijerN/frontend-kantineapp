import styles from './EditProfile.module.css';
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

function EditProfile({navDrawer, toggleNavDrawer, setCurrentPage}) {

    const history = useHistory();

    // Specialities array
    // MOET UIT DE DATABASE GAAN KOMEN!!
    const options = [
        {value: 'sanitair', label: 'Sanitair'},
        {value: 'elektra', label: 'Elektra'},
        {value: 'schilderwerk', label: 'Schilderwerk'},
        {value: 'bouwen', label: 'Bouwen'},
        {value: 'dakwerk', label: 'Dakwerk'},
        {value: 'slopen', label: 'Slopen'},
        {value: 'tuin', label: 'Tuin'},
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
        setCurrentPage("Profiel wijzigen");
        toggleNavDrawer(false);
    }, [])

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log("Form is gesubmitted");
    }

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <h3 className={styles.h3}>Mijn gegevens</h3>
            <ContentCard stylingClass="edit-profile">
                <form className={styles.form} onSubmit={handleOnSubmit}>
                    <InputField
                        type="text"
                        placeholder="Voornaam"
                        value="Niek"
                        stylingClass="edit-profile"
                    />
                    <InputField
                        type="text"
                        placeholder="Achternaam"
                        value="Meijer"
                        stylingClass="edit-profile"
                    />
                    <InputField
                        type="email"
                        placeholder="Email"
                        value="meyerniek@hotmail.com"
                        stylingClass="edit-profile"
                    />
                    <SelectElement
                        id="select-volunteers"
                        name="volunteers"
                        options={options}
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

export default EditProfile;