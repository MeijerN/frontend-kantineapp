function sortOncompletedDate(tasks) {
    tasks.sort((a, b) => {
        const da = new Date(a.completedOn);
        const db = new Date(b.completedOn);
        return da - db;
    });
}

export default sortOncompletedDate;