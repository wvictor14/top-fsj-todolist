import "./styles.css";
import { addProjectsToSidebar, addTodoContent, initializeAddProjectButton, initializeAddFormButton} from "./dom.js"
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
initializeAddFormButton(current_project);
//todo add form to enter todo item
// on submit, add the item to current project
// run addTodo on new item

//done add form to enter new project
//todo add delete capabilities to todo item and project