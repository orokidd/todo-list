import { getCurrentProject, setCurrentProject, getCurrentTodo, setCurrentForm, getCurrentForm, setCurrentPage } from "./state.js";
import { newProject, newTodo, getTodoData, editTodo } from "./todoData.js";
import { loadProjectsList, updateUI, loadNewAddedProject } from "./interface.js";

function addProjectDialog() {
  const addProjectBtn = document.getElementById("newProjectBtn");
  const closeBtn = document.getElementById("closeProjectBtn");

  addProjectBtn.addEventListener("click", () => {
    const dialog = document.getElementById("newProjectDialog");
    dialog.showModal();
  });

  closeBtn.addEventListener("click", () => {
    const dialog = document.getElementById("newProjectDialog");
    dialog.close();
  });
}

function projectSubmitListener() {
  const projectSubmitBtn = document.querySelector("#projectSubmitBtn");

  projectSubmitBtn.addEventListener("click", () => {
    const projectInput = document.querySelector("#projectName");
    const projectName = projectInput.value;
    const todoData = getTodoData();
    const newProjectId = `p${todoData.length + 1}`;

    newProject(newProjectId, projectName);
    loadProjectsList();
    loadNewAddedProject(newProjectId)
  });
}

function addTodoDialog() {
  const addNewTodoBtn = document.querySelector("#newTodoBtn");
  const closeNewTodoBtn = document.querySelector("#cancelTodo")
  const dialog = document.getElementById("todoDialog");

  addNewTodoBtn.addEventListener("click", () => {
    dialog.showModal();
    loadProjectOptions();
    selectDefaultProjectById(getCurrentProject());
    setCurrentForm("add");
  });

  closeNewTodoBtn.addEventListener("click", () => {
    dialog.close();
  })
}

function loadProjectOptions() {
  const select = document.getElementById("taskProject");
  const projects = getTodoData();

  select.innerHTML = ""
  showProjectSelection()

  projects.forEach(project => {
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    select.appendChild(option);
    option.id = project.id;
  });
}

function selectDefaultProjectById(projectId) {
  const select = document.getElementById("taskProject");
  const optionToSelect = Array.from(select.options).find(
    option => option.id === projectId
  );

  if (optionToSelect) {
    select.value = optionToSelect.value;
  }
}

function initEditTodoDialog(todo) {
  const dialog = document.getElementById("todoDialog");

  dialog.showModal();
  setCurrentForm("edit");
  hideProjectSelection();

  document.getElementById("taskTitle").value = todo.title;
  document.getElementById("taskDescription").value = todo.desc;
  document.getElementById("taskDueDate").value = todo.dueDate;
  document.getElementById("taskPriority").value = todo.priority;
  document.getElementById("taskStatus").checked = todo.completed;
}

function todoSubmitListener() {
  const form = document.getElementById("todoForm")
  form.addEventListener("submit", (e) => todoSubmitHandler(e))
}

function todoSubmitHandler(e) {
  e.preventDefault();
  const dialog = document.getElementById("todoDialog");
  const form = document.getElementById("todoForm");
  const currentFormMode = getCurrentForm();

    if (currentFormMode === "edit") {
      const currentTodoId = getCurrentTodo();
      const newTodo = {
        id: crypto.randomUUID(),
        title: document.getElementById("taskTitle").value,
        desc: document.getElementById("taskDescription").value,
        dueDate: document.getElementById("taskDueDate").value,
        priority: document.getElementById("taskPriority").value,
        completed: document.getElementById("taskStatus").checked,
      };

      editTodo(currentTodoId, newTodo);
    } else {
      const projectSelect = document.getElementById("taskProject");
      const projectId = projectSelect.options[projectSelect.selectedIndex].id;
      const task = {
        id: crypto.randomUUID(),
        title: document.getElementById("taskTitle").value,
        desc: document.getElementById("taskDescription").value,
        dueDate: document.getElementById("taskDueDate").value,
        priority: document.getElementById("taskPriority").value,
        completed: false,
      };
      newTodo(projectId, task);
    }
    updateUI();
    dialog.close();
    form.reset();
}

function hideProjectSelection() {
  const projectSelect = document.getElementById("taskProject"); 
  const projectSelectLabel = document.getElementById("task-project-label"); 

  projectSelect.style.display = "none"
  projectSelectLabel.style.display = "none"
}

function showProjectSelection() {
  const projectSelect = document.getElementById("taskProject"); 
  const projectSelectLabel = document.getElementById("task-project-label"); 

  projectSelect.style.display = "block"
  projectSelectLabel.style.display = "block"
}

function initDialogListeners() {
  addProjectDialog();
  projectSubmitListener();
  addTodoDialog();
  todoSubmitListener();
}

export {
  initDialogListeners,
  initEditTodoDialog
};
