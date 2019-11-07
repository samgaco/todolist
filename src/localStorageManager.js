const localStorageManager = (() => {

  let projectList = window.localStorage;

  if(projectList.length === 0){
    projectList.setItem('main', JSON.stringify([]))
  }

  const addProjects  =  (name) => {
    projectList.setItem(name, JSON.stringify([]));
  };

  const addTaskList = (name, task) => {
  console.log("addtasklist beggining: ", JSON.parse(projectList.getItem(name)), "cic" )
    if(projectList.getItem(name) === null || JSON.parse(projectList.getItem(name)).length == 0){
      projectList.setItem(name, JSON.stringify([]))
      task.id = 0;
      let arr = JSON.parse(projectList.getItem(name))
      arr.push(task)
      projectList.setItem(name, JSON.stringify(arr) )

    }else{
      console.log(projectList[name].length)
      let arr = JSON.parse(projectList.getItem(name))
      console.log(arr)
      task.id = arr[arr.length-1].id + 1;
      arr.push(task)
      projectList.setItem(name, JSON.stringify(arr) )
    }

  };

  const editTask = (project, id, modifiedtext) => {

    arr = JSON.parse(projectList.getItem(project))
    arr.find(element=> element.id === id).description = modifiedtext
    console.log("good?",arr)
    projectList.setItem(project, JSON.stringify(arr) )
    

  }

  const deleteTask = (name, id) => {
    if(projectList.getItem(name) !== null){
      let arr = JSON.parse(projectList.getItem(name));
      arr[id].trash = true
      projectList.setItem(name, JSON.stringify(arr))
    }
  }


  const CheckTask = (name, id) => {
    if(projectList.getItem(name) !== null){
      let arr = JSON.parse(projectList.getItem(name));
      console.log(arr[id])
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
        default:
          console.log("dentro4")
          arr[id].priority = 2
          projectList.setItem(name, JSON.stringify(arr))

      }

    }
  }


  const allProjects = () => {
    let projects = []
    let i = 0;
    while (projectList.key(i) !== null){
      projects.push(projectList.key(i));
      i += 1;
    }
    return projects;
  }

  return { projectList, addProjects, addTaskList, editTask,  deleteTask, CheckTask, allProjects};
})();


export default localStorageManager;
