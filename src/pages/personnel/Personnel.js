import styles from './Personnel.module.css'
import React, {useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import Select from "react-select";
import SelectElement from "../../components/selectElement/SelectElement";
import Icon from "../../components/icon/Icon";
import saveIcon from "../../assets/save_task_icon.svg";


function Personnel({navDrawer, toggleNavDrawer, setCurrentPage}) {

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Personeel")
        toggleNavDrawer(false);
    }, []);

    // Select volunteers dropdown values
    // MOET UIT DE DATABASE GAAN KOMEN!!
    const volunteers = [
        {label: "Niek Meijer", value: "Niek Meijer"},
        {label: "Gert van Pijkereren", value: "Gert van Pijkereren"},
        {label: "Piet Dijkstra", value: "Piet Dijkstra"},
        {label: "Els van Lunteren", value: "Els van Lunteren"},
        {label: "Tom Bartels", value: "Tom Bartels"},

    ]

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <h3 className={styles.h3}>Manager(s) toevoegen</h3>
            <ContentCard stylingClass="personnel">
                <form className={styles.form} onSubmit="">
                    <SelectElement
                        id="select-priority"
                        name="priority"
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
            <h3 className={styles.h3}>Vrijwilliger(s) verwijderen</h3>
            <ContentCard stylingClass="personnel">
                <form className={styles.form} onSubmit="">
                    <SelectElement
                        id="select-priority"
                        name="priority"
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
        </InnerOuterContainer>
    );
}

export default Personnel;