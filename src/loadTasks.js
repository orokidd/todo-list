import { getTodoData, deleteTodo, toggleCompletion } from "./todoData.js";
import { initEditTodoDialog } from "./dialog.js";
import { getCurrentProject } from "./state.js";
import { clearMainWindow, changeHeaderName, loadTaskDom } from "./interface.js";
import { isToday } from "date-fns";

function getSelectedProject() {
  const projects = getTodoData();
  const projectId = getCurrentProject();
  const selectedProject = projects.find((project) => project.id === projectId);

  return selectedProject || null;
}

function getAllTodos() {
  const projects = getTodoData()
  const allTodos = projects.flatMap(project => project.todos);

  return allTodos
}

function getTodayTodos() {
  const projects = getTodoData();
  // const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const todayTodos = projects.flatMap(project =>
    project.todos.filter(todo => isToday(todo.dueDate))
  );

  return todayTodos;
}

function getUpcomingTodos() {
  const projects = getTodoData();
  const today = new Date();

  const upcomingTodos = projects.flatMap(project =>
    project.todos.filter(todo => {
      const dueDate = new Date(todo.dueDate);
      return dueDate > today;
    })
  );

  return upcomingTodos;
}

function loadSelectedProject() {
  const selectedProject = getSelectedProject();
  clearMainWindow();
  changeHeaderName(selectedProject.name);

  selectedProject.todos.forEach((task) => {
    loadTaskDom(task);
  });
}

function loadAllTask() {
  clearMainWindow();
  changeHeaderName("All Tasks");

  const allTodos = getAllTodos();

  allTodos.forEach((task) => {
    loadTaskDom(task);
  });
}

function loadTodayTask() {
  clearMainWindow();
  changeHeaderName("Today Tasks");

  const todayTodos = getTodayTodos();

  todayTodos.forEach((task) => {
    loadTaskDom(task);
  });
}

function loadUpcomingTask() {
  clearMainWindow();
  changeHeaderName("Upcoming Tasks");

  const upcomingTodos = getUpcomingTodos();

  upcomingTodos.forEach((task) => {
    loadTaskDom(task);
  });
}

export {
  loadSelectedProject,
  loadAllTask,
  loadTodayTask,
  loadUpcomingTask,
  getTodayTodos,
  getUpcomingTodos,
};
