import "./styles.css";
import { initDialogListeners } from "./dialog.js";
import { loadAllTask } from "./loadTasks.js";
import {
  showAddTaskButton,
  loadProjectsList,
  allTaskListener,
  todayTaskListener,
  upcomingTaskListener,
} from "./interface.js";
import { setCurrentPage } from "./state.js";

const initApp = (() => {
  initDialogListeners();
  loadProjectsList();
  allTaskListener();
  todayTaskListener();
  upcomingTaskListener();
  loadAllTask();
  setCurrentPage("alltask");
})();
