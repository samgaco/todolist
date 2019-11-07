import localStorageManager from './localStorageManager';
import toDo from './task';
import ProjectsManager from './project';
import { type } from 'os';

const domManager = (() => {
  const content = document.querySelector('.content');
  const newProjectButton = document.querySelector('#newproject-button');
  const clearButton = document.querySelector('#clear-button');
  const taskList = document.querySelector('.task-list')
  const newProjectIcon = document.createElement('button');
  const newTask = document.createElement('li').classList.add('li-task');
  const liTasks = document.querySelector('.li-task')

  var current_project = 'main'

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
        <div class="task-inside">
          <p id=open-edit${element.id} class="task-description">${element.description}</p> <br>
          <input id=edit${element.id} class="textarea edit-task" type="text" placeholder="${element.description}"> <br>
          <p class="due-date"> Due date: ${element.duedate} </p>
        </div>
            <i class="fas fa-times delete" id=${element.id} data-position=${element.id}></i>
        </div>
        </li>`)
        priorityColors(element);


      }
  }

  const deletebuttonActivate = (id, projectName) => {

    if (JSON.parse(localStorageManager.projectList.getItem(projectName)) !== null) {
    document.getElementById(`${id}`).addEventListener('click', (evt) => {
      localStorageManager.deleteTask(projectName, evt.target.dataset.position);
      cleanTasks();
      renderProjectTasks(projectName);
    })  };
  }


  const prioritybuttonActivate = (id, projectName) => {

    if (JSON.parse(localStorageManager.projectList.getItem(projectName)) !== null) {
    document.getElementById(`check${id}`).addEventListener('click', (evt) => {
      localStorageManager.CheckTask(projectName, id);
      cleanTasks();
      renderProjectTasks(projectName);
    })  };
  }

  document.querySelector('#input-task').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {

    }
  });

  const editInputActivate = (id, projectName) =>{
    document.getElementById(`edit${id}`).addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) {
        console.log("aqui",document.getElementById(`edit${id}`).value)
        document.getElementById(`open-edit${id}`).innerHTML = document.getElementById(`edit${id}`).value
        document.getElementById(`edit${id}`).style.display = "none"
        document.getElementById(`open-edit${id}`).style.display = "block"
      }})
  }

const openeditButtonActivate = (id, projectName) =>{
    if (JSON.parse(localStorageManager.projectList.getItem(projectName)) !== null) {
      document.getElementById(`open-edit${id}`).addEventListener('click', (evt) => {
        console.log(document.getElementById(`open-edit${id}`))
        document.getElementById(`open-edit${id}`).style.display = "none"
        document.getElementById(`edit${id}`).style.display = "block"
       

        editInputActivate(id, projectName);

     }) }};


    


  const renderProjectDelete = (projectName) =>{

    let parsedproject = JSON.parse(localStorageManager.projectList.getItem(projectName))

    if (parsedproject !== null) {

      JSON.parse(localStorageManager.projectList.getItem(projectName)).forEach(element => {

        if(document.getElementById(`${element.id}`) !== null){

        deletebuttonActivate(element.id, projectName);
      }


      })
    }
  };


  const renderProjectPriority = (projectName) =>{
    if (JSON.parse(localStorageManager.projectList.getItem(projectName)) !== null) {

      JSON.parse(localStorageManager.projectList.getItem(projectName)).forEach(element => {

        if(document.getElementById(`check${element.id}`) !== null){

        prioritybuttonActivate(element.id, projectName);
      }


      })
    }
  };


  const renderProjectEdit = (projectName) =>{
    if (JSON.parse(localStorageManager.projectList.getItem(projectName)) !== null) {

      JSON.parse(localStorageManager.projectList.getItem(projectName)).forEach(element => {

        if(document.getElementById(`open-edit${element.id}`) !== null){

        openeditButtonActivate(element.id, projectName);
      }


      })
    }
  };

  const renderProjectTasks = (projectName) => {
    console.log(localStorageManager.projectList.getItem(projectName))

    if (JSON.parse(localStorageManager.projectList.getItem(projectName)) !== null) {
      JSON.parse(localStorageManager.projectList.getItem(projectName)).forEach(element => {

        renderTask(element);
        renderProjectDelete(projectName);
        renderProjectPriority(projectName);
        renderProjectEdit(projectName);

      })
    }

  };

  const renderLastProjectTask = (projectName) => {
    let my_array = JSON.parse(localStorageManager.projectList.getItem(projectName))
    let last_element = my_array[my_array.length - 1];

    renderTask(last_element);
    renderProjectDelete(projectName);
    renderProjectPriority(projectName);


  };

  const renderAllProjects = () => {
    let projectsCont = document.querySelector('.projectContainer');
    while(projectsCont.firstChild) {
      projectsCont.removeChild(projectsCont.firstChild);
    }
    localStorageManager.allProjects().forEach(el => {
      console.log(el);
      let projectEl = document.createElement('div')
      projectEl.classList.add('project')
      projectEl.textContent = el;
      if(el === 'main'){
        projectEl.classList.add('currproj');
      }
      projectsCont.appendChild(projectEl);
      activateProjectbuttons();
    })
  }


  const activateProjectbuttons = () =>{
    console.log(document.getElementsByClassName('project'))
    document.querySelectorAll('.project').forEach(el =>{

      el.addEventListener('click', function () {
            current_project = el.textContent;
            console.log("button project entra", current_project)
            cleanTasks();
            renderProjectTasks(current_project);
            document.querySelector('.currproj').classList.remove('currproj')
            el.classList.add('currproj');


          }
      )

    })

  }

  const cleanTasks = () => {
    taskList.innerHTML = ""
  };

  const startApp = () => {

    renderAllProjects();

    console.log("aqui??")
    renderProjectTasks(current_project);


    clearButton.addEventListener('click', function () {
      cleanTasks();
      localStorageManager.projectList.clear();
      renderAllProjects();
    }
    );


    activateProjectbuttons();


    document.querySelector('#input-task').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) {

        let radios = document.getElementsByName('priority');

          for (var i = 0, length = radios.length; i < length; i++)
          {
          if (radios[i].checked)
          {
            var priorityValue = radios[i].value;

            break;
          }
          }


        let newDate = new Date(document.getElementById("myDate").value)

        let dueDate = newDate.getDate().toString() + '-' +(newDate.getMonth()+1).toString() + '-'+ newDate.getFullYear().toString()
          console.log("creatodo" , document.querySelector('#input-task').value, priorityValue, dueDate)
        let taskObj = toDo.createTodo(document.querySelector('#input-task').value, priorityValue, dueDate);
          console.log("we insert this into addtasklist  ", taskObj)
        localStorageManager.addTaskList(current_project, taskObj)


        renderLastProjectTask(current_project);
      }
    });

    document.querySelector('.projectTitle').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) {
        let proj = ProjectsManager.createProject(document.querySelector('.projectTitle').value);
        // function to create a project in the locat storage
        localStorageManager.addProjects(proj);
        renderAllProjects();
      }
    });

    document.querySelector('#input-task').focus();

  }


  return { startApp }
})();

export default domManager;
