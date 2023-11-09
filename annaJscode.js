const toDoUl = document.querySelector(".toDoList");
const addTaskbutton = document.querySelector(".addTask");

// Initializing variables to store tasks and list numbers
let tasks = [];
let numberList = 0;

// Function to save tasks to local storage
const savetoLocalStorage = () => {
  const stringTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", stringTasks);
};

// Function to load tasks from local storage
const loadfromlocalStorage = () => {
  const parsedTasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = parsedTasks ? parsedTasks : [];

  // Rendering tasks on the page
  renderTasks();
};

// Function to get the value of the input field
function textValue() {
  const textTask = document.getElementById("type").value;
  return textTask;
}

// Function to clear the input field
function deleteInput() {
  const textTask = document.getElementById("type");
  textTask.value = "";
}

// Function to delete a task from the DOM and the tasks array
function deleteTask(event, index) {
  const button = event.target;

  const li = button.parentElement;
  toDoUl.removeChild(li);
  deleteTaskfromArray(index);
  savetoLocalStorage();
  numberList--;
  console.log(numberList, index);
}

// Function to edit a task
function editTask(index, label) {
  const promt = window.prompt("edit your task");
  if (promt !== "" && promt !== null) {
    label.textContent = promt;
    tasks[index].name = promt;
    savetoLocalStorage();
  } else if (promt === null) {
    alert("You cancell editing");
  } else {
    alert("You write nothing");
  }
}

// Function to add a task to the tasks array
function addTaskToArray(valueText, checked) {  // add status checked to array, but not set false
  tasks.push({ name: valueText, checked: checked });
  console.log("Add task to Array with value: ", tasks);
}

// Function to delete a task from the tasks array
function deleteTaskfromArray(index) {
  tasks.splice(index, 1);
  console.log(tasks);
  renderTasks();
  savetoLocalStorage();
}

// function to add a value from Input field
function addnewTask(event) {
  event.preventDefault();
  const title = textValue();
  if (title) {
    addTaskToArray(title);
    savetoLocalStorage();
    numberList++;
    renderTasks();
  } else {
    alert("you didn't write a task!");
  }
  deleteInput();
}

// Function to handle checking/unchecking of tasks
 function checkedInput(input,index) {
  if (!input.checked) {
       tasks[index].checked = false;
       savetoLocalStorage();
     }
     else if (input.checked) {
       tasks[index].checked = true;
       savetoLocalStorage();
       console.log("its checked")
     }

 }

 // Function to create a new task element in the DOM
function createNewToDo(valueText, index, checked) {
  if (valueText !== "") {
    const li = toDoUl.appendChild(document.createElement("li"));
    const input = li.appendChild(document.createElement("input"));
    const label = li.appendChild(document.createElement("label"));
    const editButton = li.appendChild(document.createElement("button"));
    const deleteButton = li.appendChild(document.createElement("button"));

    input.type = "checkbox";
    input.id = "toDo" + index;
    input.name = input.id;
    input.checked = checked; // set the check status

    input.addEventListener("click", () => checkedInput(input, index));

    label.htmlFor = input.id;
    console.log(input.id);
    label.textContent = valueText;

    editButton.textContent = "Edit";
    editButton.type = "button";

    deleteButton.className = input.id;

    deleteButton.textContent = "Delete";
    deleteButton.type = "button";
    deleteButton.className = input.id;

    editButton.addEventListener("click", (event) => editTask(index, label));

    deleteButton.addEventListener("click", (event) => deleteTask(event, index));

    console.log(li);

    // input.addEventListener("click", checkedInput(input));

    return { li, input, label, deleteButton };
  }
}

// Function to render tasks on the page
function renderTasks() {
  toDoUl.textContent = "";

  tasks.forEach((task, index) => {
    const taskName = task.name;
    const checked = task.checked || false;  // set to false if not defined
    console.log("Task??", taskName, index, checked);
    const newCheckTask = createNewToDo(taskName, index, checked);
    toDoUl.appendChild(newCheckTask.li);
  });
}

// Adding event listener for adding a new task
addTaskbutton.addEventListener("click", function (event) {
  addnewTask(event);
});

// Loading tasks from local storage when the page loads
loadfromlocalStorage();

console.log(tasks);
