import "./styles.css";
import { todoItem, project} from "./todo.js";
import { addProject } from "./dom.js"

let new_item = new todoItem('Buy Groceries', 'Buy some food', 'Tomorrow', 'High', 'no notes');
console.log(new_item.dueDate);

let default_project = new project(
  'Default', 
  [new_item,
    new todoItem('Call mom', 'using landline', 'Soon', 'medium')

  ]
);
console.log(default_project);

// target the .projects and populate with project title
// target the .lists div and populate with project -> todo_items