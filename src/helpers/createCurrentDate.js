function createCurrentDate() {
    // Nederlandse versie kort
    const shortOptions = {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
    };
    return new Date().toLocaleDateString('nl-NL', shortOptions);
}

export default createCurrentDate;