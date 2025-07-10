import { getTodoData, deleteTodo, toggleCompletion } from "./todoData.js";
import { initEditTodoDialog } from "./dialog.js";
import { loadAllTask, loadTodayTask, loadUpcomingTask, loadSelectedProject } from "./loadTasks.js";
import { setCurrentProject, setCurrentPage, setCurrentTodo, getCurrentPage,  } from "./state.js";

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

function projectsListHandler(e, project) {
    if (e.target.classList.contains("project")) {
      setCurrentProject(project.id);
      setCurrentPage("project")
      loadSelectedProject();
      showAddTaskButton();
    }}

function allTaskListener() {
  const allTaskBtn = document.querySelector("#all-task-btn");
  allTaskBtn.addEventListener("click", () => {
    loadAllTask();
    setCurrentPage("alltask");
    hideAddTaskButton();
  });
}

function todayTaskListener() {
  const todayTaskBtn = document.querySelector("#today-task-btn");
  todayTaskBtn.addEventListener("click", () => {
    loadTodayTask();
    setCurrentPage("todaytask");
    hideAddTaskButton();
  });
}

function upcomingTaskListener() {
  const todayTaskBtn = document.querySelector("#upcoming-task-btn");
  todayTaskBtn.addEventListener("click", () => {
    loadUpcomingTask();
    setCurrentPage("upcomingtask")
    hideAddTaskButton();
  });
}

function loadTaskDom(task) {
  const tasksList = document.querySelector(".main-tasks");

  const taskItem = document.createElement("li");
  const taskDataContainer = document.createElement("div");
  const taskOptionsContainer = document.createElement("div");

  const taskTitle = document.createElement("h2");
  const taskDescription = document.createElement("p");
  const taskDate = document.createElement("p");
  const taskPriority = document.createElement("p");
  const editTask = document.createElement("button");
  const deleteTask = document.createElement("button");
  const checkbox = document.createElement("input");

  taskDataContainer.className = "task-data";
  taskOptionsContainer.className = "task-actions";

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  editTask.textContent = "Edit";
  deleteTask.textContent = "Delete";
  taskDescription.textContent = task.desc;
  taskTitle.textContent = task.title;
  taskDate.textContent = `Due: ${task.dueDate}`;
  taskPriority.textContent = task.priority;

  taskTitle.style.textDecoration = task.completed ? "line-through" : "none";

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

  taskDataContainer.append(taskTitle, taskDescription, taskDate, taskPriority);
  taskOptionsContainer.append(checkbox, editTask, deleteTask);

  taskItem.append(taskDataContainer, taskOptionsContainer);
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
  case "upcomingtask":
    loadUpcomingTask();
    break;
  case "project":
    loadSelectedProject();
    break;
}
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

export { loadProjectsList, showAddTaskButton, allTaskListener, todayTaskListener, upcomingTaskListener, clearMainWindow, hideAddTaskButton, changeHeaderName, loadTaskDom, updateUI };
