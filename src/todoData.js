const todoData = [
    {
      id: "p1",
      name: "Personal",
      todos: [
        {
          id: "t1",
          title: "Buy groceries",
          desc: "Milk, eggs, bread",
          dueDate: "2025-05-20",
          priority: "High",        
          status: false,            
        },
        {
          id: "t2",
          title: "Call mom",
          desc: "",
          dueDate: "2025-05-21",
          priority: "Low",
          status: true,
        }
      ]
    },
    {
      id: "p2",
      name: "Work",
      todos: [
        {
          id: "t1",
          title: "Submit report",
          desc: "Q2 Financials",
          dueDate: "2025-05-22",
          priority: "Medium",
          status: false,
        }
      ]
    }
  ];

function getTodoData() {
  return todoData
}

function newProject(id, name) {
  todoData.push({ id, name, todos: []})
}

function deleteProject(projectId) {
  const index = todoData.findIndex(project => project.id === projectId);
  if (index !== -1) {
    todoData.splice(index, 1);
  }
}

function newTodo(projectId, todo) {
  const project = todoData.findIndex(project => project.id === projectId);
  todoData[project].todos.push(todo)
  console.log(todoData)
}

function deleteTodo(projectId, todoId) {
  const project = todoData.find(project => project.id === projectId);
  if (project) {
    const todoIndex = project.todos.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
      project.todos.splice(todoIndex, 1);
    }
  }
}

export { getTodoData, newProject, deleteProject, deleteTodo, newTodo };