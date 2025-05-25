import { getTodoData, deleteTodo } from "./todoData.js";
import { initEditTodoDialog } from "./dialog.js";
import { setCurrentTodo } from "./state.js";

function loadTask(projectId) {
  const projects = getTodoData();
  const selectedProject = projects.find((project) => project.id === projectId);
  return selectedProject || null;
}

function loadSelectedTask(project) {
  const tasksList = document.querySelector(".main-tasks");
  tasksList.innerHTML = "";

  const projectName = document.createElement("h1");
  projectName.textContent = project.name;
  tasksList.appendChild(projectName);

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

function loadTaskDom(project, task, tasksList) {
  const taskItem = document.createElement("li");
  const taskTitle = document.createElement("h2");
  const taskDescription = document.createElement("p");
  const taskDate = document.createElement("p");
  const taskPriority = document.createElement("p");
  const editTask = document.createElement("button");
  const deleteTask = document.createElement("button");

  const taskDataContainer = document.createElement("div");
  const taskOptionsContainer = document.createElement("div");

  taskDataContainer.className = "task-data";
  taskOptionsContainer.className = "task-actions";

  editTask.textContent = "Edit";
  deleteTask.textContent = "Delete";
  taskDescription.textContent = task.desc;
  taskTitle.textContent = task.title;
  taskDate.textContent = `Due: ${task.dueDate}`;
  taskPriority.textContent = task.priority;

  editTask.id = "edit-task-button";
  deleteTask.id = "delete-task-button";

  editTask.addEventListener("click", () => {
    initEditTodoDialog(project.id, task.id);
    setCurrentTodo(task.id);
  });

  deleteTask.addEventListener("click", () => {
    deleteTodo(project.id, task.id);
    loadAllTask();
  });

  taskDataContainer.append(taskTitle, taskDescription, taskDate, taskPriority);

  taskOptionsContainer.append(editTask, deleteTask);

  taskItem.append(taskDataContainer, taskOptionsContainer);
  tasksList.appendChild(taskItem);
}

export {
  loadTask,
  loadSelectedTask,
  loadAllTask,
  loadTodayTask,
  loadUpcomingTask,
};
