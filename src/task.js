/* eslint-env browser */
/* eslint no-unused-vars: [1, {"argsIgnorePattern": "evt"}] */

const ToDo = (() => {
  const createTodo = (title, description, priority = 0, duedate, trash = false) => ({
    title, description, priority, duedate, trash,
  });
  return { createTodo };
})();

export default ToDo;
