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

function deleteTask(event, index) {
  console.log(event);
  console.log(index);
  const button = event.target;
  console.log(button);

  const li = button.parentElement;
  toDoUl.removeChild(li);
  deleteTaskfromArray(index);
  numberList--;
  console.log(numberList);
}

function addTaskToArray(valueText) {
  tasks.push(valueText);
  console.log("Add task to Array with value: ", valueText);
}

function deleteTaskfromArray(index) {
  tasks.splice(index, 1);
  console.log("Delete a task from Array on index: ", index);
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
  deleteInput(); // event.target.reset() - not working
}

// function checkedInput(input) {
//   if (!input) {
//     input.checked = true;
//     console.log(input.checked);
//   }
// }

function createNewToDo(valueText, index) {
  if (valueText !== "") {
    const li = toDoUl.appendChild(document.createElement("li"));
    const input = li.appendChild(document.createElement("input"));
    const label = li.appendChild(document.createElement("label"));
    const deleteButton = li.appendChild(document.createElement("button"));

    input.type = "checkbox";
    input.id = "toDo" + index;
    input.name = input.id;

    label.htmlFor = input.id;
    console.log(input.id);
    label.textContent = valueText;
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";
    deleteButton.className = input.id;

    deleteButton.addEventListener("click", (event) => deleteTask(event, index));

    console.log(li);

    // input.addEventListener("click", checkedInput(input));

    return { li, input, label, deleteButton };
  }
}

function renderTasks() {
  toDoUl.textContent = "";
  tasks.forEach((task, index) => {
    console.log("Task??", task, index);
    const newCheckTask = createNewToDo(task, index);
    toDoUl.appendChild(newCheckTask.li);
  });
}

addTaskbutton.addEventListener("click", function (event) {
  addnewTask(event);
  console.log(tasks.length);
});
renderTasks();
