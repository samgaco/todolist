import localStorageManager from './localStorageManager';
import toDo from './task';

const domManager = (() => {
  const content = document.querySelector('.content');
  const newProjectButton =  document.querySelector('#newproject-button');
  const taskList = document.querySelector('.task-list')
  const newProjectIcon = document.createElement('button');
  const newTask = document.createElement('li').classList.add('li-task');


  const startApp = () => {

    newProjectButton.addEventListener('click', function(){
        document.querySelector('.new-project-form').style.display = 'block';  }
    );

    document.querySelector('#input-task').addEventListener('keypress', function (e) {
      e.preventDefault();
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter

        let taskObj = toDo.createTodo(document.querySelector('#input-task').value);
        localStorageManager.addTaskList('Main', taskObj)

        let i = 0;
        while(i < localStorageManager.projectList.length){
          console.log(localStorageManager.projectList.getItem(localStorageManager.projectList.key(i)))
          document.querySelector('.task-list li:last-of-type').insertAdjacentHTML('afterend', `
          <li class="li-task">
              <i class="fas fa-check-square"></i>
               <p>${localStorageManager.projectList.getItem(localStorageManager.projectList.key(i))}</p>
               <i class="far fa-times-circle"></i>
          </li>`
        )
        i += 1;
        }



      }
    })

  }


  const newProject = () => {
      // Will render new project views
  }

  return {startApp, newProject}
})();

export default domManager;
