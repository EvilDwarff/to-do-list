let arr = JSON.parse(localStorage.getItem("tasks")) || [
    { task: "Задача 1", complited: "no" },
    { task: "Задача 2", complited: "no" },
    { task: "Задача 3", complited: "yes" }
];

function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(arr));
}

function createDiv() {
    const todoContainer = document.createElement("div");
    todoContainer.className = "todo-container";
    return todoContainer;
}

function createTitle(text) {
    const title = document.createElement("h1");
    title.textContent = text;
    return title;
}

function createInput(input) {
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.id = "taskInput";
    taskInput.placeholder = input;
    return taskInput;
}

function createTaskButton(text) {
    const addTaskButton = document.createElement("button");
    addTaskButton.id = "addTaskButton";
    addTaskButton.textContent = text;
    return addTaskButton;
}

function createTaskList() {
    const taskList = document.createElement("ul");
    taskList.id = "taskList";
    return taskList;
}

function createConfirmModal(message, onConfirm, onCancel) {
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "confirm-modal";

    const modalMessage = document.createElement("p");
    modalMessage.textContent = message;
    modal.appendChild(modalMessage);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const confirmButton = document.createElement("button");
    confirmButton.className = "confirm-button";
    confirmButton.textContent = "Да";
    confirmButton.addEventListener("click", () => {
        onConfirm();
        document.body.removeChild(modalOverlay);
    });

    const cancelButton = document.createElement("button");
    cancelButton.className = "cancel-button";
    cancelButton.textContent = "Нет";
    cancelButton.addEventListener("click", () => {
        onCancel();
        document.body.removeChild(modalOverlay);
    });

    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);
    modal.appendChild(buttonContainer);
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
}

function createApp() {
    const div = createDiv();
    document.body.appendChild(div);

    const title = createTitle("To Do List");
    div.appendChild(title);

    const input = createInput("Добавьте задачу");
    div.appendChild(input);
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    const button = createTaskButton("Добавить");
    div.appendChild(button);
    button.addEventListener("click", addTask);

    const list = createTaskList();
    div.appendChild(list);

    function addTask() {
        const taskText = input.value.trim();
        if (taskText === "") return;

        arr.push({ task: taskText, complited: "no" });
        saveTasksToLocalStorage();

        renderTask({ task: taskText, complited: "no" });
        input.value = "";
    }

    function renderTask(task) {
        const taskItem = document.createElement("li");

        const taskContent = document.createElement("span");
        taskContent.textContent = task.task;
        taskItem.appendChild(taskContent);
        if (task.complited === "yes") {
            taskItem.classList.add("completed");
        }

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Удалить";
        taskItem.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
            createConfirmModal("Вы уверены, что хотите удалить эту задачу?", () => {
                list.removeChild(taskItem);
                arr = arr.filter(item => item.task !== task.task);
                saveTasksToLocalStorage();
            }, () => {
                console.log("Удаление отменено");
            });
        });

        taskContent.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            arr = arr.map(item => {
                if (item.task === task.task) {
                    item.complited = taskItem.classList.contains("completed") ? "yes" : "no";
                }
                return item;
            });
            saveTasksToLocalStorage();
        });

        list.appendChild(taskItem);
    }

    arr.forEach(task => renderTask(task));
}

createApp();
