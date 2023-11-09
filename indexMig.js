
const taskList = document.getElementById("taskList");
const newTask = document.getElementById("new_task");

class Task{
    constructor(name,parent,parentIndex)
    {   
        this.name = name;
        this.parent = parent;
        this.parentIndex = parentIndex;
        this.checked = false;
        this.subTasks = [];

    }
}

let rootParentTask;

function saveList()
{
    const serializableRootTask = taskToSerializable(rootParentTask);
    localStorage.setItem("taskList", JSON.stringify(serializableRootTask));
   
}

function renderList()
{
    if(!localStorage.getItem("taskList"))
    {
        rootParentTask = new Task ("Root UL",null,null);
    }
    else
    {   
        const rootTaskFromLocalStorage= JSON.parse(localStorage.getItem("taskList"));
       rootParentTask = serializableToTask(rootTaskFromLocalStorage);
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
      listElement.checked = true;
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
     if(listElement.parentNode != taskList)
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
    
    
    taskList.appendChild(createListElements(submittedValue,true))
    rootParentTask.subTasks.push(createNewTask(submittedValue,rootParentTask
        ));
        saveList();
    newTask.value="";
}

function editTask(){
    const newTask=prompt("Change task");
    if(newTask)
    {   const parentTask = getParentTask(this.parentNode);
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


    const parentTask = getParentTask(this.parentNode);
    const greatParentTask =getParentTask(this.parentNode.parentNode);
    greatParentTask.subTasks.splice(greatParentTask.subTasks.indexOf(parentTask),1);
    saveList();
    
    this.parentNode.parentNode.removeChild(this.parentNode);
    

    
    
   
}

function expandDropDown(){
    const parentTask = getParentTask(this.parentNode);
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
        parentTask.subTasks.push(createNewTask(subTaskValue,parentTask));
        saveList();
        
        
    }
    else{
          newSubTask =createListElements(subTaskValue,true);
          parentTask.subTasks.push(createNewTask(subTaskValue,parentTask));
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
{   const parentTask = getParentTask(this.parentNode);
    const greatParentTask = getParentTask(this.parentNode.parentNode);
    parentTask.checked=parentTask.checked?false:true;
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
   



    return newItemDiv;
}

function createNewTask(value,parent)
{
    
    const task = new Task(value,parent,parent.subTasks.length)
    return task;
}

function getParentTask(node)
{
    let count = 0;
  while (node !== null && node.tagName !== 'UL') {
    node = node.parentNode;
    count++;
  }
 return findNestedTask(rootParentTask,count);
}

function findNestedTask(rootTask, n) {
  if (n === 0) {
    return rootTask;
  }
  
  for (const subtask of rootTask.subTasks) {
    const nestedTask = findNestedTask(subtask, n - 1);
    if (nestedTask) {
      return nestedTask;
    }
  }
  
  return null;
}

renderList();

// A function to convert the Task object into a serializable structure
function taskToSerializable(task) {
  const serializable = {
    name: task.name,
    parentIndex: task.parentIndex,
    checked: task.checked,
    subTasks: task.subTasks.map(subTask => taskToSerializable(subTask))
  };
  return serializable;
}





// To retrieve the task from local storage and convert it back to a Task object:

function serializableToTask(serializable, parent = null) {
  const task = new Task(serializable.name, parent, serializable.parentIndex);
  task.checked = serializable.checked;
  serializable.subTasks.forEach((subTaskData, index) => {
    task.subTasks.push(serializableToTask(subTaskData, task));
  });
  return task;
}








