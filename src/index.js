import "./styles.css";
import { todo_item, project} from "./todo_item.js";

let new_item = new todo_item('Buy Groceries', 'Buy some food', 'Tomorrow', 'High', 'no notes');
console.log(new_item.dueDate);

let default_project = new project(
  'Default', 
  [new_item,
    new todo_item('Call mom', 'using landline', 'Soon', 'medium')

  ]
);
console.log(default_project);