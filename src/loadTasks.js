import { getTodoData, deleteTodo, toggleCompletion } from "./todoData.js";
import { initEditTodoDialog } from "./dialog.js";
import { setCurrentProject, setCurrentTodo, getCurrentPage } from "./state.js";
import { clearMainWindow } from "./interface.js";

function loadTask(projectId) {
  const projects = getTodoData();
  const selectedProject = projects.find((project) => project.id === projectId);
  return selectedProject || null;
}

function loadSelectedTask(project) {
  clearMainWindow();

  const projectName = document.querySelector(".header-left");
  projectName.textContent = project.name;

  if (!project) {
    tasksList.textContent = "Project not found.";
    return;
  }

  project.todos.forEach((task) => {
    loadTaskDom(project, task);
  });
}

function loadAllTask() {
  clearMainWindow();

  const projectName = document.querySelector(".header-left");
  projectName.textContent = "All Tasks";

  const projects = getTodoData();

  projects.forEach((project) => {
    project.todos.forEach((task) => {
      loadTaskDom(project, task);
    });
  });
}

function loadTodayTask() {
  clearMainWindow();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const projectName = document.querySelector(".header-left");
  projectName.textContent = "Today Tasks";

  const projects = getTodoData();

  projects.forEach((project) => {
    project.todos.forEach((task) => {
      const taskDueDate = new Date(task.dueDate);
      taskDueDate.setHours(0, 0, 0, 0);
      if (taskDueDate.getTime() !== today.getTime()) return;

      loadTaskDom(project, task);
    });
  });
}

function loadUpcomingTask() {
  clearMainWindow();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const projectName = document.querySelector(".header-left");
  projectName.textContent = "Upcoming Tasks";

  const projects = getTodoData();

  projects.forEach((project) => {
    project.todos.forEach((task) => {
      const taskDueDate = new Date(task.dueDate);
      taskDueDate.setHours(0, 0, 0, 0);
      if (taskDueDate.getTime() === today.getTime()) return;

      loadTaskDom(project, task);
    });
  });
}

function loadTaskDom(project, task) {
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
    toggleCompletion(project.id, task.id);
    updateUI(project);
  });

  editTask.addEventListener("click", () => {
    initEditTodoDialog(project.id, task.id);
    setCurrentProject(project.id)
    setCurrentTodo(task.id);
  });

  deleteTask.addEventListener("click", () => {
    deleteTodo(project.id, task.id);
    updateUI(project);
  });

  taskDataContainer.append(taskTitle, taskDescription, taskDate, taskPriority);
  taskOptionsContainer.append(checkbox, editTask, deleteTask);

  taskItem.append(taskDataContainer, taskOptionsContainer);
  tasksList.appendChild(taskItem);
}

function updateUI(currentProject) {
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
    loadSelectedTask(currentProject);
    break;
}
}

export {
  loadTask,
  loadSelectedTask,
  loadAllTask,
  loadTodayTask,
  loadUpcomingTask,
};
