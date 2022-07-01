import styles from './SelectElement.module.css'
import React from 'react';
import Select from "react-select";
import {Controller, useForm} from "react-hook-form";

function SelectElement({stylingClass, name, options, placeholder, isMulti, controller, errorMessage}) {

    // Remove blue border on active state
    const style = {control: provided => ({
        ...provided,
        boxShadow: 'none',
        border: "solid black 1px",
        borderRadius: "8px",
    })};

    return (
        <Controller
            control={controller}
            defaultValue=""
            name={name}
            rules={{required: {value: true, message: errorMessage}}}
            render={({ field: { onChange, value, ref }}) => (
                <Select
                    inputRef={ref}
                    value={options.filter(c => value.includes(c.value))}
                    onChange={isMulti ? val => onChange(val.map(c => c.value)) : val => onChange(val.value)}
                    options={options}
                    isMulti={isMulti}
                    styles={style}
                    placeholder={placeholder}
                    className={styles[(stylingClass)]}
                    isSearchable={false}
                />
            )}
        />
    );
}

export default SelectElement;