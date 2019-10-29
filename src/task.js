const ToDo = () => {

    const createTodo = (title, description, dueDate, priority, notes) => {
        return{title,description,dueDate,priority,notes}
    }

   return{createTodo}

}
