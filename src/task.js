const ToDo = () => {

    const createCheckList = (...arg) => {
        //create checklist
    }

    const createTodo = (title, description, dueDate, priority, notes, checkList) => {
        return{title,description,dueDate,priority,notes,checkList}
    }

   return{createTodo}

}


