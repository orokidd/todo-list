import "./styles.css";
import { loadTask, loadSelectedTask } from "./loadTasks.js";
import { setCurrentProject } from "./state.js";
import { initAddProjectDialog, initAddTodoDialog, editEventListener } from "./dialog.js";
import { showAddTaskButton } from "./projects.js";


initAddProjectDialog();
editEventListener();