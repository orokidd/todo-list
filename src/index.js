import "./styles.css";
import { projectSideBar } from "./projects.js";
import { loadTask, loadTaskDOM } from "./loadTasks.js";
import { newProject, getTodoData } from "./todoData.js";

const projects = document.querySelector(".projects-ul");
const dialog = document.getElementById("newProjectDialog");
const showBtn = document.getElementById("newProjectBtn");
const closeBtn = document.getElementById("closeProjectBtn");

projects.addEventListener("click", (e) => {
  if (e.target.classList.contains("project")) {
    const task = loadTask(e.target.id);
    loadTaskDOM(task);
  }
});

showBtn.addEventListener("click", () => {
  dialog.showModal(); // Use .show() if you don't want it to be modal
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});


const projectSubmitBtn = document.querySelector("#projectSubmitBtn")

projectSubmitBtn.addEventListener("click", ()=> {
    const projectInput = document.querySelector("#projectName")
    const projectName = projectInput.value

    newProject("p3", projectName)
    projectSideBar();
    console.log(getTodoData())
})