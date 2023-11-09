const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("listOfToDo");

function addTask() {
    if (inputBox.value === '') {
        alert("Please enter a task");
    } else {
        let li = document.createElement("li");
        li.classList.add("toDoList");
        
        let taskText = document.createElement("span");
        taskText.textContent = inputBox.value;
        taskText.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        let textContainer = document.createElement("div");
        textContainer.classList.add("textContainer");
        textContainer.appendChild(taskText);
        li.appendChild(textContainer);

        let buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttonsContainer");

        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "\u00d7";
        deleteBtn.classList.add("deleteBtn");
        buttonsContainer.appendChild(deleteBtn);

        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("editBtn","customEditBtn"); 
        buttonsContainer.appendChild(editBtn);
        li.appendChild(buttonsContainer);

        listContainer.appendChild(li);

        editBtn.addEventListener("click", function () {
            let newText = prompt("Edit your task", taskText.textContent);
            if (newText !== null) {
                taskText.textContent = newText;
            }
            saveData();
        });

        deleteBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            li.remove();
            saveData();
        });
    }
    inputBox.value = '';
    saveData();
}
listContainer.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveData();
    } else if (event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    const tasks = Array.from(listContainer.children).map((listItem) => {
        const task = listItem.querySelector(".textContainer span").textContent;
        return { task: task };
    });
    localStorage.setItem("data", JSON.stringify(tasks));
}

function showTask() {
    const tasks = JSON.parse(localStorage.getItem("data")) || [];
    listContainer.innerHTML = "";
    tasks.forEach((task) => {
        let li = document.createElement("li");
        li.classList.add("toDoList");

        let taskText = document.createElement("span");
        taskText.textContent = task.task;

        let textContainer = document.createElement("div");
        textContainer.classList.add("textContainer");
        textContainer.appendChild(taskText);
        li.appendChild(textContainer);

        let buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttonsContainer");

        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "\u00d7";
        deleteBtn.classList.add("deleteBtn");
        buttonsContainer.appendChild(deleteBtn);

        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("editBtn", "customEditBtn");
        buttonsContainer.appendChild(editBtn);
        li.appendChild(buttonsContainer);

        listContainer.appendChild(li);

        editBtn.addEventListener("click", function () {
            let newText = prompt("Edit your task", taskText.textContent);
            if (newText !== null) {
                taskText.textContent = newText;
            }
            saveData();
        });

        deleteBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            li.remove();
            saveData();
        });
    });
}
showTask();