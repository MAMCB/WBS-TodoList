
const taskList = document.getElementById("taskList");
const newTask = document.getElementById("new_task");


function addTask(){
    
   
    const submittedValue = newTask.value;
    if(!submittedValue)
    {
        alert("Please add new task first.")
        return;
    }
    
    
    taskList.appendChild(createListElements(submittedValue))
    newTask.value="";
}

function editTask(){
     this.parentNode.children[1].innerText=prompt("Change task");
   
    
}

function removeTask(){
    taskList.removeChild(this.parentNode);
   
}

function createListElements(value)
{
    const newElements=[];
    //creates div parent element and add its classes
    const newItemDiv = document.createElement("div")
    newItemDiv.classList.add("form-check");

    //creates check input element,adds its classes and pushes it to newElements array
    const newCheckInput = document.createElement("input");
    newCheckInput.classList.add("form-check-input");
    newCheckInput.type="checkbox";
    newElements.push(newCheckInput);
    
    //create label element,adds its classes and values and pushes it to newElements array
    const newItemLabel = document.createElement("label");
    newItemLabel.classList.add("form-check-label");
    newItemLabel.innerText=value;
    newElements.push(newItemLabel);

    //creates edit and remove buttons,add its classes and pushes them to newElements array
    const editButton = document.createElement("button");
    editButton.innerText="Edit";
    editButton.classList.add("btn");
    editButton.classList.add("btn-success");
    editButton.addEventListener("click",editTask);
    newElements.push(editButton);
    const removeButton = document.createElement("button");
    removeButton.innerText="Remove";
    removeButton.classList.add("btn");
    removeButton.classList.add("btn-danger");
    removeButton.addEventListener("click",removeTask);
    newElements.push(removeButton);

    
   for(let i = 0; i<newElements.length;i++)
   {
        newItemDiv.appendChild(newElements[i]);
   }
   



    return newItemDiv;
}