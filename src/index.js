import "./styles.css";
import { todoItem, project, switchProject} from "./todo.js";
import { addProjectsToSidebar, addTodoContent} from "./dom.js"
import { initialize } from "./initialize.js"

// initial state: 2 items x 2 projects
let projects = initialize();
let current_project = projects[0];
addTodoContent(current_project);

//todo add form to enter todo item
// on submit, add the item to current project
// run addTodo on new item

//todo add form to enter new project
//todo add delete capabilities to todo item and project