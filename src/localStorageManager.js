const localStorageManager = (() => {
  
  var counter = 0; 

  let projectList = window.localStorage;

  if(projectList.length === 0){
    projectList.setItem('main', JSON.stringify([]))
  }

  const addProjects  =  (name) => {
    projectList.setItem(name, []);
  };

  const resetcounter = () =>{
     counter = 0;
  }

  const addTaskList = (name, task) => {
    if(projectList.length === 0){
      projectList.setItem('main', JSON.stringify([]))
      task.id = 0;
      let arr = JSON.parse(projectList.getItem(name))
      arr.push(task)
      projectList.setItem('main', JSON.stringify(arr) )

    }else{
      let arr = JSON.parse(projectList.getItem(name))
      task.id = arr[arr.length-1].id + 1;
      arr.push(task)
      projectList.setItem('main', JSON.stringify(arr) )
    }

  };

  const deleteTask = (name, id) => {
    if(projectList.getItem(name) !== null){
      let arr = JSON.parse(projectList.getItem(name));
      arr[id].trash = true
      projectList.setItem(name, JSON.stringify(arr))
    }
  }


  const CheckTask = (name, id) => {
    if(projectList.getItem(name) !== null){
      var arr = JSON.parse(projectList.getItem(name));
    
      switch(arr[id].priority) {
        case 0:
          console.log("dentro1")
          arr[id].priority = 1
          projectList.setItem(name, JSON.stringify(arr))
          break;
        case 1:
          console.log("dentro2")
          arr[id].priority = 2
          projectList.setItem(name, JSON.stringify(arr))
          break;
        case 2:
          console.log("dentro3")
          arr[id].priority = 0
          projectList.setItem(name, JSON.stringify(arr))
          break;
      }

    }
  }

  return { projectList, addProjects, addTaskList, deleteTask, CheckTask, resetcounter};
})();


export default localStorageManager;