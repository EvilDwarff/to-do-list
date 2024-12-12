export function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;

    arr.push({ task: taskText, complited: "0" });
    saveTasksToLocalStorage();

    renderTask({ task: taskText, complited: "0" });
    input.value = "";
}