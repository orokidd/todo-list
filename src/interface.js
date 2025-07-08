import { getTodoData } from "./todoData.js";
import { loadAllTask, loadTodayTask, loadUpcomingTask, loadSelectedTask } from "./loadTasks.js";
import { setCurrentProject, setCurrentPage } from "./state.js";
import { initAddTodoDialog } from "./dialog.js";
import { projectsListHandler, allTaskHandler, todayTaskHandler, upcomingTaskHandler } from "./handler.js";

function loadProjectsList() {
  const projects = getTodoData();
  const projectBar = document.querySelector(".projects-ul");

  projectBar.innerHTML = "";

  projects.forEach((project) => {
    const projectList = document.createElement("li");
    projectList.classList.add("project");
    projectList.id = project.id;
    projectList.textContent = project.name;

    projectList.addEventListener("click", (event) => projectsListHandler(event, project))

    projectBar.appendChild(projectList);
  });
}

function addTodoListener() {
  const addNewTodoBtn = document.querySelector("#newTodoBtn");
  addNewTodoBtn.addEventListener("click", initAddTodoDialog);
}

function allTaskListener() {
  const allTaskBtn = document.querySelector("#all-task-btn");
  allTaskBtn.addEventListener("click", allTaskHandler);
}

function todayTaskListener() {
  const todayTaskBtn = document.querySelector("#today-task-btn");
  todayTaskBtn.addEventListener("click", todayTaskHandler);
}

function upcomingTaskListener() {
  const todayTaskBtn = document.querySelector("#upcoming-task-btn");
  todayTaskBtn.addEventListener("click", upcomingTaskHandler);
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

export { loadProjectsList, showAddTaskButton, allTaskListener, todayTaskListener, upcomingTaskListener, addTodoListener, clearMainWindow, hideAddTaskButton };
