import { getTodoData } from "./todoData.js";

function loadTask(projectId) {
    const projects = getTodoData();
    const selectedProject = projects.find(project => project.id === projectId);
    return selectedProject || null;
} 

function loadTaskDOM(project) {
  const tasksList = document.querySelector(".main-tasks");
  tasksList.innerHTML = "";

  const projectName = document.createElement("h1")
  projectName.textContent = project.name;
  tasksList.appendChild(projectName)

  if (!project) {
    tasksList.textContent = "Project not found.";
    return;
  }

  project.todos.forEach(task => {
    const taskItem = document.createElement("li");
    const taskTitle = document.createElement("h2")
    const taskDate = document.createElement("p")
    const taskPriority = document.createElement("p")

    taskTitle.textContent = task.title;
    taskDate.textContent = task.dueDate;
    taskPriority.textContent = task.priority;
    taskItem.append(taskTitle, taskDate, taskPriority)
    tasksList.appendChild(taskItem);
  });
}

export { loadTask, loadTaskDOM }