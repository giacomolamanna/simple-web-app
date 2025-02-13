function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Inserisci un task valido!");
        return;
    }

    let taskItem = createTaskItem(taskText, "todo");
    document.getElementById("todoList").appendChild(taskItem);
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
}
