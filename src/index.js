import "./styles.css";
import { initAddProjectDialog, formSubmitEventListener } from "./dialog.js";
import { loadAllTask } from "./loadTasks.js";
import {
  showAddTaskButton,
  loadProjectsList,
  allTaskHandler,
  todayTaskHandler,
  upcomingTaskHandler,
  addTodoHandler,
  projectsListHandler,
} from "./interface.js";
import { setCurrentPage } from "./state.js";

const initApp = (() => {
  initAddProjectDialog();
  formSubmitEventListener();
  loadProjectsList();
  allTaskHandler();
  todayTaskHandler();
  upcomingTaskHandler();
  addTodoHandler();
  projectsListHandler();
  loadAllTask();
  setCurrentPage("alltask");
})();
