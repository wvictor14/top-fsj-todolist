import "./styles.css";
import { todoItem, project} from "./todo.js";
import { addProject, addTodo } from "./dom.js"

let new_item = new todoItem('Buy Groceries', 'Buy some food', 'Tomorrow', 'High', 'no notes');

let default_project = new project(
  'Default', 
  [new_item,
    new todoItem('Call mom', 'using landline', 'Soon', 'medium')

  ]
);
// console.log(default_project);

addProject(default_project);
// console.log(default_project.items);

default_project.items.map(addTodo);


// target the .projects and populate with project title
// target the .lists div and populate with project -> todo_items