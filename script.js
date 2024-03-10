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
            addTask(task.text, task.time, task.number); // Pass task number as well
        });
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach((li, index) => { // Change to use index for task number
            const taskText = li.querySelector(".task-text").textContent;
            const taskTime = li.querySelector(".task-time").textContent;
            tasks.push({ text: taskText, time: taskTime, number: index + 1 }); // Include task number
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTask(taskText, taskTime, taskNumber) {
        const timestamp = new Date();
        const hours = timestamp.getHours().toString().padStart(2, '0');
        const minutes = timestamp.getMinutes().toString().padStart(2, '0');
        const seconds = timestamp.getSeconds().toString().padStart(2, '0');
        const timeText = `${hours}:${minutes}:${seconds}`;

        const existingTasks = Array.from(taskList.children).map(li => li.querySelector('.task-text').textContent.toLowerCase());
        if (existingTasks.includes(taskText.toLowerCase())) {
            alert("Task already exists!");
            return;
        }

        const li = document.createElement("li");
        li.innerHTML = `<span class="task-number">${taskNumber}</span>. <span class="task-text">${taskText}</span> - <span class="task-time">${taskTime || timeText}</span> 
      <button class="edit-btn">Edit</button><button class="delete-btn">Delete</button>`;

        const deleteBtn = li.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function() {
            li.remove();
            saveTasks();
        });

        const editBtn = li.querySelector(".edit-btn");
        editBtn.addEventListener("click", function() {
            const newText = prompt("Enter new task text:");
            if (newText !== null && newText.trim() !== "") {
                li.querySelector(".task-text").textContent = newText;
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
            const taskNumber = taskList.children.length + 1; // Get the next task number
            addTask(taskText, taskTimeValue, taskNumber); // Pass both text and time to addTask function
            taskInput.value = "";
            taskTime.value = "";
        } else {
            alert("Please enter a task!");
        }
    });
});

function myFunc(){
    alert(`To Do List By Tejas😎`);
}
