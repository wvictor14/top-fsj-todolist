import "./styles.css";
import { todoItem, project, switchProject} from "./todo.js";
import { addProjectsToSidebar, addTodoContent} from "./dom.js"
import { initialize } from "./initialize.js"

// initial state: 2 items x 2 projects
let projects = initialize();

let current_project = projects[0];
addProjectsToSidebar(projects);
addTodoContent(current_project);

//todo add form to enter todo item
// on submit, add the item to current project
// run addTodo on new item

//todo add form to enter new project

//todo add ability to switch projects
/// switches project, clears todo, changes title, populates todo
current_project = switchProject(projects, 'Work');
clearTodoUI();
setTitleOfMain(current_project);
current_project.items.map(addTodoUI);

//todo add delete capabilities to todo item and project