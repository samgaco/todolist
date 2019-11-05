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
      let arr = JSON.parse(projectList.getItem(name));
      console.log("arr", arr)
      console.log("arr find",arr[id].trash )
      arr[id].trash = true
      projectList.setItem(name, JSON.stringify(arr))
    }
  }

  return { projectList, addProjects, addTaskList, deleteTask, resetcounter};
})();


export default localStorageManager;