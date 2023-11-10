
const taskList = document.getElementById("taskList");
const newTask = document.getElementById("new_task");

class Task{
    constructor(name,parent,parentIndex,elementID)
    {   
        this.name = name;
        this.parent = parent;
        this.parentIndex = parentIndex;
        this.elementID = elementID;
        this.checked = false;
        this.subTasks = [];

    }
}

let rootParentTask;

function saveList()
{
    console.log(rootParentTask);
    const serializableRootTask = taskToSerializable(rootParentTask);
    localStorage.setItem("taskList", JSON.stringify(serializableRootTask));
    
   
}

function renderList()
{
    if(!localStorage.getItem("taskList"))
    {

        rootParentTask = new Task ("Root UL",null,null,taskList.getAttribute("id"));
    }
    else
    {   
        const rootTaskFromLocalStorage= JSON.parse(localStorage.getItem("taskList"));
       rootParentTask = serializableToTask(rootTaskFromLocalStorage);
       console.log(rootParentTask);
        createTaskList(rootParentTask,taskList);
    }
    
}




function createTaskList(rootTask, parentElement) {
    let listElement;
  for (let i = 0; i < rootTask.subTasks.length; i++) {
    if(parentElement.parentNode.parentNode.parentNode.tagName==="UL")
    {
         listElement = createListElements(rootTask.subTasks[i].name, false);
    }
    else
    {
         listElement = createListElements(rootTask.subTasks[i].name, true);
    }
    
  

    if (rootTask.subTasks[i].checked) {
      listElement.children[0].checked = true;
    }

    parentElement.appendChild(listElement);

    // Recurse into nested subTasks
    if (rootTask.subTasks[i].subTasks.length > 0) {
      let  dropDownIcon =document.createElement("i");
     dropDownIcon.classList.add("fa-solid","fa-caret-down","fa-fade");
     dropDownIcon.style.fontSize="30px";
     dropDownIcon.style.cursor="pointer";
     dropDownIcon.addEventListener("click",toggleSubtasks);
     listElement.appendChild(dropDownIcon);
     console.log(listElement.parentNode);
     console.log(listElement);
     if(listElement.parentNode.tagName !== "UL")
     {
        listElement.style.backgroundColor="#E1CDFA";
        listElement.style.width="70%";
        listElement.style.marginLeft="2rem";
     }
     
      createTaskList(rootTask.subTasks[i], listElement);
    }
  }
}


function addTask(){
    
   
    const submittedValue = newTask.value;
    if(!submittedValue)
    {
        alert("Please add new task first.")
        return;
    }
    
    const task = createListElements(submittedValue,true);
    console.log(task);
    taskList.appendChild(task)
    rootParentTask.subTasks.push(createNewTask(submittedValue,rootParentTask,task.getAttribute("id")
        ));
        saveList();
    newTask.value="";
}

function editTask(){
    const newTask=prompt("Change task");
    if(newTask)
    {   const parentTask = findTaskByNode(this.parentNode.id,rootParentTask);
        parentTask.name=newTask;
        this.parentNode.children[1].innerText=newTask;
        saveList();
    }
    else
    {
        return;
    }
     
   
    
}

function removeTask(){
    const children = this.parentNode.parentNode.children;
    
    //check if there are no subtasks left and if so remove dropdown icon
    let subTaskCount=0;
    for(let i =0; i<children.length;i++)
    {
        
        if(children[i].tagName==="DIV")
        {
            
            subTaskCount++;
        }
    }
    if(this.parentNode.parentNode.tagName!=="UL" && subTaskCount===1 )
    {
        this.parentNode.parentNode.removeChild(this.parentNode.parentNode.children[5]);
    }

   
    const Task = findTaskByNode(this.parentNode.getAttribute("id"),rootParentTask);
    const parentTask =findTaskByNode(this.parentNode.parentNode.getAttribute("id"),rootParentTask);
    console.log(parentTask);
   
    parentTask.subTasks.splice(parentTask.subTasks.indexOf(Task),1);
    saveList();
    
    this.parentNode.parentNode.removeChild(this.parentNode);
    

    
    
   
}

function expandDropDown(){
    const parentTask = findTaskByNode(this.parentNode.id,rootParentTask);
    console.log(this.parentNode.children[1]);
    console.log(this.parentNode.id);
    console.log(parentTask.name);
    const subTaskValue =prompt("Add sub task");
    let newSubTask;
    let dropDownIcon;
    if(!subTaskValue)
    {
        return;
    }
    if(this.parentNode.parentNode.parentNode.parentNode.tagName==="UL")
    {
        newSubTask =createListElements(subTaskValue,false);
        parentTask.subTasks.push(createNewTask(subTaskValue,parentTask,newSubTask.getAttribute("id")));
        saveList();
        
        
    }
    else{
          newSubTask =createListElements(subTaskValue,true);
          parentTask.subTasks.push(createNewTask(subTaskValue,parentTask,newSubTask.getAttribute("id")));
          saveList();
    }
     
    
    
    const children = this.parentNode.children;
    let hasDropDownIcon=false;
   for(let i = 0; i <children.length;i++)
   {
        if(children[i].tagName==="I")
        {
            hasDropDownIcon=true;
        }
   }
   if(!hasDropDownIcon)
   {
        dropDownIcon =document.createElement("i");
     dropDownIcon.classList.add("fa-solid","fa-caret-down","fa-fade");
     dropDownIcon.style.fontSize="30px";
     dropDownIcon.style.cursor="pointer";
     dropDownIcon.addEventListener("click",toggleSubtasks);
     this.parentNode.appendChild(dropDownIcon);

   }
   newSubTask.style.backgroundColor="#E1CDFA";
    newSubTask.style.width="70%";
    newSubTask.style.marginLeft="2rem";
    this.parentNode.appendChild(newSubTask);
      
    
    


}

