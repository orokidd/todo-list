const STORAGE_KEY = "todoData";

let todoData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoData));
}

function getTodoData() {
  return todoData;
}

function newProject(id, name) {
  todoData.push({ id, name, todos: [] });
  saveToStorage();
}

function deleteProject(projectId) {
  const index = todoData.findIndex((project) => project.id === projectId);
  todoData.splice(index, 1);
  saveToStorage();
}

function newTodo(projectId, todo) {
  const selectedProject = todoData.find((project) => project.id === projectId);
  selectedProject.todos.push(todo);
  saveToStorage();
}

function editTodo(oldTodoId, updatedTodo) {
  for (const project of todoData) {
    const index = project.todos.findIndex(todo => todo.id === oldTodoId);
    if (index !== -1) {
      project.todos[index] = updatedTodo;
    }
  }
  saveToStorage();
}

function deleteTodo(selectedTodo) {
  for (const project of todoData) {
    const index = project.todos.findIndex(todo => todo.id === selectedTodo.id);
    if (index !== -1) { // to avoid splice(-1, 1) when no match was found, which removes the last todo
      project.todos.splice(index, 1);
    }
  }
  saveToStorage();
}

function toggleCompletion(todo) {
  todo.completed = !todo.completed;
  saveToStorage();
}

export {
  getTodoData,
  newProject,
  deleteProject,
  deleteTodo,
  newTodo,
  editTodo,
  toggleCompletion,
};
