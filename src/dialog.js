import {
  getCurrentProject,
  getCurrentTodo,
  setCurrentForm,
  getCurrentForm,
} from "./state.js";
import { newProject, newTodo, getTodoData, editTodo } from "./todoData.js";
import { loadProjectsList } from "./interface.js";
import { loadTask, loadSelectedTask } from "./loadTasks.js";

function initAddProjectDialog() {
  const dialog = document.getElementById("newProjectDialog");
  const showBtn = document.getElementById("newProjectBtn");
  const closeBtn = document.getElementById("closeProjectBtn");

  showBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  closeBtn.addEventListener("click", () => {
    dialog.close();
  });

  const projectSubmitBtn = document.querySelector("#projectSubmitBtn");

  projectSubmitBtn.addEventListener("click", () => {
    const projectInput = document.querySelector("#projectName");
    const projectName = projectInput.value;
    const todoData = getTodoData();
    const newProjectId = `p${todoData.length + 1}`;

    newProject(newProjectId, projectName);
    loadProjectsList();
  });
}

function initAddTodoDialog() {
  setCurrentForm("add");

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("taskDueDate").value = "";
  document.getElementById("taskPriority").value = "Low";
  document.getElementById("todoDialog").showModal();
}

function initEditTodoDialog(projectId, todoId) {
  const dialog = document.getElementById("todoDialog");
  dialog.showModal();
  setCurrentForm("edit");

  const todoData = getTodoData();
  const currentProjectId = projectId;
  const projectIndex = todoData.findIndex(
    (project) => project.id === currentProjectId
  );
  const todoIndex = todoData[projectIndex].todos.findIndex(
    (todo) => todo.id === todoId
  );

  const todo = todoData[projectIndex].todos[todoIndex];

  document.getElementById("taskTitle").value = todo.title;
  document.getElementById("taskDescription").value = todo.desc;
  document.getElementById("taskDueDate").value = todo.dueDate;
  document.getElementById("taskPriority").value = todo.priority;
}

function editEventListener() {
  const dialog = document.getElementById("todoDialog");
  const form = document.getElementById("todoForm");
  const cancelBtn = document.getElementById("cancelTodo");

  cancelBtn.addEventListener("click", () => {
    dialog.close();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentProjectId = getCurrentProject();
    const currentTodoId = getCurrentTodo();
    const currentFormMode = getCurrentForm();

    if (currentFormMode === "edit") {
      const task = {
        id: currentTodoId,
        title: document.getElementById("taskTitle").value,
        desc: document.getElementById("taskDescription").value,
        dueDate: document.getElementById("taskDueDate").value,
        priority: document.getElementById("taskPriority").value,
      };
      editTodo(currentProjectId, currentTodoId, task);
    } else {

      const todoData = getTodoData();
      const projectIndex = todoData.findIndex(
        (project) => project.id === currentProjectId
      );

      const task = {
        id: `t${todoData[projectIndex].todos.length + 1}`,
        title: document.getElementById("taskTitle").value,
        desc: document.getElementById("taskDescription").value,
        dueDate: document.getElementById("taskDueDate").value,
        priority: document.getElementById("taskPriority").value,
      };
      newTodo(currentProjectId, task);
    }
    const project = loadTask(currentProjectId);
    loadSelectedTask(project);
    dialog.close();
    form.reset();
  });
}

export {
  initAddProjectDialog,
  initEditTodoDialog,
  initAddTodoDialog,
  editEventListener,
};
