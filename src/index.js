import "./styles.css"
import './projects.js';
import { loadTask } from './loadTasks.js';

const projects = document.querySelectorAll('.project')

projects.forEach(project => {
    project.addEventListener('click', ()=> {
        loadTask(project.id)
    })
})