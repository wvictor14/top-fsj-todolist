import { todoItem, project } from "./todo.js";
import { addProjectsToSidebar, addTodoContent, initializeAddProjectButton, attachListenersToAddToDoButton} from "./dom.js"

export function initialize() {
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



  return (projects)
}


export function initializeUI(projects, current_project) {
  // initialize projects to sidebar, attach switch project function
  addProjectsToSidebar(projects, (clicked_project) => {
    current_project = clicked_project;
    addTodoContent(current_project);
    attachListenersToAddToDoButton(current_project);
  });

  // populate the content
  addTodoContent(current_project);

  // add event listeners
  function setCurrentProject(project) {
    current_project = project;
  }
  initializeAddProjectButton(projects, setCurrentProject);
  attachListenersToAddToDoButton(current_project);
} 