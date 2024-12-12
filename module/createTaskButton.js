export function createTaskButton(text) {
    const addTaskButton = document.createElement("button");
    addTaskButton.id = "addTaskButton";
    addTaskButton.textContent = text;
    return addTaskButton;
}
