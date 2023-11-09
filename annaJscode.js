const toDoUl = document.querySelector(".toDoList");
const addTaskbutton = document.querySelector(".addTask");

let tasks = [];
let numberList = 0;

const savetoLocalStorage = () => {
  const stringTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", stringTasks);
};

const loadfromlocalStorage = () => {
  const parsedTasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = parsedTasks ? parsedTasks : [];

  renderTasks();
};

function textValue() {
  const textTask = document.getElementById("type").value;
  return textTask;
}

function deleteInput() {
  const textTask = document.getElementById("type");
  textTask.value = "";
}

function deleteTask(event, index) {
  const button = event.target;

  const li = button.parentElement;
  toDoUl.removeChild(li);
  deleteTaskfromArray(index);
  savetoLocalStorage();
  numberList--;
  console.log(numberList, index);
}

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

function addTaskToArray(valueText, checked) {  // add status checked to array, but not set false
  tasks.push({ name: valueText, checked: checked });
  console.log("Add task to Array with value: ", tasks);
}

function deleteTaskfromArray(index) {
  tasks.splice(index, 1);
  console.log(tasks);
  renderTasks();
  savetoLocalStorage();
}

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

addTaskbutton.addEventListener("click", function (event) {
  addnewTask(event);
});

loadfromlocalStorage();

console.log(tasks);
