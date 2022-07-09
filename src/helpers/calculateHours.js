function calculateHours(time) {
    if(time < 3600) {
        return 0;
    } else {
        return Math.floor(time / 3600)
    }
}

export default calculateHours;