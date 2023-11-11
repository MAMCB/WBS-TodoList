const taskList = document.getElementById("taskList");
const taskValue= document.getElementById("new_task");
let maximumNestedSubtasks = 4;

class Task{
    constructor(name,parent,parentIndex)
    {   
        this.name = name;
        this.parent = parent;
        this.parentIndex = parentIndex;
        this.taskID = this.displaySelf();
        this.checked = false;
        this.subTasks = [];

    }

    displaySelf()
    {
        if(this.parent===null)
        {
            return taskList.id;
        }
        const newElements=[];
    //creates div parent element and add its classes
    const newItemDiv = document.createElement("div")
    newItemDiv.classList.add("form-check","task");

    //creates check input element,adds its classes and pushes it to newElements array
    const newCheckInput = document.createElement("input");
    newCheckInput.classList.add("form-check-input");
    newCheckInput.type="checkbox";
    newCheckInput.addEventListener("click",updateParents);
    newElements.push(newCheckInput);
    
    //create label element,adds its classes and values and pushes it to newElements array
    const newItemLabel = document.createElement("label");
    newItemLabel.classList.add("form-check-label");
    newItemLabel.innerText=this.name;
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
    if(checkNestIndex(this.parent)<maximumNestedSubtasks)
    {
        const dropDownButton = document.createElement("button");
        dropDownButton.classList.add("btn");
        dropDownButton.classList.add("btn-secondary");
        dropDownButton.innerText="Sub-tasks"
        dropDownButton.addEventListener("click",addSubtask);
        newElements.push(dropDownButton);

    }
   


    
   for(let i = 0; i<newElements.length;i++)
   {
        newItemDiv.appendChild(newElements[i]);
   }
   const itemID = generateUniqueId();
   newItemDiv.id=`task_${itemID}`;
   if(this.parent.taskID===taskList.id)
   {    const listItem = document.createElement("li");
        taskList.appendChild(listItem);
        listItem.appendChild(newItemDiv);
   }
   else
   {
    const parentElement = document.getElementById(this.parent.taskID);
    parentElement.appendChild(newItemDiv);
   }
   taskValue.value="";
   return newItemDiv.id;
    }
}

function checkNestIndex(parent)
{
    let nestIndex =0
    while(parent!=null)
    {
        nestIndex++;
        parent=parent.parent;
    }
    return nestIndex;
}
function generateUniqueId() {
  
  return Date.now().toString();
}

function updateParents()
{

}

function editTask()
{

}

function removeTask()
{

}

function addSubtask()
{

}
let rootParentTask;

function renderList()
{
    if(!localStorage.getItem("taskList"))
    {

        rootParentTask = new Task ("Root UL",null,null);
       
    }
    else
    {   
        createTaskList(rootParentTask);
    }
    
}
function clearList(){
localStorage.clear();
}

function addTask(){
    const newTask = new Task(taskValue.value,rootParentTask,rootParentTask.subTasks.length);
    rootParentTask.subTasks.push(newTask);
}



renderList();