function calculateMinutes(time) {
    if (time < 3600) {
        return Math.floor(time / 60);
    } else {
        const hours = Math.floor(time / 3600);
        return Math.floor(time / 60) - hours * 60;
    }
}

export default calculateMinutes;