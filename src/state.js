let currentProjectId = null;
let currentTodoId = null;

function setCurrentProject(id) {
  currentProjectId = id;
  console.log(currentProjectId)
}

function getCurrentProject() {
  return currentProjectId;
}

function setCurrentTodo(id) {
  currentTodoId = id;
  console.log(currentTodoId)
}

function getCurrentTodo() {
  return currentTodoId;
}

export { setCurrentProject, getCurrentProject, setCurrentTodo, getCurrentTodo }