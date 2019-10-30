const ToDo = (() => {

    const createTodo = (description, status=false) => {
        return{description, status}
    }

   return{createTodo}

})();

export default ToDo
