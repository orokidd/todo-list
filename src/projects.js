import { getTodoData } from "./todoData";
import { loadAllTask, loadTodayTask } from "./loadTasks";

function projectSideBar() {
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

function sideAllTask() {
  const allTaskBtn = document.querySelector("#all-task-btn");

  allTaskBtn.addEventListener("click", () => {
    loadAllTask();
    hideAddTaskButton();
  });
}

function sideTodayTask() {
  const todayTaskBtn = document.querySelector("#today-task-btn");

  todayTaskBtn.addEventListener("click", () => {
    loadTodayTask();
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

projectSideBar();
sideAllTask();
sideTodayTask();

export { projectSideBar, showAddTaskButton };
