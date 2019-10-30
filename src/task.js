const ToDo = () => {

    const createTodo = (title, description, dueDate, priority, notes, id) => {
        return{title,description,dueDate,priority,notes, id}
    }

   return{createTodo}

}
