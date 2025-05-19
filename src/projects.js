import getTodoData from "./todoData";

function projectSideBar() {
    const projects = getTodoData();
    const projectBar = document.querySelector(".projects-ul")

    projects.forEach(element => {
        const projectList = document.createElement("li")
        projectList.textContent = element.name

        projectBar.appendChild(projectList)
    });
}   

projectSideBar()