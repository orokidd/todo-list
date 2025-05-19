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
          priority: "High",         // Low, Medium, High
          status: false,            // false = not done
          createdAt: "2025-05-18",
          completedAt: null
        },
        {
          id: "t2",
          title: "Call mom",
          desc: "",
          dueDate: "2025-05-21",
          priority: "Low",
          status: true,
          createdAt: "2025-05-18",
          completedAt: "2025-05-18"
        }
      ]
    },
    {
      id: "p2",
      name: "Work",
      todos: [
        {
          id: "t3",
          title: "Submit report",
          desc: "Q2 Financials",
          dueDate: "2025-05-22",
          priority: "Medium",
          status: false,
          createdAt: "2025-05-19",
          completedAt: null
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

function deleteTodo(projectId, todoId) {
  const project = todoData.find(project => project.id === projectId);
  if (project) {
    const todoIndex = project.todos.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
      project.todos.splice(todoIndex, 1);
    }
  }
}

export { getTodoData, newProject, deleteProject, deleteTodo };