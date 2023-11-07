
const taskList = document.getElementById("taskList");
const newTask = document.getElementById("new_task");


function addTask(){
    
    const newElements=[];
    const submittedValue = newTask.value;
    const newItemDiv = document.createElement("div")
    newItemDiv.classList.add("form-check");
    const newCheckInput = document.createElement("input");
    newCheckInput.classList.add("form-check-input");
    newCheckInput.type="checkbox";
    newElements.push(newCheckInput);
    
    const newItemLabel = document.createElement("label");
    newItemLabel.classList.add("form-check-label");
    newItemLabel.innerText=submittedValue;
    newElements.push(newItemLabel);
    const editButton = document.createElement("button");
    editButton.innerText="Edit";
    editButton.classList.add("btn");
    editButton.classList.add("btn-success");
    newElements.push(editButton);
    const removeButton = document.createElement("button");
    removeButton.innerText="Remove";
    removeButton.classList.add("btn");
    removeButton.classList.add("btn-danger");
    newElements.push(removeButton);
   for(let i = 0; i<newElements.length;i++)
   {
        newItemDiv.appendChild(newElements[i]);
   }
   
    
    taskList.appendChild(newItemDiv)
    newTask.value="";
}