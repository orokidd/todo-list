import { getTodoData } from "./todoData.js";
import { loadAllTask, loadTodayTask, loadUpcomingTask, loadSelectedTask } from "./loadTasks.js";
import { setCurrentProject, setCurrentPage } from "./state.js";
import { initAddTodoDialog } from "./dialog.js";
import { showAddTaskButton, hideAddTaskButton } from "./interface.js";

function projectsListHandler(e, project) {
    if (e.target.classList.contains("project")) {
      setCurrentProject(project.id);
      setCurrentPage("project")
      loadSelectedTask();
      showAddTaskButton();
    }}

function allTaskHandler() {
    loadAllTask();
    setCurrentPage("alltask");
    hideAddTaskButton();
}

function todayTaskHandler() {
    loadTodayTask();
    setCurrentPage("todaytask");
    hideAddTaskButton();
}

function upcomingTaskHandler() {
    loadUpcomingTask();
    setCurrentPage("upcomingtask")
    hideAddTaskButton();
}

export { projectsListHandler, allTaskHandler, todayTaskHandler, upcomingTaskHandler }