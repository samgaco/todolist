import domManager from './domManager';

domManager.startApp();

document.querySelector('.new-project').addEventListener('click', ()  => {
  domManager.openProjectform();
})
