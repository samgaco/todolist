const localStorageManager = (() => {
  let counter = 2;
  let projectList = window.localStorage;

  if(projectList.length === 0){
    projectList.setItem('main', JSON.stringify([]))
  }

  const addProjects  =  (name) => {
    projectList.setItem(name, []);
  };

  const addTaskList = (name, task) => {
    if(projectList.length === 0){
      projectList.setItem('main', JSON.stringify([]))
    }
    counter += 1;
    task.id = counter;
    let arr = JSON.parse(projectList.getItem('main'))
    arr.push(task)
    projectList.setItem('main', JSON.stringify(arr) )
  };

  return { projectList, addProjects, addTaskList};
})();


export default localStorageManager;
