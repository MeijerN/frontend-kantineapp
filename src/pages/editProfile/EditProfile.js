import styles from './EditProfile.module.css'
import React, {useEffect} from 'react';
import NavigationDrawer from "../../components/navigationDrawer/NavigationDrawer";
import ContentCard from "../../components/contentCard/ContentCard";
import Select from 'react-select'
import {Redirect, useHistory} from "react-router-dom";
import InputField from "../../components/inputField/InputField";

function EditProfile({navDrawer, toggleNavDrawer, setCurrentPage}) {

    const history = useHistory();

    // const [edit, toggleEdit] = React.useState(false);
    // const [firstName, setFirstName] = React.useState("Niek");
    // const [lastName, setLastName] = React.useState("Meijer");
    // const [email, setEmail] = React.useState("meyerniek@hotmail.com");
    // const [role, setRole] = React.useState("manager");

    // Specialities array
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
            border: "solid black 2px",
            borderRadius: "8px",
        })
    }

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Profiel wijzigen");
        toggleNavDrawer(false);
    }, [])

    return (
        <main>
            <NavigationDrawer
                navDrawer={navDrawer}
                toggleNavDrawer={toggleNavDrawer}
            />
            <section className="page-section">
                <h3 className={styles.h3}>Mijn gegevens</h3>
                <ContentCard>
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
                    <p>Profielfoto: [link naar afbeelding]</p>
                    Icoontjes implementeren
                </ContentCard>
                Terug knop implementeren
            </section>
        </main>
    );
}

export default EditProfile;