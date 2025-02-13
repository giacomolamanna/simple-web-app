document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Inserisci un task valido!");
        return;
    }

    let taskItem = createTaskItem(taskText, "todo");
    document.getElementById("todoList").appendChild(taskItem);
    saveTasks();
    taskInput.value = "";
}

function createTaskItem(text, state) {
    let li = document.createElement("li");
    li.innerHTML = `<span>${text}</span>`;
    li.dataset.state = state;

    let buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("task-buttons");

    // Bottone per avanzare alla lista successiva
    let forwardBtn = document.createElement("button");
    forwardBtn.innerText = "➡️";
    forwardBtn.onclick = function () {
        if (state === "todo") {
            confirmMove(li, "Vuoi spostare il task in 'In Progress'?", "inProgressList", "inProgress");
        } else if (state === "inProgress") {
            confirmMove(li, "Vuoi spostare il task in 'Done'?", "doneList", "done");
        }
    };
    buttonsDiv.appendChild(forwardBtn);

    // Bottone per tornare alla lista precedente
    if (state !== "todo") {
        let backBtn = document.createElement("button");
        backBtn.innerText = "⬆️";
        backBtn.onclick = function () {
            if (state === "done") {
                confirmMove(li, "Vuoi riportare il task in 'In Progress'?", "inProgressList", "inProgress");
            } else if (state === "inProgress") {
                confirmMove(li, "Vuoi riportare il task in 'To Do'?", "todoList", "todo");
            }
        };
        buttonsDiv.appendChild(backBtn);
    }

    // Bottone per eliminare il task
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑";
    deleteBtn.onclick = function () {
        let confirmDelete = confirm("Vuoi eliminare definitivamente questo task?");
        if (confirmDelete) {
            li.remove();
            saveTasks();
        }
    };
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(buttonsDiv);
    return li;
}

function confirmMove(taskItem, message, newStateId, newState) {
    let confirmMove = confirm(message);
    if (confirmMove) moveToState(taskItem, newStateId, newState);
}

function moveToState(taskItem, newStateId, newState) {
    let newTaskItem = createTaskItem(taskItem.querySelector("span").innerText, newState);
    document.getElementById(newStateId).appendChild(newTaskItem);
    taskItem.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = {
        todo: getListItems("todoList"),
        inProgress: getListItems("inProgressList"),
        done: getListItems("doneList")
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.todo.forEach(task => {
            document.getElementById("todoList").appendChild(createTaskItem(task, "todo"));
        });
        tasks.inProgress.forEach(task => {
            document.getElementById("inProgressList").appendChild(createTaskItem(task, "inProgress"));
        });
        tasks.done.forEach(task => {
            document.getElementById("doneList").appendChild(createTaskItem(task, "done"));
        });
    }
}

function getListItems(listId) {
    let items = [];
    document.querySelectorAll(`#${listId} li span`).forEach(span => {
        items.push(span.innerText);
    });
    return items;
}
