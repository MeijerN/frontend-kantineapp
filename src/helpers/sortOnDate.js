function sortOnDate(tasks) {
    tasks.sort((a, b) => {
        const da = new Date(a.createdOn);
        const db = new Date(b.createdOn);
        return da - db;
    });
}

export default sortOnDate;