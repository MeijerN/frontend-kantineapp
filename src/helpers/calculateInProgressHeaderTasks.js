function calculateInProgressHeaderTasks(tasks) {
    const inProgressTasksArray = [];
    tasks.map((task) => {
        if (task.status === "In behandeling") {
            inProgressTasksArray.push(task);
        }
    });
    return inProgressTasksArray.length;
}

export default calculateInProgressHeaderTasks;