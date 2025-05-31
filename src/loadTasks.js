import { getTodoData, deleteTodo, toggleCompletion } from "./todoData.js";
import { initEditTodoDialog } from "./dialog.js";
import { setCurrentTodo, getCurrentPage } from "./state.js";

function loadTask(projectId) {
  const projects = getTodoData();
  const selectedProject = projects.find((project) => project.id === projectId);
  return selectedProject || null;
}

function loadSelectedTask(project) {
  const tasksList = document.querySelector(".main-tasks");
  tasksList.innerHTML = "";

  const projectName = document.querySelector(".header-left");
  projectName.textContent = project.name;

  if (!project) {
    tasksList.textContent = "Project not found.";
    return;
  }

  project.todos.forEach((task) => {
    loadTaskDom(project, task, tasksList);
  });
}

function loadAllTask() {
  const tasksList = document.querySelector(".main-tasks");
  tasksList.innerHTML = "";

  const projectName = document.querySelector(".header-left");
  projectName.textContent = "All Tasks";

  const projects = getTodoData();

  projects.forEach((project) => {
    project.todos.forEach((task) => {
      loadTaskDom(project, task, tasksList);
    });
  });
}

function loadTodayTask() {
  const tasksList = document.querySelector(".main-tasks");
  tasksList.innerHTML = "";

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

      loadTaskDom(project, task, tasksList);
    });
  });
}

function loadUpcomingTask() {
  const tasksList = document.querySelector(".main-tasks");
  tasksList.innerHTML = "";

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

      loadTaskDom(project, task, tasksList);
    });
  });
}

function loadTaskDom(project, task, tasksListDom) {
  const taskItem = document.createElement("li");
  const taskTitle = document.createElement("h2");
  const taskDescription = document.createElement("p");
  const taskDate = document.createElement("p");
  const taskPriority = document.createElement("p");
  const editTask = document.createElement("button");
  const deleteTask = document.createElement("button");
  const checkbox = document.createElement("input");

  const taskDataContainer = document.createElement("div");
  const taskOptionsContainer = document.createElement("div");

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
    setCurrentTodo(task.id);
  });

  deleteTask.addEventListener("click", () => {
    deleteTodo(project.id, task.id);
    updateUI(project);
  });

  taskDataContainer.append(taskTitle, taskDescription, taskDate, taskPriority);

  taskOptionsContainer.append(checkbox, editTask, deleteTask);

  taskItem.append(taskDataContainer, taskOptionsContainer);
  tasksListDom.appendChild(taskItem);
}

function updateUI(currentProject) {
  const currentPage = getCurrentPage();
  const tasksList = document.querySelector(".main-tasks");

  tasksList.innerHTML = "";
  
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
