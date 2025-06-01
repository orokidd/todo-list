import { getTodoData } from "./todoData.js";
import {
  loadAllTask,
  loadTodayTask,
  loadUpcomingTask,
  loadTask,
  loadSelectedTask,
} from "./loadTasks.js";
import { setCurrentProject, setCurrentPage, getCurrentPage } from "./state.js";
import {
  initAddProjectDialog,
  initAddTodoDialog,
  formSubmitEventListener,
} from "./dialog.js";

function loadProjectsList() {
  const projects = getTodoData();
  const projectBar = document.querySelector(".projects-ul");

  projectBar.innerHTML = "";

  projects.forEach((element) => {
    const projectList = document.createElement("li");
    projectList.classList.add("project");
    projectList.id = element.id;
    projectList.textContent = element.name;

    projectBar.appendChild(projectList);
  });
}

function projectsListHandler() {
  const projects = document.querySelector(".projects-ul");
  projects.addEventListener("click", (e) => {
    if (e.target.classList.contains("project")) {
      const projectId = e.target.id;
      const project = loadTask(projectId);
      loadSelectedTask(project);
      setCurrentProject(projectId);
      setCurrentPage("project")
      showAddTaskButton();
    }
  });
}

function addTodoHandler() {
  const addNewTodoBtn = document.querySelector("#newTodoBtn");
  addNewTodoBtn.addEventListener("click", initAddTodoDialog);
}

function allTaskHandler() {
  const allTaskBtn = document.querySelector("#all-task-btn");

  allTaskBtn.addEventListener("click", () => {
    loadAllTask();
    setCurrentPage("alltask")
    hideAddTaskButton();
  });
}

function todayTaskHandler() {
  const todayTaskBtn = document.querySelector("#today-task-btn");

  todayTaskBtn.addEventListener("click", () => {
    loadTodayTask();
    setCurrentPage("todaytask")
    hideAddTaskButton();
  });
}

function upcomingTaskHandler() {
  const todayTaskBtn = document.querySelector("#upcoming-task-btn");

  todayTaskBtn.addEventListener("click", () => {
    loadUpcomingTask();
    setCurrentPage("upcomingtask")
    hideAddTaskButton();
  });
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

export { loadProjectsList, showAddTaskButton, allTaskHandler, todayTaskHandler, upcomingTaskHandler, addTodoHandler, projectsListHandler, clearMainWindow };
