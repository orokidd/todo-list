import "./styles.css";
import { initAddProjectDialog, editEventListener } from "./dialog.js";
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
  editEventListener();
  loadProjectsList();
  allTaskHandler();
  todayTaskHandler();
  upcomingTaskHandler();
  addTodoHandler();
  projectsListHandler();
})();
