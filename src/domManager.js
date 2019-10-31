import localStorageManager from './localStorageManager';
import toDo from './task';
import { type } from 'os';

const domManager = (() => {
  const content = document.querySelector('.content');
  const newProjectButton =  document.querySelector('#newproject-button');
  const clearButton =  document.querySelector('#clear-button');
  const taskList = document.querySelector('.task-list')
  const newProjectIcon = document.createElement('button');
  const newTask = document.createElement('li').classList.add('li-task');
  const liTasks = document.querySelector('.li-task')

  const renderProjectTasks = (projectName) => {

    if (JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))) !== null){
    JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))).forEach(element => {

          document.querySelector('.task-list').insertAdjacentHTML('beforeend', `
          <li class="li-task">
          <div class="task-row">
              <i class="fas fa-check-square"></i>
              <p>${element.description}</p>
              <i class="far fa-times-circle"></i>
          </div>
          </li>`)

  }) }

    };


  const renderLastProjectTask = (projectName) =>{
   let  my_array =  JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName)))
   let  last_element = my_array[my_array.length - 1];

   document.querySelector('.task-list').insertAdjacentHTML('beforeend', `
   <li class="li-task">
   <div class="task-row">
       <i class="fas fa-check-square"></i>
       <p>${last_element.description}</p>
       <i class="far fa-times-circle"></i>
   </div>
   </li>` )
   document.querySelector('#input-task').value = '';
 };

  const cleanTasks = () =>{
    taskList.innerHTML = ""
  };

  const startApp = () => {

    renderProjectTasks('main');


    newProjectButton.addEventListener('click', function(){
        document.querySelector('.new-project-form').style.display = 'block';  }
    );


    clearButton.addEventListener('click', function(){
      cleanTasks();
      localStorageManager.projectList.clear();

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

  }


  return {startApp}
})();

export default domManager;
