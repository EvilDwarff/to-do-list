import { createDiv } from './module/createDiv.js';
import { createInput } from './module/createInput.js';
import { createTaskList } from './module/createTaskList.js';
import { createTitle } from './module/createTitle.js';
import { createTaskButton } from './module/createTaskButton.js';
import { createConfirmModal } from './module/createConfirmModal.js';


const API_URL = "http://localhost:3000/";


async function getData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching tasks: ${error.message}`);
        return [];
    }
}


async function saveTaskToDB(task) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error(`Failed to save task. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error saving task: ${error.message}`);
    }
}


async function updateTask(task) {
    try {
        const response = await fetch(`${API_URL}/${task.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ complited: task.complited }),
        });
        if (!response.ok) {
            throw new Error(`Failed to update task. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error updating task: ${error.message}`);
    }
}

async function deleteTaskFromDB(taskId) {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error(`Failed to delete task. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting task: ${error.message}`);
    }
}


async function createApp() {
    const div = createDiv();
    document.body.appendChild(div);

    const title = createTitle("To Do List");
    div.appendChild(title);

    const input = createInput("Добавьте задачу");
    div.appendChild(input);

    const button = createTaskButton("Добавить");
    div.appendChild(button);

    const list = createTaskList();
    div.appendChild(list);

    let arr = await getData();


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

      
        deleteButton.addEventListener("click", async () => {
            createConfirmModal("Вы уверены, что хотите удалить эту задачу?", async () => {
                await deleteTaskFromDB(task.id); 
                list.removeChild(taskItem);
                arr = arr.filter(item => item.id !== task.id);
            });
        });

   
        taskContent.addEventListener("click", async () => {
            taskItem.classList.toggle("completed");
            const isCompleted = taskItem.classList.contains("completed") ? "1" : "0";
            task.complited = isCompleted;
            await updateTask(task); 
        });

        list.appendChild(taskItem);
    }


    async function addTask() {
        const taskText = input.value.trim();
        if (!taskText) return;

        const newTask = { task: taskText, complited: "0" };
        const savedTask = await saveTaskToDB(newTask); 
        arr.push(savedTask);

        renderTask(savedTask);
        input.value = "";
    }

    
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    button.addEventListener("click", addTask);


    arr.forEach(task => renderTask(task));
}

createApp();

