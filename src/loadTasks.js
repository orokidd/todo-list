import { getTodoData, deleteTodo } from "./todoData.js";
import { initEditTodoDialog } from "./dialog.js";
import { setCurrentTodo } from "./state.js";

function loadTask(projectId) {
  const projects = getTodoData();
  const selectedProject = projects.find((project) => project.id === projectId);
  return selectedProject || null;
}

function loadTaskDOM(project) {
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
    const taskItem = document.createElement("li");
    const taskTitle = document.createElement("h2");
    const taskDescription = document.createElement("p");
    const taskDate = document.createElement("p");
    const taskPriority = document.createElement("p");
    const editTask = document.createElement("button");
    const deleteTask = document.createElement("button");

    const taskDataContainer = document.createElement("div");
    const taskOptionsContainer = document.createElement("div");

    taskDataContainer.className = ("task-data")
    taskOptionsContainer.className = ("task-actions")

    editTask.textContent = "Edit";
    deleteTask.textContent = "Delete";
    taskDescription.textContent = task.desc;
    taskTitle.textContent = task.title;
    taskDate.textContent = task.dueDate;
    taskPriority.textContent = task.priority;

    editTask.id = "edit-task-button";
    deleteTask.id = "delete-task-button";

    editTask.addEventListener("click", () => {
      initEditTodoDialog(project.id, task.id);
      setCurrentTodo(task.id);
      // loadTaskDOM(project);
    });

    deleteTask.addEventListener("click", () => {
      deleteTodo(project.id, task.id);
      loadTaskDOM(project);
    });

    taskDataContainer.append(
      taskTitle,
      taskDescription,
      taskDate,
      taskPriority
    );

    taskOptionsContainer.append(editTask, deleteTask);

    taskItem.append(taskDataContainer, taskOptionsContainer);
    tasksList.appendChild(taskItem);
  });
}

function showAddTaskButton() {
  const addTaskBtn = document.querySelector("#newTodoBtn")
  addTaskBtn.style.display = 'inline';
}

export { loadTask, loadTaskDOM, showAddTaskButton };
