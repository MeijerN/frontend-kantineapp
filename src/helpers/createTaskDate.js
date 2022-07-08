function createTaskDate(timestamp) {
    const shortOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };
    return new Date(timestamp).toLocaleString('nl-NL', shortOptions);
}

export default createTaskDate;