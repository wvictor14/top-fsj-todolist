import { todoItem, project} from "./todo.js";

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
  
  return(projects)
}