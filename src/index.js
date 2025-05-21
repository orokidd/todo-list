import "./styles.css";
import { loadTask, loadTaskDOM } from "./loadTasks.js";
import { setCurrentProject } from "./state.js";
import { initAddProjectDialog, editEventListener } from "./dialog.js";

const projects = document.querySelector(".projects-ul");

projects.addEventListener("click", (e) => {
  if (e.target.classList.contains("project")) {
    const projectId = e.target.id;
    const project = loadTask(projectId);
    loadTaskDOM(project);
    setCurrentProject(projectId);
  }
});


// initAddTodoDialog();
initAddProjectDialog();
editEventListener();