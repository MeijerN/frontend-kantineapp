function specialtiesString(array) {
    return [array[0].charAt(0).toUpperCase() + array[0].slice(1), ...array.slice(1)].join(", ");
}

export default specialtiesString;