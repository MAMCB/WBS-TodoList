document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const completedStats = document.createElement("div");

    let tasks = [];
    let completedCount = 0;

    function loadTasks() {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                const taskItem = createTaskItem(task.text);
                taskItem.querySelector("input[type=checkbox]").checked = task.completed;
                taskItem.querySelector("select").value = task.priority;
                taskList.appendChild(taskItem);
            });
            updateCompletionStats();
        }
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    loadTasks();

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = createTaskItem(taskText);
            tasks.push({ text: taskText, completed: false, priority: "medium" });
            taskList.appendChild(taskItem);
            updateCompletionStats();
            saveTasks();
            taskInput.value = "";
        }
    });

    function handleCheckboxChange(text, checkbox) {
        const task = tasks.find(task => task.text === text);
        task.completed = checkbox.checked;
        updateCompletionStats();
        
        saveTasks();
    }

    
    function createTaskItem(text) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        taskItem.appendChild(checkbox);

        const taskText = document.createElement("span");
        taskText.textContent = text;
        taskItem.appendChild(taskText);

        const prioritySelector = document.createElement("select");
        prioritySelector.innerHTML = `
            <option value="high">High</option>
            <option value="medium" selected>Medium</option>
            <option value="low">Low</option>
        `;
        taskItem.appendChild(prioritySelector);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            taskList.removeChild(taskItem);
            tasks = tasks.filter(task => task.text !== text);
            updateCompletionStats();
           
            saveTasks();
        });
        taskItem.appendChild(removeBtn);

        checkbox.addEventListener("change", () => {
            handleCheckboxChange(text, checkbox);
        });

        return taskItem;
    }

    
    function updateCompletionStats() {
        completedCount = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        const completionRate = (completedCount / totalTasks) * 100;

        completedStats.innerHTML = `
            <p>Total Completed: ${completedCount}</p>
            <p>Completion Rate: ${completionRate.toFixed(2)}%</p>
        `;
    }

    document.body.appendChild(completedStats);
    
});
