const taskList = document.getElementById("taskList");
const taskValue= document.getElementById("new_task");
let maximumNestedSubtasks = 4;
let rootParentTask;

class Task{
    constructor(name,parent,parentIndex)
    {   
        this.name = name;
        this.parent = parent;
        this.parentIndex = parentIndex;
        this.taskID = displaySelf(this.name,this.parent);
        this.checked = false;
        this.subTasks = [];

    }

    
}

function addTask(){
    const newTask = new Task(taskValue.value,rootParentTask,null);
    rootParentTask.subTasks.push(newTask);
    newTask.parentIndex=rootParentTask.subTasks.indexOf(newTask);
    saveList();
}

function displaySelf(taskName,parent)
    {
        if(parent===null)
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
        newItemLabel.innerText=taskName;
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
        // if(checkNestIndex(parent)<maximumNestedSubtasks)
        // {
        //     const dropDownButton = document.createElement("button");
        //     dropDownButton.classList.add("btn");
        //     dropDownButton.classList.add("btn-secondary");
        //     dropDownButton.innerText="Sub-tasks"
        //     dropDownButton.addEventListener("click",addSubtask);
        //     newElements.push(dropDownButton);

        // }
   


    
        for(let i = 0; i<newElements.length;i++)
        {
            newItemDiv.appendChild(newElements[i]);
        }
        
            const itemID = generateUniqueId();
            newItemDiv.id=`task_${itemID}`;
        
        
        if(parent.taskID===taskList.id)
        {      
            const listItem = document.createElement("li");
            taskList.appendChild(listItem);
            listItem.appendChild(newItemDiv);
        }
        else
        {
            const parentElement = document.getElementById(parent.taskID);
            parentElement.appendChild(newItemDiv);
        }
        taskValue.value="";
        return newItemDiv.id;
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
    let newTask;
    const parentElement = this.parentNode;
    const oldTask =parentElement.children[1].innerText
    
    const newInput =document.createElement("input");
    newInput.type="text";
    newInput.placeholder=oldTask;
    parentElement.replaceChild(newInput,parentElement.children[1]);
    const confirmButton = document.createElement("button");
    confirmButton.classList.add("btn","btn-primary");
    confirmButton.innerText="Confirm";
    confirmButton.addEventListener("click",()=>{
        newTask=newInput.value;
        const editButton = document.createElement("button");
    editButton.innerText="Edit";
    editButton.classList.add("btn");
    editButton.classList.add("btn-success");
    editButton.addEventListener("click",editTask);
    parentElement.replaceChild(editButton,parentElement.children[2]);
     const newItemLabel = document.createElement("label");
    newItemLabel.classList.add("form-check-label");
    parentElement.replaceChild(newItemLabel,parentElement.children[1])
   if(newTask)
    {   console.log(parentElement.id);
        console.log(rootParentTask);
        const parentTask = findTask(parentElement.id);
        parentTask.name=newTask;
        parentElement.children[1].innerText=newTask;
        saveList();
    }
   
   else
    {    parentElement.children[1].innerText=oldTask;
        return;
    }


    })
    
    
    
      parentElement.replaceChild(confirmButton,parentElement.children[2]);
   
}

function removeTask()
{
    
    
    

   
    const Task = findTask(this.parentNode.id);
    const parentTask =findTask(this.parentNode.parentNode.parentNode.id);
    console.log(this.parentNode.parentNode.parentNode.id);
    console.log(parentTask);
   
    parentTask.subTasks.splice(parentTask.subTasks.indexOf(Task),1);
    saveList();
    
    this.parentNode.parentNode.removeChild(this.parentNode);

}

function addSubtask()
{   const subTaskValue =prompt("Add sub task");
    const parentNodeId = this.parentNode.id;
    const parentTask = findTask(parentNodeId);
    const subTask = new Task(subTaskValue,parentTask,null);
    parentTask.subTasks.push(subTask);
    subTask.parentIndex=parentTask.subTasks.indexOf(subTask);
    document.getElementById(subTask.taskID).classList.add("subTask");
    saveList();
}


