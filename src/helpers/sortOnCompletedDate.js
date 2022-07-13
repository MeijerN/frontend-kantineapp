function sortOncompletedDate(tasks) {
    tasks.sort((a, b) => {
        let da = new Date(a.completedOn);
        let db = new Date(b.completedOn);
        return da - db;
    });
}

export default sortOncompletedDate;