document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const taskTime = document.getElementById("taskTime");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage when the page loads
    loadTasks();

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTask(task.text, task.time, task.id); // Use task.id as the unique identifier
        });
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach((li) => {
            const taskText = li.querySelector(".task-text").textContent;
            const taskTime = li.querySelector(".task-time").textContent;
            const taskId = li.getAttribute("data-id");
            tasks.push({ text: taskText, time: taskTime, id: taskId }); // Store the task with a unique id
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTask(taskText, taskTime, taskId) {
        const timestamp = new Date();
        const hours = timestamp.getHours().toString().padStart(2, '0');
        const minutes = timestamp.getMinutes().toString().padStart(2, '0');
        const seconds = timestamp.getSeconds().toString().padStart(2, '0');
        const timeText = `${hours}:${minutes}:${seconds}`;

        // Ensure no duplicate tasks based on trimmed and lowercase text
        const existingTasks = Array.from(taskList.children).map(li => li.querySelector('.task-text').textContent.toLowerCase().trim());
        if (existingTasks.includes(taskText.toLowerCase().trim())) {
            alert("Task already exists!");
            return;
        }

        // Create a new task element
        const li = document.createElement("li");
        li.setAttribute("data-id", taskId); // Store the task's unique id
        li.innerHTML = `<span class="task-number">${taskId}</span>. <span class="task-text">${taskText}</span> - <span class="task-time">${taskTime || timeText}</span>
        <button class="edit-btn">Edit</button><button class="delete-btn">Delete</button>`;

        // Add event listeners for buttons
        const deleteBtn = li.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function() {
            li.remove();
            saveTasks();
        });

        const editBtn = li.querySelector(".edit-btn");
        editBtn.addEventListener("click", function() {
            const newText = prompt("Enter new task text:", taskText); // Show current task text in prompt
            if (newText !== null && newText.trim() !== "") {
                li.querySelector(".task-text").textContent = newText.trim();
                saveTasks();
            }
        });

        taskList.appendChild(li);
        saveTasks();
    }

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        let taskTimeValue = taskTime.value.trim();

        if (taskTimeValue === "") {
            const timestamp = new Date();
            const hours = timestamp.getHours().toString().padStart(2, '0');
            const minutes = timestamp.getMinutes().toString().padStart(2, '0');
            const seconds = timestamp.getSeconds().toString().padStart(2, '0');
            taskTimeValue = `${hours}:${minutes}:${seconds}`;
        }

        if (taskText !== "") {
            const taskId = Date.now(); // Unique task ID based on timestamp
            addTask(taskText, taskTimeValue, taskId); // Pass both text and time to addTask function
            taskInput.value = "";
            taskTime.value = "";
        } else {
            alert("Please enter a task!");
        }
    });
});

function myFunc() {
    alert("To Do List By Tejas😎");
}
