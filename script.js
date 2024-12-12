import { createDiv } from './module/createDiv.js';
import { createInput } from './module/createInput.js';
import { createTaskList } from './module/createTaskList.js';
import { createTitle } from './module/createTitle.js';
import { createTaskButton } from './module/createTaskButton.js';
import { createConfirmModal } from './module/createConfirmModal.js';
import { addTask } from './module/addTask.js'

let arr = JSON.parse(localStorage.getItem("tasks")) || [
    { task: "Задача 1", complited: "0" },
    { task: "Задача 2", complited: "0" },
    { task: "Задача 3", complited: "1" }
];

function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(arr));
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

        arr.push({ task: taskText, complited: "0" });
        saveTasksToLocalStorage();

        renderTask({ task: taskText, complited: "0" });
        input.value = "";
    }

    function renderTask(task) {
        const taskItem = document.createElement("li");

        const taskContent = document.createElement("span");
        taskContent.textContent = task.task;
        taskItem.appendChild(taskContent);
        if (task.complited === "1") {
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
                    item.complited = taskItem.classList.contains("completed") ? "1" : "0";
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
