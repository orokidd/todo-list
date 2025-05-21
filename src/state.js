let currentProjectId = null;
let currentTodoId = null;
let currentForm = null;

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

function setCurrentForm(mode) {
  currentForm = mode;
  console.log(currentTodoId)
}

function getCurrentForm() {
  return currentForm;
}

export { setCurrentProject, getCurrentProject, setCurrentTodo, getCurrentTodo, setCurrentForm, getCurrentForm }