const localStorageManager = (() => {
  let counter = 2;
  let projectList = window.localStorage;

  console.log(projectList);

  let mainList = [
    {
      description: "Do a couple of code reviews",
      status: false,
      id: 0
    },
    {
      description: "Finish up with the current project",
      status: false,
      id: 1
    },
    {
      description: "Work on a bunch of coding challenges",
      status: false,
      id: 2
    }
  ]

  projectList.setItem('Main', JSON.stringify(mainList));

  const addProjects  =  (name) => {
    projectList.setItem(name, []);
  };

  const addTaskList = (name, task) => {
    counter += 1;
    task.id = counter;
    let arr = JSON.parse(projectList[name]);
    arr.push(task);
    projectList[name] = JSON.stringify(arr);
    return projectList[name];
  };

  return {projectList, addProjects, addTaskList};
})();


export default localStorageManager;
