/* eslint-env browser */
/* eslint no-unused-vars: [1, {"argsIgnorePattern": "evt"}] */

import localStorageManager from './localStorageManager';
import toDo from './task';
import ProjectsManager from './project';

const domManager = (() => {
  const clearButton = document.querySelector('#clear-button');
  const taskList = document.querySelector('.task-list');

  let currentProject = 'default';

  const priorityColors = (element) => {
    if (element.priority === 1) {
      document.getElementById(`${element.id}`).parentElement.style.background = '#f1ed09';
    }

    if (element.priority === 2) {
      document.getElementById(`${element.id}`).parentElement.style.background = '#f15e09';
    }
  };

  const editInputActivate = (id) => {
    document.getElementById(`edit${id}`).addEventListener('keypress', (e) => {
      const key = e.which || e.keyCode;
      if (key === 13) {
        localStorageManager.editTask(currentProject, id, document.getElementById(`edit${id}`).value);

        document.getElementById(`open-edit${id}`).innerHTML = document.getElementById(`edit${id}`).value;
        document.getElementById(`edit${id}`).style.display = 'none';
        document.getElementById(`open-edit${id}`).style.display = 'block';
      }
    });
  };

  const ediTitleActivate = (id) => {
    document.getElementById(`edit-title${id}`).addEventListener('keypress', (e) => {
      const key = e.which || e.keyCode;
      if (key === 13) {
        localStorageManager.editTitle(currentProject, id, document.getElementById(`edit-title${id}`).value);

        document.getElementById(`open-title${id}`).innerHTML = document.getElementById(`edit-title${id}`).value;
        document.getElementById(`edit-title${id}`).style.display = 'none';
        document.getElementById(`open-title${id}`).style.display = 'block';
      }
    });
  };


  const openeditButtonActivate = (id) => {
    document.getElementById(`open-edit${id}`).addEventListener('click', (evt) => {
      document.getElementById(`open-edit${id}`).style.display = 'none';
      document.getElementById(`edit${id}`).style.display = 'block';
      editInputActivate(id);
    });
  };

  const openeditTitleActivate = (id) => {
    document.getElementById(`open-title${id}`).addEventListener('click', (evt) => {
      document.getElementById(`open-title${id}`).style.display = 'none';
      document.getElementById(`edit-title${id}`).style.display = 'block';
      ediTitleActivate(id);
    });
  };


  const renderTask = (element) => {
    if (element.trash === false) {
      document.querySelector('.task-list').insertAdjacentHTML('beforeend', `
        <li class="li-task">
        <div class="task-row">
        <i class="fas fa-fire-alt priority" id=check${element.id}></i>
        <div class="task-inside">
         <p id=open-title${element.id} class="task-title">${element.title}</p> <br>
         <input id=edit-title${element.id} class="textarea edit-task" type="text" placeholder="${element.title}"> <br>
          <p id=open-edit${element.id} class="task-description">${element.description}</p> <br>
          <input id=edit${element.id} class="textarea edit-task" type="text" placeholder="${element.description}"> <br>
          <p class="due-date"> Due date: ${element.duedate} </p>
        </div>
            <i class="fas fa-times delete" id=${element.id} data-position=${element.id}></i>
        </div>
        </li>`);
      priorityColors(element);
      openeditButtonActivate(element.id);
      openeditTitleActivate(element.id);
    }
  };

  const cleanTasks = () => {
    taskList.innerHTML = '';
  };

  const renderProjectEdit = (projectName) => {
    if (JSON.parse(localStorageManager.projectList.getItem(projectName)) !== null) {
      JSON.parse(localStorageManager.projectList.getItem(projectName)).forEach((element) => {
        if (document.getElementById(`open-edit${element.id}`) !== null) {
          openeditButtonActivate(element.id, projectName);
          openeditTitleActivate(element.id, projectName);
        }
      });
    }
  };

  const prioritybuttonActivate = (id, projectName) => {
    if (JSON.parse(localStorageManager.projectList.getItem(projectName)) !== null) {
      document.getElementById(`check${id}`).addEventListener('click', (evt) => {
        localStorageManager.CheckTask(projectName, id);
        cleanTasks();
        renderProjectTasks(projectName);
      });
    }
  };

  const renderProjectPriority = (projectName) => {
    if (JSON.parse(localStorageManager.projectList.getItem(projectName)) !== null) {
      JSON.parse(localStorageManager.projectList.getItem(projectName)).forEach((element) => {
        if (document.getElementById(`check${element.id}`) !== null) {
          prioritybuttonActivate(element.id, projectName);
        }
      });
    }
  };

  const renderProjectTasks = (projectName) => {
    if (JSON.parse(localStorageManager.projectList.getItem(projectName)) !== null) {
      JSON.parse(localStorageManager.projectList.getItem(projectName)).forEach((element) => {
        renderTask(element);
        renderProjectDelete(projectName);
        renderProjectPriority(projectName);
        renderProjectEdit(projectName);
      });
    }
  };

  const deletebuttonActivate = (id, projectName) => {
    if (JSON.parse(localStorageManager.projectList.getItem(projectName)) !== null) {
      document.getElementById(`${id}`).addEventListener('click', (evt) => {
        localStorageManager.deleteTask(projectName, evt.target.dataset.position);
        cleanTasks();
        renderProjectTasks(projectName);
      });
    }
  };


  const renderProjectDelete = (projectName) => {
    const parsedproject = JSON.parse(localStorageManager.projectList.getItem(projectName));

    if (parsedproject !== null) {
      JSON.parse(localStorageManager.projectList.getItem(projectName)).forEach((element) => {
        if (document.getElementById(`${element.id}`) !== null) {
          deletebuttonActivate(element.id, projectName);
        }
      });
    }
  };

  const renderLastProjectTask = (projectName) => {
    const myArray = JSON.parse(localStorageManager.projectList.getItem(projectName));
    const lastElement = myArray[myArray.length - 1];

    renderTask(lastElement);
    renderProjectDelete(projectName);
    renderProjectPriority(projectName);
  };

  const activateProjectbuttons = () => {
    document.querySelectorAll('.project').forEach((el) => {
      el.addEventListener('click', () => {
        currentProject = el.textContent;
        cleanTasks();
        renderProjectTasks(currentProject);
        document.querySelector('.currproj').classList.remove('currproj');
        el.classList.add('currproj');
      });
    });
  };

  const renderAllProjects = () => {
    const projectsCont = document.querySelector('.projectContainer');
    while (projectsCont.firstChild) {
      projectsCont.removeChild(projectsCont.firstChild);
    }
    localStorageManager.allProjects().forEach((el) => {
      const projectEl = document.createElement('div');
      projectEl.classList.add('project');
      projectEl.textContent = el;
      if (el === 'default') {
        projectEl.classList.add('currproj');
      }
      projectsCont.appendChild(projectEl);
      activateProjectbuttons();
    });
  };


  const startApp = () => {
    renderAllProjects();

    renderProjectTasks(currentProject);


    clearButton.addEventListener('click', () => {
      cleanTasks();
      localStorageManager.projectList.removeItem(currentProject);
      renderAllProjects();
    });


    activateProjectbuttons();


    document.querySelector('#input-task').addEventListener('keypress', (e) => {
      let priorityValue = 0;
      const key = e.which || e.keyCode;
      if (key === 13) {
        const radios = document.getElementsByName('priority');

        for (let i = 0, { length } = radios; i < length; i += 1) {
          if (radios[i].checked) {
            priorityValue = radios[i].value;

            break;
          }
        }


        const newDate = new Date(document.getElementById('myDate').value);

        const dueDate = `${newDate.getDate().toString()}-${(newDate.getMonth() + 1).toString()}-${newDate.getFullYear().toString()}`;
        const taskObj = toDo.createTodo(document.querySelector('#title-task').value, document.querySelector('#input-task').value, priorityValue, dueDate);
        localStorageManager.addTaskList(currentProject, taskObj);


        renderLastProjectTask(currentProject);
      }
    });

    document.querySelector('#sendtaskbutton').addEventListener('click', () => {
      let priorityValue = 0;

      const radios = document.getElementsByName('priority');

      for (let i = 0, { length } = radios; i < length; i += 1) {
        if (radios[i].checked) {
          priorityValue = radios[i].value;

          break;
        }
      }


      const newDate = new Date(document.getElementById('myDate').value);

      const dueDate = `${newDate.getDate().toString()}-${(newDate.getMonth() + 1).toString()}-${newDate.getFullYear().toString()}`;
      const taskObj = toDo.createTodo(document.querySelector('#title-task').value, document.querySelector('#input-task').value, priorityValue, dueDate);
      localStorageManager.addTaskList(currentProject, taskObj);


      renderLastProjectTask(currentProject);
    });

    document.querySelector('.projectTitle').addEventListener('keypress', (e) => {
      const key = e.which || e.keyCode;
      if (key === 13) {
        const proj = ProjectsManager.createProject(document.querySelector('.projectTitle').value);
        // function to create a project in the locat storage
        localStorageManager.addProjects(proj);
        renderAllProjects();
      }
    });

    document.querySelector('.projectsubmit').addEventListener('click', () => {
      const proj = ProjectsManager.createProject(document.querySelector('.projectTitle').value);
      // function to create a project in the locat storage
      localStorageManager.addProjects(proj);
      renderAllProjects();
    });


    document.querySelector('#input-task').focus();
  };


  return { startApp };
})();

export default domManager;
