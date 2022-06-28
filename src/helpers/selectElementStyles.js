function selectElementStyles() {

    // // Remove blue border in <Select/> element when in focus
    return {
        control: provided => ({
            ...provided,
            boxShadow: 'none',
            border: "solid black 1px",
            borderRadius: "8px",
        })
    };
}

export default selectElementStyles;