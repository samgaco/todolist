/* eslint-env browser */
/* eslint no-unused-vars: [1, {"argsIgnorePattern": "evt"}] */

const ToDo = (() => {
  const createTodo = (description, priority = 0, duedate, trash = false) => ({
    description, priority, duedate, trash,
  });
  return { createTodo };
})();

export default ToDo;