function toggleSubtasks(){
    
    const parent = this.parentNode;
    
    const childDivs = []
    for(let i = 0; i< parent.children.length;i++)
    {
        if(parent.children[i].tagName==="DIV")
        {
            childDivs.push(parent.children[i]);
        }
    }
   
     for(let i = 0; i<childDivs.length;i++)
     {  
        
         if(childDivs[i].style.display==="none")
         {
            
            childDivs[i].style.display="block";
         }
         else
         {
            childDivs[i].style.display="none";
         }
         
     }
}

function updateParents()
{   const parentTask = findTaskByNode(this.parentNode.id,rootParentTask);
    const greatParentTask = findTaskByNode(this.parentNode.parentNode.id,rootParentTask);
    
    parentTask.checked=this.checked;
    
     saveList();
    const parent=this.parentNode.parentNode;
    if(parent.tagName==="UL")
    {
        

        return;
    }
    const childDivs = []
    for(let i = 0; i< parent.children.length;i++)
    {
        if(parent.children[i].tagName==="DIV")
        {
            childDivs.push(parent.children[i]);
        }
    }
     for(let i = 0; i<childDivs.length;i++)
     {
        
         if(childDivs[i].children[0].checked)
         {
            
            continue;
         }
         else{
            parent.children[0].checked=false;
            greatParentTask.checked=false;
            return;
         }
     }
     
     parent.children[0].checked=true;
     greatParentTask.checked=true;
     
     saveList();

}

function createListElements(value,subTask)
{
    const newElements=[];
    //creates div parent element and add its classes
    const newItemDiv = document.createElement("div")
    newItemDiv.classList.add("form-check");

    //creates check input element,adds its classes and pushes it to newElements array
    const newCheckInput = document.createElement("input");
    newCheckInput.classList.add("form-check-input");
    newCheckInput.type="checkbox";
    newCheckInput.addEventListener("click",updateParents);
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
    if(subTask)
    {
        const dropDownButton = document.createElement("button");
        dropDownButton.classList.add("btn");
        dropDownButton.classList.add("btn-secondary");
        dropDownButton.innerText="Sub-tasks"
        dropDownButton.addEventListener("click",expandDropDown);
        newElements.push(dropDownButton);

    }
    

    
   for(let i = 0; i<newElements.length;i++)
   {
        newItemDiv.appendChild(newElements[i]);
   }
   const itemID = generateUniqueId();
   newItemDiv.id=`task_${itemID}`;
   



    return newItemDiv;
}

function createNewTask(value,parent,element)
{
    
    const task = new Task(value,parent,parent.subTasks.length,element)
    return task;
}

function findTaskByNode(node, rootTask) {
  console.log(node);

  function findNestedTask(task, currentNode, depth) {
    console.log(task);
    if (task.elementID === currentNode) { // Check for equality based on the unique identifier
      return task;
    }

    if (depth > 0) {
      for (const subtask of task.subTasks) {
        const nestedTask = findNestedTask(subtask, currentNode, depth - 1);
        if (nestedTask) {
          return nestedTask;
        }
      }
    }
    console.log("No task found");
    return null;
  }

  let currentTask = rootTask;
  let depth = 4;

  // Check the rootTask for equality before entering the loop
  if (currentTask.elementID === node) {
    return currentTask;
  }

  while (currentTask !== null && currentTask.elementID !== node) {
    // depth++;
    currentTask = findNestedTask(currentTask, node, depth);
    
  }

  return currentTask;
}

renderList();

// A function to convert the Task object into a serializable structure
function taskToSerializable(task) {
  const serializable = {
    name: task.name,
    parentIndex: task.parentIndex,
    checked: task.checked,
    elementID:task.elementID,
    subTasks: task.subTasks.map(subTask => taskToSerializable(subTask))
  };
  return serializable;
}





// To retrieve the task from local storage and convert it back to a Task object:

function serializableToTask(serializable, parent=null) {
    console.log(serializable);
  const task = new Task(serializable.name,parent, serializable.parentIndex,serializable.elementID);
  task.checked = serializable.checked;
  serializable.subTasks.forEach((subTaskData, index) => {
    task.subTasks.push(serializableToTask(subTaskData, task));
  });
  return task;
}

function generateUniqueId() {
  
  return Date.now().toString();
}

function clearStorage(){
    localStorage.clear();
}





