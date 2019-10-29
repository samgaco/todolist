const domManager = (() => {
  const content = document.querySelector('.content');
  const newProjectForm =  document.querySelector('.new-project-form');
  const newProjectIcon = document.createElement('button');
  
  const startApp = () => {
    newProjectIcon.classList.add('new-project');
    newProjectIcon.textContent = 'New Project';
    content.appendChild(newProjectForm);
    content.appendChild(newProjectIcon);
  }

  const openProjectform = ()  => {
    newProjectForm.style.display = 'block';
  }
  const newProject = () => {

  }

  return {startApp, openProjectform, newProject}
})();

export default domManager;
