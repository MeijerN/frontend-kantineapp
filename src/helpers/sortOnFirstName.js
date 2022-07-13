function sortOnFirstName(volunteers) {
    volunteers.sort((a, b) => {
        let ta = a.firstName.toLowerCase(),
            tb = b.firstName.toLowerCase();

        if (ta < tb) {
            return -1;
        }
        if (ta > tb) {
            return 1;
        }
        return 0;
    });
}

export default sortOnFirstName;