// this module is for populating the dom

// addProjectsToSidebar populates sidebar with each project in projects
// onSelect is a "callback function" that allows us to modify the global state
// without defining the global state in this module, respecting encapsulation. 
export function addProjectsToSidebar(projects, onSelect) {
  projects.map((currentValue, index, array) => {
    addProjectToSidebar(currentValue, onSelect)
  })
}

// onSelect is a function
// project is a project object
function addProjectToSidebar(project, onSelect) {
  // parent div
  const parent = document.querySelector(".projects");

  // new div for a project
  const child = document.createElement("button");
  child.textContent = project.title;
  child.id = project.title;

  // add event listener
  child.addEventListener("click", function () {

    // changes the current project
    onSelect(project)
  });

  parent.appendChild(child);

}

// set the title and content of the page
export function addTodoContent(current_project) {
  clearTodoUI()
  setTitleOfMain(current_project);
  current_project.items.map(addTodoUI);
}


// sets the title of the content page based on given project
function setTitleOfMain(project) {
  const target = document.getElementById("content-title");
  target.textContent = project.title;
}

function clearTodoUI() {
  document.querySelector(".lists").innerHTML = '';
}

// iterates over the properties of a todo object and populates the .lists div
function addTodoUI(todo) {
  // parent div
  const parent = document.querySelector(".lists");

  // new child div
  const child = document.createElement('div');

  // content of child elements
  const title = document.createElement("span");
  title.textContent = todo.title;
  title.classList.add('title');

  const desc = document.createElement("span");
  desc.textContent = ' ' + todo.description;
  desc.classList.add('desc');

  const duedate = document.createElement('span');
  duedate.textContent = ' ' + todo.dueDate;
  duedate.classList.add('duedate');

  const priority = document.createElement('span');
  priority.textContent = ' ' + todo.priority;
  priority.classList.add('priority');

  const notes = document.createElement('span');
  notes.textContent = ' ' + todo.notes;
  notes.classList.add('notes');

  // loop over and append them
  const childElements = [
    title,
    desc,
    duedate,
    priority,
    notes
  ];

  for (let i = 0; i < childElements.length; i++) {
    child.appendChild(childElements[i]);
  }

  parent.appendChild(child);
}