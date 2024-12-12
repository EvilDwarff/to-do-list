export function createInput(input) {
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.id = "taskInput";
    taskInput.placeholder = input;
    return taskInput;
}
