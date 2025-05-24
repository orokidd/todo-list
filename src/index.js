import "./styles.css";
import { loadTask, loadSelectedTask } from "./loadTasks.js";
import { setCurrentProject } from "./state.js";
import { initAddProjectDialog, initAddTodoDialog, editEventListener } from "./dialog.js";
import { showAddTaskButton } from "./projects.js";

const projects = document.querySelector(".projects-ul");
const addNewTodoBtn = document.querySelector("#newTodoBtn")

projects.addEventListener("click", (e) => {
  if (e.target.classList.contains("project")) {
    const projectId = e.target.id;
    const project = loadTask(projectId);
    loadSelectedTask(project);
    setCurrentProject(projectId);
    showAddTaskButton()
  }
});

addNewTodoBtn.addEventListener('click', initAddTodoDialog)

initAddProjectDialog();
editEventListener();