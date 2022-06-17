import styles from './EditProfile.module.css'
import React, {useEffect} from 'react';
import NavigationDrawer from "../../components/navigationDrawer/NavigationDrawer";
import ContentCard from "../../components/contentCard/ContentCard";
import Select from 'react-select'
import {Redirect, useHistory} from "react-router-dom";
import InputField from "../../components/inputField/InputField";
import saveIcon from '../../assets/save_icon.svg'
import backIcon from '../../assets/back_icon.svg'

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
        <main>
            <NavigationDrawer
                navDrawer={navDrawer}
                toggleNavDrawer={toggleNavDrawer}
            />
            <section className="page-section">
                <h3 className={styles.h3}>Mijn gegevens</h3>
                <ContentCard>
                    <form onSubmit={handleOnSubmit}>
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
                        <Select
                            className={styles["select-specialities"]}
                            styles={customStyle}
                            options={options}
                            placeholder="Selecteer specialisaties"
                            // value={selectedOptions}
                            // onChange={handleSelect}
                            isMulti
                            isSearchable={false}
                        />
                        <figure className={styles["save-icon-container"]}>
                            <input type="image" src={saveIcon} className={styles["save-icon"]} alt="save"/>
                            <p className={styles["save-icon-text"]}>Opslaan</p>
                        </figure>
                    </form>
                </ContentCard>
                <img onClick={() => {
                    history.goBack()
                }} className={styles["back-icon"]} src={backIcon} alt="back"/>
            </section>
        </main>
    );
}

export default EditProfile;