import styles from './SelectElement.module.css'
import React from 'react';
import Select from "react-select";
import {Controller} from "react-hook-form";

function SelectElement({defaultValues, stylingClass, name, options, placeholder, isMulti, controller, errorMessage}) {

    // Filter given select options to the current selected values
    function filterOptions(options, values) {
        // Create array with current "label" values to compare with
        let currentValues = [];
        values.map((value) => currentValues.push(value.label));

        //Create array with filtered objects to return to as select options
        let filteredOptions = [];
        options.map((option) => {
            if (!currentValues.includes(option.label)) {
                filteredOptions.push(option);
            }
        })
        return filteredOptions;
    }

    // Remove blue border on active state
    const style = {
        control: provided => ({
            ...provided,
            boxShadow: 'none',
            border: "solid black 1px",
            borderRadius: "8px",
        })
    };

    return (
        <>
            {defaultValues &&
                <Controller
                    control={controller}
                    defaultValue={defaultValues}
                    name={name}
                    rules={{required: {value: true, message: errorMessage}}}
                    render={({field: {onChange, value, ref}}) => (
                        <Select
                            value={value}
                            inputRef={ref}
                            onChange={isMulti ? (val) => onChange(val) : val => onChange(val)}
                            options={isMulti ? filterOptions(options, value) : options}
                            isMulti={isMulti}
                            styles={style}
                            placeholder={placeholder}
                            className={styles[(stylingClass)]}
                            isSearchable={false}
                            maxMenuHeight={80}
                        />
                    )}
                />
            }
            {!defaultValues &&
                <Controller
                    control={controller}
                    name={name}
                    rules={{required: {value: true, message: errorMessage}}}
                    render={({field: {onChange, value, ref}}) => (
                        <Select
                            inputRef={ref}
                            onChange={isMulti ? val => onChange(val.map(c => c.value)) : val => onChange(val.value)}
                            options={options}
                            isMulti={isMulti}
                            styles={style}
                            placeholder={placeholder}
                            className={styles[(stylingClass)]}
                            isSearchable={false}
                            maxMenuHeight={80}
                        />
                    )}
                />
            }
        </>
    );
}

export default SelectElement;