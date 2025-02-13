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

    li.onclick = function () {
        if (state === "todo") {
            let confirmMove = confirm("Vuoi spostare il task in 'In Progress'?");
            if (confirmMove) moveToState(li, "inProgressList", "inProgress");
        } else if (state === "inProgress") {
            let confirmMove = confirm("Vuoi spostare il task in 'Done'?");
            if (confirmMove) moveToState(li, "doneList", "done");
        }
    };

    return li;
}

function moveToState(taskItem, newStateId, newState) {
    let newTaskItem = createTaskItem(taskItem.innerText, newState);
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
    document.querySelectorAll(`#${listId} li`).forEach(li => {
        items.push(li.innerText);
    });
    return items;
}
