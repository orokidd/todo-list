import { getTodoData } from "./todoData";
import { loadAllTask } from "./loadTasks";

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

  allTaskBtn.addEventListener("click", loadAllTask);
}

projectSideBar();
sideAllTask();

export { projectSideBar };
