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
    li.innerHTML = `<span>${text}</span> <div class="task-buttons"></div>`;

    let buttonsDiv = li.querySelector(".task-buttons");

    if (state === "todo") {
        let btnMoveToInProgress = document.createElement("button");
        btnMoveToInProgress.innerText = "In Progress";
        btnMoveToInProgress.onclick = function () {
            moveToState(li, "inProgressList");
        };
        buttonsDiv.appendChild(btnMoveToInProgress);
    } else if (state === "inProgress") {
        let btnMoveToDone = document.createElement("button");
        btnMoveToDone.innerText = "Done";
        btnMoveToDone.onclick = function () {
            moveToState(li, "doneList");
        };
        buttonsDiv.appendChild(btnMoveToDone);
    }

    return li;
}

function moveToState(taskItem, newStateId) {
    let newTaskItem = createTaskItem(taskItem.querySelector("span").innerText, newStateId);
    document.getElementById(newStateId).appendChild(newTaskItem);
    taskItem.remove();
}
