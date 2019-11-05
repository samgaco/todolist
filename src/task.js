const ToDo = (() => {

    const createTodo = (description, priority=0, trash=false) => {
        return{description, priority, trash}
    }
   return{createTodo}

})();

export default ToDo