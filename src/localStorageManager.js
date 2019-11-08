/* eslint-env browser */
/* eslint no-unused-vars: [1, {"argsIgnorePattern": "evt"}] */

const localStorageManager = (() => {
  const projectList = window.localStorage;

  if (projectList.length === 0) {
    projectList.setItem('default', JSON.stringify([]));
  }

  const addProjects = (name) => {
    projectList.setItem(name, JSON.stringify([]));
  };

  const addTaskList = (name, task) => {
    if (projectList.getItem(name) === null || JSON.parse(projectList.getItem(name)).length === 0) {
      projectList.setItem(name, JSON.stringify([]));
      task.id = 0;
      const arr = JSON.parse(projectList.getItem(name));
      arr.push(task);
      projectList.setItem(name, JSON.stringify(arr));
    } else {
      const arr = JSON.parse(projectList.getItem(name));
      task.id = arr[arr.length - 1].id + 1;
      arr.push(task);
      projectList.setItem(name, JSON.stringify(arr));
    }
  };

  const editTask = (project, id, modifiedtext) => {
    const arr = JSON.parse(projectList.getItem(project));
    arr.find(element => element.id === id).description = modifiedtext;
    projectList.setItem(project, JSON.stringify(arr));
  };

  const editTitle = (project, id, modifiedtext) => {
    const arr = JSON.parse(projectList.getItem(project));
    arr.find(element => element.id === id).title = modifiedtext;
    projectList.setItem(project, JSON.stringify(arr));
  };

  const editDate = (project, id, date) => {
    const arr = JSON.parse(projectList.getItem(project));
    arr.find(element => element.id === id).duedate = date;
    projectList.setItem(project, JSON.stringify(arr));
  };

  const deleteTask = (name, id) => {
    if (projectList.getItem(name) !== null) {
      const arr = JSON.parse(projectList.getItem(name));
      arr[id].trash = true;
      projectList.setItem(name, JSON.stringify(arr));
    }
  };


  const CheckTask = (name, id) => {
    if (projectList.getItem(name) !== null) {
      const arr = JSON.parse(projectList.getItem(name));
      switch (arr[id].priority) {
        case 0:
          arr[id].priority = 1;
          projectList.setItem(name, JSON.stringify(arr));
          break;
        case 1:
          arr[id].priority = 2;
          projectList.setItem(name, JSON.stringify(arr));
          break;
        case 2:
          arr[id].priority = 0;
          projectList.setItem(name, JSON.stringify(arr));
          break;
        default:
          arr[id].priority = 2;
          projectList.setItem(name, JSON.stringify(arr));
      }
    }
  };


  const allProjects = () => {
    const projects = [];
    let i = 0;
    while (projectList.key(i) !== null) {
      projects.push(projectList.key(i));
      i += 1;
    }
    return projects;
  };

  return {
    projectList, addProjects, addTaskList, editTask, editTitle, deleteTask, CheckTask, allProjects, editTitle,
    editDate,
    };
})();


export default localStorageManager;
