document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const tasksList = document.getElementById("tasks");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => addTaskToDOM(task, index));

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("task-title").value;
        const date = document.getElementById("task-date").value;
        const description = document.getElementById("task-description").value;

        const task = { title, date, description };
        tasks.push(task);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        addTaskToDOM(task, tasks.length - 1);

        taskForm.reset();
    });

    function addTaskToDOM(task, index) {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${task.title}</strong> <br>
            <em>${task.date}</em> <br>
            ${task.description} <br>
        `;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Deletar";
        deleteButton.style.marginTop = "10px";
        deleteButton.style.padding = "5px 10px";
        deleteButton.style.border = "none";
        deleteButton.style.backgroundColor = "#D97941";
        deleteButton.style.color = "white";
        deleteButton.style.cursor = "pointer";
        deleteButton.addEventListener("click", () => deleteTask(index));

        li.appendChild(deleteButton);
        tasksList.appendChild(li);
    }


    function deleteTask(index) {

        tasks.splice(index, 1);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        renderTasks();
    }

    function renderTasks() {
        tasksList.innerHTML = ""; 
        tasks.forEach((task, index) => addTaskToDOM(task, index));
    }
});
