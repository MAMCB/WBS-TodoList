const typeListener = document.getElementById("type");

const toDoUl = document.querySelector(".toDoList");

const addTaskbutton = document.querySelector(".addTask");

const tasks = [];

// count number of li
let numberList = 0;

function textValue() {
  const textTask = document.getElementById("type").value;
  return textTask;
}

function deleteInput() {
  const textTask = document.getElementById("type");
  textTask.value = "";
}

function deleteTask(event) {
  const button = event.target;
  if (button.textContent === "Delete") {
    const li = button.parentElement;
    toDoUl.removeChild(li);
    deleteTaskfromArray(numberList);
    numberList--;
    console.log(numberList);
  }
}

function addTaskToArray(valueText) {
  tasks.push(valueText);
  console.log("Add task to Array with value: ", valueText);
}

function deleteTaskfromArray(numberList) {
  tasks.splice(numberList, 1);
  console.log("Delete a task from Array on index: ", numberList);
}

function addnewTask(event) {
  event.preventDefault();
  const title = textValue();
  if (title) {
    addTaskToArray(title);
    numberList++;
    renderTasks();
  } else {
    alert("you didn't write a task!");
  }
  deleteInput();
}

function createNewToDo(valueText) {
  if (valueText !== "") {
    const li = toDoUl.appendChild(document.createElement("li"));
    const input = li.appendChild(document.createElement("input"));
    const label = li.appendChild(document.createElement("label"));
    const deleteButton = li.appendChild(document.createElement("button"));

    input.type = "checkbox";
    input.id = "toDo" + numberList;
    input.name = "toDo" + numberList;

    label.htmlFor = input.id;
    label.textContent = valueText;
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";
    deleteButton.className = "toDo" + numberList;

    deleteButton.addEventListener("click", deleteTask);

    return { li, input, label, deleteButton };
  }
}

function renderTasks() {
  toDoUl.textContent = "";
  tasks.forEach((task) => {
    console.log("Task??", task);
    const newCheckTask = createNewToDo(task);
    toDoUl.appendChild(newCheckTask.li);
  });
}

addTaskbutton.addEventListener("click", function (event) {
  addnewTask(event);
  // deleteInput();
  console.log(numberList);
});
renderTasks();