function renderList()
{
    if(!localStorage.getItem("taskList"))
    {

        rootParentTask = new Task ("Root UL",null,null);
        console.log(rootParentTask);
       
    }
    else
    {   
        createTaskList();
    }
    
}
function clearList(){
localStorage.clear();
}

function findTask(nodeID)
{
    if(nodeID===taskList.id)
    {
        return rootParentTask;
    }
    for(let i=0;i<rootParentTask.subTasks.length;i++)
{  
     if(rootParentTask.subTasks[i].taskID===nodeID)
    {
        return rootParentTask.subTasks[i];
    }
    
    for(let j=0;j< rootParentTask.subTasks[i].subTasks.length;j++)
    {
        if(rootParentTask.subTasks[i].subTasks[j].taskID===nodeID)
        {
            return rootParentTask.subTasks[i].subTasks[j];
        }
       
        for(let k=0; k<rootParentTask.subTasks[i].subTasks[j].subTasks;k++)
        {
            if(rootParentTask.subTasks[i].subTasks[j].subTasks[k].taskID===nodeID)
            {
                return rootParentTask.subTasks[i].subTasks[j].subTasks[k];
            }
            
            for(let l=0; l<rootParentTask.subTasks[i].subTasks[j].subTasks[k].subTasks;l++)
            {
                if(rootParentTask.subTasks[i].subTasks[j].subTasks[k].subTasks[l].taskID===nodeID)
                {
                    return rootParentTask.subTasks[i].subTasks[j].subTasks[k].subTasks[l];
                }
                
            }
        }
    }
    
}

}



function createTaskList()
{
    // Retrieve from local storage
    const storedTaskJSON = localStorage.getItem("taskList");
    const storedTaskData = JSON.parse(storedTaskJSON);

    // Recreate Task object hierarchy
    rootParentTask = serializableToTask(storedTaskData);

    // Render tasks on the webpage

    // for(let i=0;i<rootParentTask.subTasks.length;i++)
    // {
    //     rootParentTask.subTasks[i].taskID=displaySelf(rootParentTask.subTasks[i].name,rootParentTask.subTasks[i].parent);
    //     for(let j=0;j< rootParentTask.subTasks[i].subTasks.length;j++)
    //     {
    //         rootParentTask.subTasks[i].subTasks[j].taskID=displaySelf(rootParentTask.subTasks[i].subTasks[j].name,rootParentTask.subTasks[i].subTasks[j].parent);
    //         for(let k=0; k<rootParentTask.subTasks[i].subTasks[j].subTasks;k++)
    //         {
    //             rootParentTask.subTasks[i].subTasks[j].subTasks[k].taskID=displaySelf(rootParentTask.subTasks[i].subTasks[j].subTasks[k].name,rootParentTask.subTasks[i].subTasks[j].subTasks[k].parent);
    //             for(let l=0; l<rootParentTask.subTasks[i].subTasks[j].subTasks[k].subTasks;l++)
    //             {
    //                 rootParentTask.subTasks[i].subTasks[j].subTasks[k].subTasks[l].taskID=displaySelf(rootParentTask.subTasks[i].subTasks[j].subTasks[k].subTasks[l].name,rootParentTask.subTasks[i].subTasks[j].subTasks[k].subTasks[l].parent);
    //             }
    //         }
    //     }
        
    // }
    saveList();
 
}

// A function to convert the Task object into a serializable structure
function taskToSerializable(task) {
  const serializable = {
    name: task.name,
    parentIndex: task.parentIndex,
     taskID: task.taskID,
    checked: task.checked,
    subTasks: task.subTasks.map(subTask => taskToSerializable(subTask))
  };
  return serializable;
}





// To retrieve the task from local storage and convert it back to a Task object:

function serializableToTask(serializable, parent=null) {
    
  const task = new Task(serializable.name,parent, serializable.parentIndex);
  //task.taskID = serializable.taskID;
  task.checked = serializable.checked;
  serializable.subTasks.forEach((subTaskData, index) => {
    task.subTasks.push(serializableToTask(subTaskData, task));
  });
  return task;
}

function saveList()
{
    // Convert Task object to serializable format
const serializableRootTask = taskToSerializable(rootParentTask);

// Store in local storage
localStorage.setItem("taskList", JSON.stringify(serializableRootTask));
}



renderList();