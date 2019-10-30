import localStorageManager from './localStorageManager';
import toDo from './task';

const domManager = (() => {
  const content = document.querySelector('.content');
  const newProjectButton =  document.querySelector('#newproject-button');
  const clearButton =  document.querySelector('#clear-button');
  const taskList = document.querySelector('.task-list')
  const newProjectIcon = document.createElement('button');
  const newTask = document.createElement('li').classList.add('li-task');
  const liTasks = document.querySelector('.li-task')


  const renderProjectTasks = (projectName) => {

  JSON.parse(localStorageManager.projectList.getItem(localStorageManager.projectList.key(projectName))).forEach(element => {
          
    document.querySelector('.task-list').insertAdjacentHTML('beforeend', `
    <li class="li-task">
    <div class="task-row">
        <i class="fas fa-check-square"></i>
         <p>${element.description}</p>
         <i class="far fa-times-circle"></i>
    </div>
    </li>`)

  }) };

  const cleanTasks = () =>{
    taskList.innerHTML = ""
  };

  const startApp = () => {

    if(localStorageManager.projectList.length === 0){
      localStorageManager.initiateMain();
    }

    renderProjectTasks(0);

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
      if (key === 13) { // 13 is enter

        let taskObj = toDo.createTodo(document.querySelector('#input-task').value);
        localStorageManager.addTaskList('Main', taskObj)
        cleanTasks();
        renderProjectTasks(0);

      }
    })

  }


  const newProject = () => {
      // Will render new project views
  }

  return {startApp, newProject}
})();

export default domManager;
