import { getTodoData, deleteTodo, toggleCompletion, deleteProject } from "./todoData.js";
import { initEditTodoDialog } from "./dialog.js";
import { loadAllTask, loadTodayTask, loadThisWeekTask, loadThisMonthTask, loadSelectedProject } from "./loadTasks.js";
import { setCurrentProject, setCurrentPage, setCurrentTodo, getCurrentPage  } from "./state.js";

function loadProjectsList() {
  const projects = getTodoData();
  const projectBar = document.querySelector(".projects-ul");

  projectBar.innerHTML = "";

  projects.forEach((project) => {
    const projectList = document.createElement("li");
    // const projectName = document.createElement("p")
    const deleteProjButton = document.createElement("button")

    projectList.classList.add("project");
    projectList.id = project.id;

    // projectName.classList.add("project-name");
    projectList.textContent = project.name;

    deleteProjButton.classList.add("project-delete");
    deleteProjButton.textContent = "X"

    projectList.addEventListener("click", (event) => projectsListHandler(event, project))
    deleteProjButton.addEventListener("click", deleteProjectHandler)

    projectList.append(deleteProjButton)
    projectBar.appendChild(projectList);
  });
}

function projectsListHandler(e, project) {
  setCurrentProject(project.id);
  setCurrentPage("project")
  updateUI();
  refreshSelectedCategoryDisplay(e.target)
}

function deleteProjectHandler(event) {
  event.stopPropagation();
  deleteProject(event.target.parentElement.id);
  event.target.parentElement.remove();
}

function allTaskListener() {
  const allTaskBtn = document.querySelector("#all-task-btn");
  allTaskBtn.addEventListener("click", (e) => {
    setCurrentPage("alltask");
    updateUI();
    refreshSelectedCategoryDisplay(e.target)
  });
}

function todayTaskListener() {
  const todayTaskBtn = document.querySelector("#today-task-btn");
  todayTaskBtn.addEventListener("click", (e) => {
    setCurrentPage("todaytask");
    updateUI();
    refreshSelectedCategoryDisplay(e.target)
  });
}

function weekTaskListener() {
  const weekTaskBtn = document.querySelector("#week-task-btn");
  weekTaskBtn.addEventListener("click", (e) => {
    setCurrentPage("weektask");
    updateUI();
    refreshSelectedCategoryDisplay(e.target)
  });
}

function monthTaskListener() {
  const monthTaskBtn = document.querySelector("#month-task-btn");
  monthTaskBtn.addEventListener("click", (e) => {
    setCurrentPage("monthtask");
    updateUI();
    refreshSelectedCategoryDisplay(e.target)
  });
}

function loadTaskDom(task) {
  const tasksList = document.querySelector(".main-tasks");

  const taskItem = document.createElement("li");
  const taskDataContainer = document.createElement("div");
  const taskDetailsContainer = document.createElement("div");
  const taskOptionsContainer = document.createElement("div");

  const taskTitle = document.createElement("p");
  const taskDescription = document.createElement("p");
  const taskDate = document.createElement("p");
  const taskPriority = document.createElement("p");
  const editTask = document.createElement("button");
  const deleteTask = document.createElement("button");
  const checkbox = document.createElement("input");

  taskItem.className = "todo-item"
  taskItem.classList.add(checkCompleted(task.completed))
  taskDataContainer.className = "task-data";
  taskDetailsContainer.className = "task-details";
  taskOptionsContainer.className = "task-actions";

  taskTitle.className = "todo-title"
  taskDescription.className = "todo-desc"
  taskDate.className = "todo-date"
  taskPriority.className = "todo-priority" 
  taskPriority.classList.add(checkPriority(task.priority))

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  taskTitle.textContent = task.title;
  taskDescription.textContent = task.desc;

  editTask.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>`
  deleteTask.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`

  taskDate.textContent = `📅 Due: ${task.dueDate}`;
  taskPriority.textContent = task.priority;

  editTask.id = "edit-task-button";
  deleteTask.id = "delete-task-button";

  checkbox.addEventListener("change", () => {
    toggleCompletion(task);
    updateUI();
  });

  editTask.addEventListener("click", () => {
    initEditTodoDialog(task);
    // setCurrentProject(project.id)
    setCurrentTodo(task.id);
  });

  deleteTask.addEventListener("click", () => {
    deleteTodo(task);
    updateUI();
  });

  taskDataContainer.append(taskTitle, taskDescription);
  taskDetailsContainer.append(taskDate, taskPriority)
  taskOptionsContainer.append(checkbox, editTask, deleteTask);

  taskItem.append(taskDataContainer, taskDetailsContainer, taskOptionsContainer);
  tasksList.appendChild(taskItem);
}

function updateUI() {
  const currentPage = getCurrentPage();
  clearMainWindow();
  
  switch (currentPage) {
  case "alltask":
    loadAllTask();
    break;
  case "todaytask":
    loadTodayTask();
    break;
  case "weektask":
    loadThisWeekTask();
    break;
  case "monthtask":
    loadThisMonthTask();
    break;
  case "project":
    loadSelectedProject();
    break;
}
}

function checkPriority(priority) {
    switch (priority) {
  case "high":
    return "priority-high"
  case "medium":
    return "priority-medium"
  case "low":
    return "priority-low"
}}

function checkCompleted(taskStatus) {
  switch (taskStatus) {
  case true:
    return "completed"
  case false:
    return "pending"
}}

function loadNewAddedProject(projectId) {
  const lastLi = document.querySelector(".projects-ul li:last-child");

  setCurrentProject(projectId);
  setCurrentPage("project");
  loadSelectedProject();
  refreshSelectedCategoryDisplay(lastLi)
}

function initialAllTaskActiveClass() {
  const allTaskBtn = document.querySelector("#all-task-btn");
  refreshSelectedCategoryDisplay(allTaskBtn)
}

function refreshSelectedCategoryDisplay(element) {
  clearActiveClass();
  addActiveClass(element);
}

function addActiveClass(element) {
  element.classList.add("active");
}

function clearActiveClass() {
  const listItems = document.querySelectorAll("ul li.active");
  listItems.forEach(item => item.classList.remove("active"));
}

function changeHeaderName(name) {
  const projectName = document.querySelector(".header-left");
  projectName.textContent = name;
}

function showAddTaskButton() {
  const addTaskBtn = document.querySelector("#newTodoBtn");
  addTaskBtn.style.display = "inline";
}

function hideAddTaskButton() {
  const addTaskBtn = document.querySelector("#newTodoBtn");
  addTaskBtn.style.display = "none";
}

function clearMainWindow() {
  const tasksList = document.querySelector(".main-tasks");
  tasksList.innerHTML = "";
}

// function initialLoad() {
  
// }

function initProjectsDisplay() {
  loadProjectsList();
  allTaskListener();
  todayTaskListener();
  weekTaskListener();
  monthTaskListener();
  loadAllTask();
  initialAllTaskActiveClass();
  setCurrentPage("alltask");
}

export { initProjectsDisplay, loadProjectsList, clearMainWindow, changeHeaderName, loadTaskDom, updateUI, loadNewAddedProject };
