const ToDo = (() => {

    const createTodo = (description, status=false, trash=false) => {
        return{description, status, trash}
    }
   return{createTodo}

})();

export default ToDo