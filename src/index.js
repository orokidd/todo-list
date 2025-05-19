import "./styles.css"
import './projects.js';
import { loadTask, loadTaskDOM } from './loadTasks.js';

const projects = document.querySelectorAll('.project')

projects.forEach(project => {
    project.addEventListener('click', ()=> {
        const task = loadTask(project.id);
        loadTaskDOM(task)
    })
})
