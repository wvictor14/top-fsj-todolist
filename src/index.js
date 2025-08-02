import "./styles.css";
import { todoItem, project, switchProject} from "./todo.js";
import { addProject, addTodo, clearTodo, setTitle} from "./dom.js"

let new_item = new todoItem('Buy Groceries', 'Buy some food', 'Tomorrow', 'High', 'no notes');

let default_project = new project(
  'Default', 
  [
    new_item,
    new todoItem('Call mom', 'using landline', 'Soon', 'medium')
  ]
);

let projects = [
  default_project,
  new project(
    'Work',
    [
      new todoItem(
        'Schedule Vacation', 
        'Schedule it for the long weekend', 
        'Today', 
        'Low'
      ),
      new todoItem(
        'Finish ML project', 
        'Do it fast', 
        'EOY', 
        'High', 
        "Don't worry about the other project for now"
      )
    ]
  )
];

// target the .projects and populate with project title
projects.map((currentValue, index, array) => {
  addProject(currentValue)
})

// establish current project
let current_project = projects[0];

// target the .lists div and populate with project -> todo_items
setTitle(current_project);
current_project.items.map(addTodo);

//todo add form to enter todo item
// on submit, add the item to current project
// run addTodo on new item

//todo add form to enter new project

//todo add ability to switch projects
/// switches project, clears todo, changes title, populates todo
current_project = switchProject(projects, 'Work');
clearTodo();
setTitle(current_project);
current_project.items.map(addTodo);

//todo add delete capabilities to todo item and project