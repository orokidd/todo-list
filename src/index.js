import "./styles.css";
import { initAddProjectDialog, formSubmitEventListener } from "./dialog.js";
import {
  showAddTaskButton,
  loadProjectsList,
  allTaskHandler,
  todayTaskHandler,
  upcomingTaskHandler,
  addTodoHandler,
  projectsListHandler,
} from "./interface.js";

const initApp = (() => {
  initAddProjectDialog();
  formSubmitEventListener();
  loadProjectsList();
  allTaskHandler();
  todayTaskHandler();
  upcomingTaskHandler();
  addTodoHandler();
  projectsListHandler();
})();
