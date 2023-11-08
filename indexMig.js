
const taskList = document.getElementById("taskList");
const newTask = document.getElementById("new_task");


function addTask(){
    
   
    const submittedValue = newTask.value;
    if(!submittedValue)
    {
        alert("Please add new task first.")
        return;
    }
    
    
    taskList.appendChild(createListElements(submittedValue,true))
    newTask.value="";
}

function editTask(){
    const newTask=prompt("Change task");
    if(newTask)
    {
        this.parentNode.children[1].innerText=newTask;
    }
    else
    {
        return;
    }
     
   
    
}

function removeTask(){
    this.parentNode.parentNode.removeChild(this.parentNode);
   
}

function expandDropDown(){
    const subTaskValue =prompt("Add sub task");
    let newSubTask;
    if(!subTaskValue)
    {
        return;
    }
    if(this.parentNode.parentNode.parentNode.parentNode.tagName==="UL")
    {
        newSubTask =createListElements(subTaskValue,false);
    }
    else{
          newSubTask =createListElements(subTaskValue,true);
    }
   
    
    newSubTask.style.backgroundColor="#E1CDFA";
    newSubTask.style.width="70%";
    newSubTask.style.marginLeft="2rem";
    this.parentNode.appendChild(newSubTask);
    
  
    

}

function updateParents()
{
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
            return;
         }
     }
     
     parent.children[0].checked=true;
     


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

