function sortOnTitle(tasks) {
    tasks.sort((a, b) => {
        const ta = a.title.toLowerCase();
        const tb = b.title.toLowerCase();
        if (ta < tb) {
            return -1;
        }
        if (ta > tb) {
            return 1;
        }
        return 0;
    });
}

export default sortOnTitle;