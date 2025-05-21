import "./styles.css";
import { loadTask, loadTaskDOM } from "./loadTasks.js";
import { setCurrentProject } from "./state.js";
import { initAddProjectDialog, initAddTodoDialog, editEventListener } from "./dialog.js";

const projects = document.querySelector(".projects-ul");
const addNewTodoBtn = document.querySelector("#newTodoBtn")

projects.addEventListener("click", (e) => {
  if (e.target.classList.contains("project")) {
    const projectId = e.target.id;
    const project = loadTask(projectId);
    loadTaskDOM(project);
    setCurrentProject(projectId);
  }
});

addNewTodoBtn.addEventListener('click', initAddTodoDialog)

initAddProjectDialog();
editEventListener();