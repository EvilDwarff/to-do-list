import { createDiv } from './module/createDiv.js';
import { createInput } from './module/createInput.js';
import { createTaskList } from './module/createTaskList.js';
import { createTitle } from './module/createTitle.js';
import { createTaskButton } from './module/createTaskButton.js';
import { createConfirmModal } from './module/createConfirmModal.js';




async function getData() {
    const url = "http://localhost:3000/";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const res = await response.json();
        console.log(res);
        return res;
    } catch (error) {
        console.error(error.message);
    }
}

let arr = await getData();

async function updateTask(task) {
  
    const url = "http://localhost:3000";
    try {
        const response = await fetch(`${url}/update`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ complited: task.complited, task: task.task }),
        });
        if (!response.ok) {
            throw new Error(`Failed to update task. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error updating task: ${error.message}`);
    }
}



async function saveTaskToDB(task) {
    const url = "http://localhost:3000/insert";
    try {
        const response = await fetch(`${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: task.task }),
        });
        if (!response.ok) {
            throw new Error(`Failed to save task. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error saving task: ${error.message}`);
    }
}

async function deleteTaskFromDB(task) {
    console.log(task);
    try {
        const response = await fetch("http://localhost:3000/delete", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: task }),
        });
        if (!response.ok) {
            throw new Error(`Failed to delete task. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting task: ${error.message}`);
    }
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

        console.log(taskText);
        saveTaskToDB({ task: taskText });
        
        renderTask({ task: taskText, complited: 0 });
        input.value = "";

    }

    function renderTask(task) {
        const taskItem = document.createElement("li");

        const taskContent = document.createElement("span");
        taskContent.textContent = task.task;
        taskItem.appendChild(taskContent);
        if (task.complited === 1) {
            taskItem.classList.add("completed");
        }


        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Удалить";
        taskItem.appendChild(deleteButton);


        deleteButton.addEventListener("click", () => {
            createConfirmModal("Вы уверены, что хотите удалить эту задачу?", () => {
                list.removeChild(taskItem);
                const taskT = taskContent.textContent; 
                console.log(taskItem);
                console.log(taskT);
                deleteTaskFromDB(taskT);
                arr = arr.filter(item => item.task !== task.task);
                // saveTasksToLocalStorage();
            }, () => {
                console.log("Удаление отменено");
            });
        });


        //     taskContent.addEventListener("click", () => {
        //         taskItem.classList.toggle("completed"); 
        //         arr = arr.map(item => {
        //             if (item.task === task.task) {
        //                 item.complited = taskItem.classList.contains("completed") ? "1" : "0";
        //             }
        //             return item;
        //         });
        //         // saveTasksToLocalStorage();
        //     });

        //     list.appendChild(taskItem);
        // }

        taskContent.addEventListener("click", async () => {
            taskItem.classList.toggle("completed");
            const isCompleted = taskItem.classList.contains("completed") ? 1 : 0;
            task.complited = isCompleted;
            updateTask(task);
        });

        list.appendChild(taskItem);
    }



    arr.forEach(task => renderTask(task));

}


createApp();
