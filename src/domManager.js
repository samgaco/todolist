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

  const priorityColors = (element) =>{
    if(element.priority == 1){
      document.getElementById(`${element.id}`).parentElement.style.background = '#f1ed09'
        }

    if(element.priority == 2){  
          document.getElementById(`${element.id}`).parentElement.style.background = '#f15e09'
            }
  }

  const renderTask = (element) => {

    if(element.trash === false){
    document.querySelector('.task-list').insertAdjacentHTML('beforeend', `
        <li class="li-task">
        <div class="task-row">
        <i class="fas fa-fire-alt priority" id=check${element.id}></i>
          <p>${element.description}</p>
            <i class="fas fa-times delete" id=${element.id} data-position=${element.id}></i>
        </div>
        </li>`)      

        priorityColors(element);

      }
  }

  const deletebuttonActivate = (id, projectName) => {

    if (JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))) !== null) {
    document.getElementById(`${id}`).addEventListener('click', (evt) => {
      localStorageManager.deleteTask('main', evt.target.dataset.position);
      cleanTasks();
      renderProjectTasks('main');
    })  };
  }


  const prioritybuttonActivate = (id, projectName) => {

    if (JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))) !== null) {
    document.getElementById(`check${id}`).addEventListener('click', (evt) => {
      localStorageManager.CheckTask('main', id);
      cleanTasks();
      renderProjectTasks('main');
    })  };
  }
  

  const renderProjectDelete = (projectName) =>{
    if (JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))) !== null) {
     
      JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))).forEach(element => {
        
        if(document.getElementById(`${element.id}`) !== null){

        deletebuttonActivate(element.id, projectName); 
      }


      })
    }
  };


  const renderProjectPriority = (projectName) =>{
    if (JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))) !== null) {
     
      JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))).forEach(element => {
        
        if(document.getElementById(`check${element.id}`) !== null){

        prioritybuttonActivate(element.id, projectName); 
      }


      })
    }
  };

  const renderProjectTasks = (projectName) => {
    console.log(localStorageManager.projectList.getItem(projectName))

    if (JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))) !== null) {
      JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))).forEach(element => {
      
        renderTask(element);
        renderProjectDelete('main');
        renderProjectPriority('main');

      })
    }

  };

  const renderLastProjectTask = (projectName) => {
    let my_array = JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName)))
    let last_element = my_array[my_array.length - 1];

    renderTask(last_element);
    renderProjectDelete('main');
    renderProjectPriority('main');


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
    }
    );

    document.querySelector('#input-task').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) {

        let radios = document.getElementsByName('priority');

          for (var i = 0, length = radios.length; i < length; i++)
          {
          if (radios[i].checked)
          {
            // do whatever you want with the checked radio
            var priorityValue = radios[i].value;

            // only one radio can be logically checked, don't check the rest
            break;
          }
          }


        let taskObj = toDo.createTodo(document.querySelector('#input-task').value, priorityValue);

        localStorageManager.addTaskList('main', taskObj)

        renderLastProjectTask('main');
      }
    });

    document.querySelector('#input-task').focus();

  }


  return { startApp }
})();

export default domManager;
