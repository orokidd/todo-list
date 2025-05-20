let currentProjectId = null;

function setCurrentProject(id) {
  currentProjectId = id;
  console.log(currentProjectId)
}

function getCurrentProject() {
  return currentProjectId;
}

export { setCurrentProject, getCurrentProject }