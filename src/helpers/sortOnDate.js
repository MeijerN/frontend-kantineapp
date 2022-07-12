function sortOnDate(tasks) {
    tasks.sort((a, b) => {
        let da = new Date(a.createdOn);
        let db = new Date(b.createdOn);
        return da - db;
    });
}

export default sortOnDate;