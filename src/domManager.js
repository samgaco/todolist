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
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter

        taskList.appendChild(newTask)

      }
    })
    
  }

 
  const newProject = () => {
      // Will render new project views
  }

  return {startApp, newProject}
})();

export default domManager;
