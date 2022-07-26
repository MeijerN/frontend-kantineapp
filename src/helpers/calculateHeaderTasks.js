function calculateHeaderTasks(tasks, status) {
    const taskasksArray = [];
    tasks.map((task) => {
        if (task.priority.value === status) {
            taskasksArray.push(task);
        }
    });
    return taskasksArray.length;
}

export default calculateHeaderTasks;