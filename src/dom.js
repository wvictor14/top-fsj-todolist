// this module is for populating the dom

export function addProject(project) {
  // parent div
  const parent = document.querySelector(".projects");

  // new div for a project
  const child = document.createElement("div");
  child.textContent = project.title;

  parent.appendChild(child);

}

// sets the title of the content page based on given project
export function setTitle(project){
  const target = document.getElementById("content-title");
  target.textContent = project.title;
}

export function addTodo(todo) {
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

  for (let i = 0; i < childElements.length; i ++) {
    child.appendChild(childElements[i]);
  }

  parent.appendChild(child);
}