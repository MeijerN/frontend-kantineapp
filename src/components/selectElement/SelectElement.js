import styles from './SelectElement.module.css'
import React from 'react';
import Select from "react-select";
import selectElementStyles from "../../helpers/selectElementStyles";

function SelectElement({stylingClass, id, name, options, placeholder, isSearchable, isMulti}) {

    return (
        <Select
            className={stylingClass}
            id={id}
            name={name}
            styles={selectElementStyles()}
            options={options}
            placeholder={placeholder}
            isSearchable={isSearchable}
            isMulti={isMulti}
        />
    );
}

export default SelectElement;