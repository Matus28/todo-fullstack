'use strict'

// INITalization 
const output = document.getElementsByClassName('output')[0];
const form = document.getElementsByTagName('form')[0];
const url = 'http://localhost:3000/todos';
let options = {
  method: 'GET',
  headers: {'Content-Type': 'application/json'}
};

// GETing All tasks from database
const getTasksFromDB = async (url, options) => {
  options.method = 'GET';     
  delete options.body;

  try {
    let response = await fetch(url, options);
    if(response.status === 404) {
      let p = document.createElement('p');
      p.innerHTML = 'Sorry, no data found!';
      p.style.color = 'red';
      output.appendChild(p);
      throw new Error ('404: Not found!')
    }
    let data = await response.json();
    return data;

  } catch(err) {
    console.log(err);
    return;
  }
}

// APPENDing all tasks from DB to webpage
const appendTasks = (data) => {
  for (let i = 0; i < data.length; i++) {
    const task = document.createElement('div');     // --> Creating main div-unit for single task
    task.setAttribute('class', 'todo-item');
    output.appendChild(task);

    const title = document.createElement('p');     // --> Creating title of the task
    title.textContent = data[i]["text"];
    task.appendChild(title);

    const trash = document.createElement('img');      // --> Creating "button" for DELETE
    trash.setAttribute('src', './images/trash.svg');
    trash.setAttribute('alt', 'Icon of trash bin signalizing delete task.');
    trash.setAttribute('class', 'delete-icon');
    trash.addEventListener('click', (event) => {          // --> Adding event listener for DELETE                           
      deleteItem(url + `/${data[i]["id"]}`, options);
      output.removeChild(event.target.closest('div[class="todo-item"]'));
    })
    task.appendChild(trash);

    const checker = document.createElement('div');       // --> Creating "button" for CHECKING
    checker.setAttribute('class', 'checker');
    if(data[i]["completed"] === 0) {
      checker.classList.remove('selected');
    } else if (data[i]["completed"] === 1) {
      checker.classList.add('selected');
    }
    checker.addEventListener('click', (event) => {       // --> Adding event listener for CHECK
      let value;
      if (checker.classList.contains('selected')) {
        value = false;
      } else {
        value = true;
      }
      updateCheckbox(url + `/${data[i]["id"]}`, options, checker, value)
    })
    task.appendChild(checker);
  }
}

// DELETing item from DB
const deleteItem = async (url, options) => {
  options.method = 'DELETE';

  try {
    let response = await fetch(url, options);
    if(response.status === 404) {
      throw new Error ('404: Not found!')
    }
    let data = await response.json();

  } catch(err) {
    console.log(err);
    return;
  }
}

// UPDATing status "completed" on the DB
const updateCheckbox = async (url, options, item, value) => {
  options.method = 'PUT';
  options.body = JSON.stringify({
    "text": '',
    "completed": value
  });

  try {
    let response = await fetch(url, options);
    if(response.status === 404) {
      throw new Error ('404: Not found!')
    }
    let data = await response.json();

  } catch(err) {
    console.log(err);
    return;
  }

  if(item.classList.contains('selected')) {
    item.classList.remove('selected');
  } else {
    item.classList.add('selected');
  }
}

// POSTing new task in to the DB
const createNewTask = async (url, options, collectedData) => {
  options.method = 'POST';
  options.body = JSON.stringify({
    'text': collectedData,
    'completed': false
  });

  try {
    let response = await fetch(url, options);
    if(response.status === 404) {
      throw new Error ('404: Not found!')
    }
    let data = await response.json();
    return data;
    
  } catch(err) {
    console.log(err);
    return;
  }
}

// EVENT LISTENER for form, after clicking
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  let collectedData = document.getElementsByClassName('task-input')[0]["value"];
  let createdTask = await createNewTask(url, options, collectedData);
  appendTasks(createdTask);
  document.getElementsByClassName('task-input')[0]["value"] = '';
})

// EVENT LISTENER after DOM is loaded, rendering tasks
window.addEventListener('DOMContentLoaded', async (event) => {
  let dataTasks = await getTasksFromDB(url, options);
  appendTasks(dataTasks);
});