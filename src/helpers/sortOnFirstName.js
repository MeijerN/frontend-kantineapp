function sortOnFirstName(volunteers) {
    volunteers.sort((a, b) => {
        // Volunteers parameter contains value object inside object
        if (a.value) {
            const ta = a.value.firstName.toLowerCase();
            const tb = b.value.firstName.toLowerCase();
            if (ta < tb) {
                return -1;
            }
            if (ta > tb) {
                return 1;
            }
            return 0;
            // Volunteers parameter is object
        } else {
            const ta = a.firstName.toLowerCase();
            const tb = b.firstName.toLowerCase();
            if (ta < tb) {
                return -1;
            }
            if (ta > tb) {
                return 1;
            }
            return 0;
        }
    });
}

export default sortOnFirstName;