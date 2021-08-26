// UI Variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

let tasks = [];



loadTasks();

// Create Task
function buildTask(task) {
  // Create Item
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));

  // Create Delete Button
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  li.appendChild(link);

  // Create Delete Icon
  const icon = document.createElement('i');
  icon.className = 'fas fa-times';
  link.appendChild(icon);

  // Add To List
  taskList.appendChild(li);
}

// Get & Display Tasks From Storage
function loadTasks() {
  if (localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    buildTask(task);
  });
}

// Update Tasks In Local Storage
function updateLocalStorageTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}



loadEventListeners();

function loadEventListeners() {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTask);
  filter.addEventListener('keyup', filterTask);
}

// Add Task Event
function addTask(e) {
  e.preventDefault();

  if (taskInput.value === '') {
    alert('Add a task');
  } else {
    buildTask(taskInput.value);
    tasks.push(taskInput.value);
    updateLocalStorageTasks();
  }

  taskInput.value = '';
}

// Remove Task Event
function removeTask(e) {
  if (e.target.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.remove();

      tasks.forEach(function (task, index) {
        if (e.target.parentElement.textContent === task) {
          tasks.splice(index, 1);
          updateLocalStorageTasks();
        }
      });
    }
  }
}

// Clear Task Event
function clearTask(e) {
  if (confirm('Are you sure?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear();
  }
}

// Filter Task Event
function filterTask(e) {
  const filterQuery = e.target.value.toLowerCase();
  const taskArr = document.querySelectorAll('.collection-item');

  taskArr.forEach(function (task) {
    const item = task.firstChild.textContent.toLowerCase();

    if (item.indexOf(filterQuery) != -1) {
      console.log(typeof task);
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}