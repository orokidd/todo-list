import "./styles.css";
import { initAddProjectDialog, formSubmitEventListener } from "./dialog.js";
import { loadAllTask } from "./loadTasks.js";
import {
  showAddTaskButton,
  loadProjectsList,
  allTaskListener,
  todayTaskListener,
  upcomingTaskListener,
  addTodoListener,
} from "./interface.js";
import { setCurrentPage } from "./state.js";

const initApp = (() => {
  initAddProjectDialog();
  formSubmitEventListener();
  loadProjectsList();
  allTaskListener();
  todayTaskListener();
  upcomingTaskListener();
  addTodoListener();
  loadAllTask();
  setCurrentPage("alltask");
})();
