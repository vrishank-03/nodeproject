//This JavaScript file contains functions that run in the browser to handle user interactions like adding and removing items, and toggling dark mode.

function addItem() {
  const todoInput = document.getElementById('todoInput');// Get the input field where users type their todo items
  const todoList = document.getElementById('todoList');// Get the list of todo items


  if (todoInput.value.trim() === '') { // if the input field is empty 
    return; // do nothing
  }

  const newItem = document.createElement('li');
  newItem.innerHTML = `${todoInput.value} <span class="dustbin-icon" onclick="removeItem(event)">🗑️</span>`;//set the content of the list item
  newItem.onclick = function() {
    this.classList.toggle('completed');//toggle the completed class when item is clicked, if new item already has class completed it will be romoved if not it will be added
    if (this.classList.contains('completed')) {//checks if new item has completed class after toggling 
      todoList.appendChild(this);
    } else {
      todoList.insertBefore(this, todoList.firstChild);
    }
  };

  todoList.insertBefore(newItem, todoList.firstChild);
  todoInput.value = '';
}

function removeItem(event) {
  event.stopPropagation(); // Prevent the click event from bubbling up to the li element
  event.target.parentElement.remove();
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}