import "./styles.css";
import { addProjectsToSidebar, addTodoContent, initializeAddProjectButton, attachListenersToAddToDoButton, attachListenerToEditBtn} from "./dom.js"
import { initialize } from "./initialize.js"


// initialize state: 2 items x 2 projects
let projects = initialize();
let current_project = projects[0];

// populate initial dom
addProjectsToSidebar(projects, (clicked_project) => {
  current_project = clicked_project;
  addTodoContent(current_project);
});
addTodoContent(current_project);

// setter to inject into buttons
function setCurrentProject(project) {
  current_project = project;
}

// add eventlisteners to buttons
initializeAddProjectButton(projects, setCurrentProject);
attachListenersToAddToDoButton(current_project);




//todo add delete capabilities to todo item and project
//todo make todo hidden by default, visible on click
//todo make the details expand on click