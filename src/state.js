let currentProjectId = null;
let currentTodoId = null;
let currentForm = null;
let currentPage = null;

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

function setCurrentPage(page) {
  currentPage = page;
  console.log(currentPage)
}

function getCurrentPage() {
  return currentPage;
}

export { setCurrentProject, getCurrentProject, setCurrentTodo, getCurrentTodo, setCurrentForm, getCurrentForm, setCurrentPage, getCurrentPage }