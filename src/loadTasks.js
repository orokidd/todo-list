import getTodoData from "./todoData";

function loadTask(projectId) {
    const projects = getTodoData();
    const tasksList = document.querySelector(".main-tasks")
    const selectedProject = projects.find(project => project.id === projectId);
    return selectedProject || null;
} 

function loadTaskDOM(project) {
  const tasksList = document.querySelector(".main-tasks");
  tasksList.innerHTML = "";

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