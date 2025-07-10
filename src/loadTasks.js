import { getTodoData, deleteTodo, toggleCompletion } from "./todoData.js";
import { initEditTodoDialog } from "./dialog.js";
import { setCurrentProject, setCurrentTodo, getCurrentPage, getCurrentProject } from "./state.js";
import { clearMainWindow, changeHeaderName } from "./interface.js";

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
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const todayTodos = projects.flatMap(project =>
    project.todos.filter(todo => todo.dueDate === today)
  );

  return todayTodos;
}

function getUpcomingTodos() {
  const projects = getTodoData();
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

  const upcomingTodos = projects.flatMap(project =>
    project.todos.filter(todo => {
      const dueDate = new Date(todo.dueDate);
      dueDate.setHours(0, 0, 0, 0); // Normalize time
      todo.dueDate > today;
    })
  );

  return upcomingTodos
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

function loadTaskDom(task) {
  const tasksList = document.querySelector(".main-tasks");

  const taskItem = document.createElement("li");
  const taskDataContainer = document.createElement("div");
  const taskOptionsContainer = document.createElement("div");

  const taskTitle = document.createElement("h2");
  const taskDescription = document.createElement("p");
  const taskDate = document.createElement("p");
  const taskPriority = document.createElement("p");
  const editTask = document.createElement("button");
  const deleteTask = document.createElement("button");
  const checkbox = document.createElement("input");

  taskDataContainer.className = "task-data";
  taskOptionsContainer.className = "task-actions";

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  editTask.textContent = "Edit";
  deleteTask.textContent = "Delete";
  taskDescription.textContent = task.desc;
  taskTitle.textContent = task.title;
  taskDate.textContent = `Due: ${task.dueDate}`;
  taskPriority.textContent = task.priority;

  taskTitle.style.textDecoration = task.completed ? "line-through" : "none";

  editTask.id = "edit-task-button";
  deleteTask.id = "delete-task-button";

  checkbox.addEventListener("change", () => {
    toggleCompletion(task);
    updateUI();
  });

  editTask.addEventListener("click", () => {
    initEditTodoDialog(task);
    // setCurrentProject(project.id)
    setCurrentTodo(task.id);
  });

  deleteTask.addEventListener("click", () => {
    deleteTodo(task);
    updateUI();
  });

  taskDataContainer.append(taskTitle, taskDescription, taskDate, taskPriority);
  taskOptionsContainer.append(checkbox, editTask, deleteTask);

  taskItem.append(taskDataContainer, taskOptionsContainer);
  tasksList.appendChild(taskItem);
}

function updateUI() {
  const currentPage = getCurrentPage();
  clearMainWindow();
  
  switch (currentPage) {
  case "alltask":
    loadAllTask();
    break;
  case "todaytask":
    loadTodayTask();
    break;
  case "upcomingtask":
    loadUpcomingTask();
    break;
  case "project":
    loadSelectedProject();
    break;
}
}

export {
  loadSelectedProject,
  loadAllTask,
  loadTodayTask,
  loadUpcomingTask,
  getTodayTodos,
  getUpcomingTodos,
  updateUI
};
