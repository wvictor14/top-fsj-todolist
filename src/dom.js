import { todoItem, project } from "./todo.js"

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
export function addProjectToSidebar(project, onSelect) {
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
  formInputsDisplay('none');
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
  child.className = 'todo-item';

  // new child child
  const child2 = document.createElement('div');
  child2.className = 'todo-item-content';

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
  ];

  for (let i = 0; i < childElements.length; i++) {
    child2.appendChild(childElements[i]);
  }

  // add an edit  button
  const child3 = document.createElement('div');
  child3.className = 'todo-item-controls';

  const editBtn = document.createElement("button");
  editBtn.classList.add('edit');
  editBtn.id = 'editBtn-' + todo.id;
  editBtn.textContent = 'edit';


  // add delete btn
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add('delete');
  deleteBtn.id = 'deleteBtn-' + todo.title.replace(/\s+/g, '-');
  deleteBtn.textContent = 'x';

  child3.appendChild(editBtn);
  child3.appendChild(deleteBtn);

  // construct the divs
  child.appendChild(child2);
  child.appendChild(child3);
  parent.appendChild(child);
}


export function initializeAddProjectButton(projects, switchProjectFunc) {
  const btnFocus = document.getElementById("focus_add_project");
  const btnAddProject = document.getElementById("add_project");
  const textInput = document.getElementById("add_project_text_input");

  btnFocus.addEventListener("click", function () {
    // hide button
    btnFocus.style.display = 'none';
    textInput.style.display = 'inline-block';
    btnAddProject.style.display = 'inline-block';
    // focus textarea
    textInput.focus();
  });

  // setup btns - add project
  btnAddProject.addEventListener("click", function () {
    // add new project
    let newProject = new project(textInput.value, [])
    projects.push(newProject)

    // switch current project
    switchProjectFunc(newProject);

    // update dom
    addProjectToSidebar(newProject, (clicked_project) => {
      switchProjectFunc(clicked_project);
      addTodoContent(clicked_project)
      
    });
    addTodoContent(newProject)

    // bthFocus appears
    btnFocus.style.display = 'inline-block';

    // text are and btnAddProject disappears
    textInput.style.display = 'none';
    btnAddProject.style.display = 'none';
  });

  textInput.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      btnAddProject.click();

    }
  });
}

// attaches event listeners add todo button to add to project and update ui
export function attachListenersToAddToDoButton(current_project) {
  const form = document.getElementById('form_add_todo');

  // form content
  const title = document.getElementById('add_todo_title');
  const description = document.getElementById('add_todo_description');
  const duedate = document.getElementById('add_todo_duedate');
  const priority = document.getElementById('add_todo_priority');
  const btnSubmit = document.getElementById("submit_todo");

  // attach event listener to "+" todo button
  // will make the form visible, focus to title text area
  const btn = document.getElementById("btn_add_todo");
  const title_p = document.getElementById('add_todo_title_p');

  function handleClick() {
    title_p.style.display = "inline-block";
    btn.style.display = 'none';
    title.focus();
  } 

  btn.removeEventListener("click", handleClick);
  btn.addEventListener("click", handleClick);


  // attach event listener to "enter" to submit
  function handleEnter (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the submit event  with a click
      btnSubmit.click();

      title_p.style.display = "none";
      btn.style.display = 'inline-block';
    }
  }
  title.removeEventListener("keypress", handleEnter);
  title.addEventListener("keypress", handleEnter);

  // add submit event handler to the form submit
  function submitHandler(event) {
    event.preventDefault(); // Prevent default form submission

    // populate the project
    current_project.addItem(new todoItem(
      title.value,
      description.value,
      duedate.value,
      priority.value
    ));

    // update the dom
    addTodoContent(current_project);
  }

  // add eventlistener to the submit form button, populate project and update ui
  form.removeEventListener("submit", submitHandler);
  form.addEventListener("submit", submitHandler);

  attachListenersToEditBtns(current_project, submitHandler);

}

export function attachListenersToEditBtns(current_project, submitHandler) {
  current_project.items.map((x) => attachListenerToEditBtn(current_project, x, submitHandler))
}

// attaches event listener to the edit button
// populates the form with current todo details
// on pressing "update" attaches a listener that will modify the current todo
// item in the current project
export function attachListenerToEditBtn(current_project, current_todo, current_submitHandler) {
  const form = document.getElementById('form_add_todo');
  // get the contents of forms
  const formTitle = document.getElementById('add_todo_title');
  const formDescription = document.getElementById('add_todo_description');
  const formDuedate = document.getElementById('add_todo_duedate');
  const formPriority = document.getElementById('add_todo_priority');

  // get the other form elements, e.g. controls
  const btnAddToDo = document.getElementById("btn_add_todo");
  const btnSubmit = document.getElementById("submit_todo");
  const editBtn = document.getElementById('editBtn-' + current_todo.id);

  editBtn.addEventListener("click", function () {

    // populate form with details of current item
    formTitle.value = current_todo.title;
    formDescription.value = current_todo.description;
    formDuedate.value = current_todo.duedate;
    formPriority.value = current_todo.priority;

    // switch "Add item" To say "Update"
    btnSubmit.textContent = 'Update';
    // Update should now update current item, rather than add
    // first remove current handler, which adds item to todo list
    form.removeEventListener('submit', current_submitHandler);

    // now update current todo
    function submitHandler_update(event) {
      event.preventDefault();
      current_todo.title = formTitle.value;
      current_todo.description = formDescription.value;
      current_todo.duedate = formDuedate.value;
      current_todo.priority = formPriority.value;

      // update the dom
      addTodoContent(current_project);

      // reset to original
      // 1. now make the form disappear
      // 2. replace with original event listener (add)
      // 3. add listeners to edit buttons
      formInputsDisplay('none');
      btnAddToDo.style.display = 'flex';
      btnSubmit.textContent = 'Add';
      form.removeEventListener('submit', submitHandler_update);
      form.addEventListener('submit', current_submitHandler);
      attachListenersToEditBtns(current_project, current_submitHandler);

    }

    form.removeEventListener('submit', submitHandler_update);
    form.addEventListener('submit', submitHandler_update);

    // show form
    btnAddToDo.style.display = 'none';
    formInputsDisplay('flex');
  })
}

export function formInputsDisplay(display = 'none') {

  const formInputs = document.querySelectorAll('.add_todo_input');

  formInputs.forEach(element => {
    element.style.display = display;
  });
}