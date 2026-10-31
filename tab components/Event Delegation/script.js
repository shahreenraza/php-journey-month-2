const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

function addTask() {

    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

  
    taskInput.value = "";
}


addButton.addEventListener("click", addTask);


taskList.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.remove();
        return;
    }

    if (event.target.tagName === "SPAN") {
        event.target.parentElement.classList.toggle("completed");
    }
});
