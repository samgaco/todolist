import localStorageManager from './localStorageManager';
import toDo from './task';
import { type } from 'os';

const domManager = (() => {
  const content = document.querySelector('.content');
  const newProjectButton = document.querySelector('#newproject-button');
  const clearButton = document.querySelector('#clear-button');
  const taskList = document.querySelector('.task-list')
  const newProjectIcon = document.createElement('button');
  const newTask = document.createElement('li').classList.add('li-task');
  const liTasks = document.querySelector('.li-task')

  const renderTask = (element) => {

    if(element.trash === false){
    document.querySelector('.task-list').insertAdjacentHTML('beforeend', `
        <li class="li-task">
        <div class="task-row">
            <i class="fas fa-check-square"></i>
            <p>${element.description}</p>
            <i class="fas fa-times delete" id=${element.id} data-position=${element.id}></i>
        </div>
        </li>`) }
  }

  const deletebuttonActivate = (id, projectName) => {

    if (JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))) !== null) {
    document.getElementById(`${id}`).addEventListener('click', (evt) => {
      console.log("activate")
      console.log("see", evt.target.dataset.position)

      localStorageManager.deleteTask('main', evt.target.dataset.position);
      cleanTasks();
      renderProjectTasks('main');
    })  };
  }
  

  const renderProjectDelete = (projectName) =>{
    if (JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))) !== null) {
     
      JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))).forEach(element => {
        
console.log("elements", element.id)
        if(document.getElementById(`${element.id}`) !== null){
          console.log("entra", element.id)

        deletebuttonActivate(element.id, projectName); }


      })
    }
  };

  const renderProjectTasks = (projectName) => {
    console.log(localStorageManager.projectList.getItem(projectName))

    if (JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))) !== null) {
      JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))).forEach(element => {
      
        renderTask(element);
        renderProjectDelete('main');

      })
    }
  };

  const renderLastProjectTask = (projectName) => {
    let my_array = JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName)))
    let last_element = my_array[my_array.length - 1];

    renderTask(last_element);
    renderProjectDelete('main');

  };

  const cleanTasks = () => {
    taskList.innerHTML = ""
  };

  const startApp = () => {

    renderProjectTasks('main');


    newProjectButton.addEventListener('click', function () {
      document.querySelector('.new-project-form').style.display = 'block';
    }
    );


    clearButton.addEventListener('click', function () {
      cleanTasks();
      localStorageManager.projectList.clear();
      localStorageManager.resetcounter();

    }
    );

    document.querySelector('#input-task').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) {

        let taskObj = toDo.createTodo(document.querySelector('#input-task').value);
        console.log(taskObj)

        localStorageManager.addTaskList('main', taskObj)

        renderLastProjectTask('main');
      }
    });

    document.querySelector('#input-task').focus();

  }


  return { startApp }
})();

export default domManager;
