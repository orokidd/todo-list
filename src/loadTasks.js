import { getTodoData, deleteTodo } from "./todoData.js";

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

  project.todos.forEach((task) => {
    const taskItem = document.createElement("li");
    const taskTitle = document.createElement("h2")
    const taskDescription = document.createElement("p")
    const taskDate = document.createElement("p")
    const taskPriority = document.createElement("p")
    const editTask = document.createElement("button")
    const deleteTask = document.createElement("button")

    editTask.textContent = "Edit";
    deleteTask.textContent = "Delete";
    taskDescription.textContent = task.desc
    taskTitle.textContent = task.title;
    taskDate.textContent = task.dueDate;
    taskPriority.textContent = task.priority;

    deleteTask.addEventListener('click', ()=> {
      deleteTodo(project.id, task.id);
      loadTaskDOM(project)
    })
      
    taskItem.append(taskTitle, taskDescription, taskDate, taskPriority, editTask, deleteTask)
    tasksList.appendChild(taskItem);
  });
}

export { loadTask, loadTaskDOM }