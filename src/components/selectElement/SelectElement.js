import styles from './SelectElement.module.css'
import React from 'react';
import Select from "react-select";

function SelectElement({stylingClass, id, name, options, placeholder, isSearchable, isMulti}) {

    // Remove blue border in <Select/> element when in focus
    const customStyle = {
        control: provided => ({
            ...provided,
            boxShadow: 'none',
            border: "solid black 1px",
            borderRadius: "8px",
        })
    }

    return (
        <Select
            className={stylingClass}
            id={id}
            name={name}
            styles={customStyle}
            options={options}
            placeholder={placeholder}
            isSearchable={isSearchable}
            isMulti={isMulti}
        />
    );
}

export default SelectElement;