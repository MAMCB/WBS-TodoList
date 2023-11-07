const shoppingList = [];

document.getElementById('addItemButton').addEventListener('click', addItem);

function displayShoppingList() {
    let list = document.getElementById('shoppingList');
    list.innerHTML = "";
    shoppingList.forEach((item, index) => {
        let li = document.createElement('li');
        let label = document.createElement('label');
        label.appendChild(document.createTextNode(item.text));
        
        let editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', function () {
            let newText = prompt("Edit to:", item.text);
            if (newText !== null && newText !== '') {
                shoppingList[index].text = newText;
                displayShoppingList();
            }
        });
        let removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', function () {
            shoppingList.splice(index, 1);
            displayShoppingList();
        });

        li.appendChild(label);
        li.appendChild(editButton);
        li.appendChild(removeButton);
        list.appendChild(li);
    });
}


function addItem() {
    let input = document.getElementById('itemInput').value;
    if (input !== '') {
        shoppingList.push({ text: input });
        displayShoppingList();
        document.getElementById('itemInput').value = '';
    } else {
        alert("Please enter a valid item.");
    }
}

