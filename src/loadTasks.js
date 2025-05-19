import getTodoData from "./todoData";

function loadTask(projectId) {
    const projects = getTodoData();
    const tasksList = document.querySelector(".main-tasks")
    const selectedProject = projects.find(project => project.id === projectId);
    
    tasksList.innerHTML = "";
    
  if (!selectedProject) {
    tasksList.textContent = "Project not found.";
    return;
  }

    selectedProject.todos.forEach(task => {
    const taskItem = document.createElement("li");
    taskItem.textContent = task.title; // You can add more task details here
    tasksList.appendChild(taskItem);
  });
} 

export { loadTask }