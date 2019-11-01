const localStorageManager = (() => {
  var counter = -1;
  let projectList = window.localStorage;

  if(projectList.length === 0){
    projectList.setItem('main', JSON.stringify([]))
  }

  const addProjects  =  (name) => {
    projectList.setItem(name, []);
  };

  const resetcounter = () =>{
     counter = -1;
  }

  const addTaskList = (name, task) => {
    if(projectList.length === 0){
      projectList.setItem('main', JSON.stringify([]))
    }
    counter += 1;
    task.id = counter;
    let arr = JSON.parse(projectList.getItem(name))
    arr.push(task)
    projectList.setItem('main', JSON.stringify(arr) )
  };

  const deleteTask = (name, id) => {
    if(projectList.getItem(name) !== null){
      let arr = JSON.parse(projectList.getItem(name))
      let i = 0;
      while(i < arr.length){
        if(arr[i].id == id){
          arr.splice(i, 1);
          break;
        }
        i += 1;
      }
      projectList.setItem(name, JSON.stringify(arr));
    }

  }

  return { projectList, addProjects, addTaskList, deleteTask, resetcounter};
})();


export default localStorageManager;