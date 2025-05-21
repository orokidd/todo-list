import { getCurrentProject, setCurrentTodo, getCurrentTodo } from "./state.js";
import { newProject, newTodo, getTodoData, editTodo } from "./todoData.js";
import { projectSideBar } from "./projects.js";
import { loadTask, loadTaskDOM } from "./loadTasks.js";

// function initAddTodoDialog() {
//   const dialog = document.getElementById("todoDialog");
//   const openBtn = document.getElementById("newTodoBtn");
//   const cancelBtn = document.getElementById("cancelTodo");
//   const form = document.getElementById("todoForm");

//   openBtn.addEventListener("click", () => {
//     dialog.showModal();
//   });

//   cancelBtn.addEventListener("click", () => {
//     dialog.close();
//   });

//   form.addEventListener("submit", (e) => {
//     e.preventDefault(); // prevent default form close

//     const todoData = getTodoData();
//     const currentProjectId = getCurrentProject();
//     const projectIndex = todoData.findIndex(
//       (project) => project.id === currentProjectId
//     );
//     const currentTodos = todoData[projectIndex].todos;
//     const project = loadTask(currentProjectId);

//     const task = {
//       id: `t${currentTodos.length + 1}`,
//       title: document.getElementById("taskTitle").value,
//       description: document.getElementById("taskDescription").value,
//       dueDate: document.getElementById("taskDueDate").value,
//       priority: document.getElementById("taskPriority").value,
//     };

//     console.log("Task submitted:", task);

//     newTodo(currentProjectId, task);
//     loadTaskDOM(project);
//     dialog.close();
//     form.reset();
//   });
// }

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

    newProject("p3", projectName);
    projectSideBar();
  });
}

function initEditTodoDialog(projectId, todoId) {
  const dialog = document.getElementById("todoDialog");

  dialog.showModal();

  const todoData = getTodoData();
  const currentProjectId = projectId;
  const projectIndex = todoData.findIndex(
    (project) => project.id === currentProjectId
  );
  const todoIndex = todoData[projectIndex].todos.findIndex(
    (todo) => todo.id === todoId
  );

  const todo = todoData[projectIndex].todos[todoIndex];

  // const currentTodos = todoData[projectIndex].todos;

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
    e.preventDefault(); // prevent default form close
    const currentProjectId = getCurrentProject();
    const currentTodoId = getCurrentTodo();

    const task = {
      id: currentTodoId,
      title: document.getElementById("taskTitle").value,
      desc: document.getElementById("taskDescription").value,
      dueDate: document.getElementById("taskDueDate").value,
      priority: document.getElementById("taskPriority").value,
    };

    console.log("Task submitted:", task);

    editTodo(currentProjectId, currentTodoId, task);
    const project = loadTask(currentProjectId);
    loadTaskDOM(project);
    dialog.close();
    form.reset();
  });
}

export { initAddProjectDialog, initEditTodoDialog, editEventListener };
