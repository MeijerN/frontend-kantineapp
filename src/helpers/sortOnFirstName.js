function sortOnFirstName(volunteers) {
    volunteers.sort((a, b) => {
        // Volunteers parameter contains value object inside object
        if(a.value) {
            let ta = a.value.firstName.toLowerCase(),
                tb = b.value.firstName.toLowerCase();
            if (ta < tb) {
                return -1;
            }
            if (ta > tb) {
                return 1;
            }
            return 0;
            // Volunteers parameter is object
        } else {
            let ta = a.firstName.toLowerCase(),
                tb = b.firstName.toLowerCase();
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