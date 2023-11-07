const typeLisener = document.getElementById("type");

const toDoUl = document.querySelector(".toDoList");

const addTaskbutton = document.querySelector(".addTask");


// count number of li 
let numberList = 0;

function textValue () {
  const textTask = document.getElementById("type").value;
  return textTask;
}

function deleteInput () {
  const textTask = document.getElementById("type");
  textTask.value = "";
}

function deleteTask (event) {
  const button = event.target;
  if (button.textContent === "Delete") {
    const li = button.parentElement;
    toDoUl.removeChild(li)
    numberList--;
    console.log(numberList)
  }
}


function createNewToDo (valueText) {
  const li = toDoUl.appendChild(document.createElement("li"))
  const input = li.appendChild(document.createElement("input"))
  const label = li.appendChild(document.createElement("label"))
  const deleteButton = li.appendChild(document.createElement("button"))

  input.type = "checkbox";
  input.id = "toDo" + numberList
  input.name = "toDo" + numberList

  label.for = "toDo" + numberList
  label.textContent = valueText
  deleteButton.textContent = "Delete"
  deleteButton.type = "button"
  deleteButton.className = "toDo" + numberList

  deleteButton.addEventListener("click", deleteTask)

  numberList++;

  return {li, input, label, deleteButton}
  
}


addTaskbutton.addEventListener("click", function () {
  createNewToDo(textValue());
  deleteInput();
  console.log(numberList)
});
