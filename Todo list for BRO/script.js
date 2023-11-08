const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", function () {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
        createTask(task.text, task.completed);
    });
});

function createTask(taskText, isCompleted) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="complete">Завершить</button>
            <button class="delete">Удалить</button>
        `;
    taskList.appendChild(li);

    if (isCompleted) {
        li.classList.add("completed");
    }

    const completeButton = li.querySelector(".complete");
    completeButton.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
    });

    const deleteButton = li.querySelector(".delete");
    deleteButton.addEventListener("click", function () {
        taskList.removeChild(li);
        saveTasks();
    });
}

// addTaskButton.addEventListener("click", function () {
//     const taskText = taskInput.value.trim();
//     if (taskText !== "") {
//         createTask(taskText, false);
//         saveTasks();
//     }
// });

addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTask(taskText, false);
        saveTasks();
        taskInput.value = ""; // Очищаем поле ввода после добавления задачи
    }
});



function saveTasks() {
    const tasks = [];
    const taskElements = taskList.querySelectorAll("li");

    taskElements.forEach((taskElement) => {
        tasks.push({
            text: taskElement.querySelector("span").textContent,
            completed: taskElement.classList.contains("completed"),
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
