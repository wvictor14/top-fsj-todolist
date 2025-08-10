import { todoItem, project } from "./todo.js"

// Store references to current event handlers to prevent duplicates
let currentEventHandlers = {
  addTodoClick: null,
  addTodoEnter: null,
  formSubmit: null,
  editHandlers: new Map() // Map to store edit handlers by todo ID
};

// attaches listeners to "+" button, and edit buttons
// main event listener function
export function attachListenersToAddToDoButton(current_project) {
  const form = document.getElementById('form_add_todo');
  const title = document.getElementById('add_todo_title');
  const description = document.getElementById('add_todo_description');
  const duedate = document.getElementById('add_todo_duedate');
  const priority = document.getElementById('add_todo_priority');
  const btnSubmit = document.getElementById("submit_todo");
  const btn = document.getElementById("btn_add_todo");
  const title_p = document.getElementById('add_todo_title_p');

  // Remove existing listeners before adding new ones
  removeAllEventListeners();

  // Handle "+" button click
  function handleClick() {
    title_p.style.display = "inline-block";
    btn.style.display = 'none';
    title.focus();
  }

  // Handle Enter key in title field
  function handleEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btnSubmit.click();
      title_p.style.display = "none";
      btn.style.display = 'inline-block';
    }
  }

  // Handle form submission (add new todo)
  function submitHandler(event) {
    event.preventDefault();

    // Add new todo item
    current_project.addItem(new todoItem(
      title.value,
      description.value,
      duedate.value,
      priority.value
    ));

    // Update the DOM and reattach all listeners
    addTodoContent(current_project);
  }

  // Store references and add listeners
  currentEventHandlers.addTodoClick = handleClick;
  currentEventHandlers.addTodoEnter = handleEnter;
  currentEventHandlers.formSubmit = submitHandler;

  btn.addEventListener("click", handleClick);
  title.addEventListener("keypress", handleEnter);
  form.addEventListener("submit", submitHandler);

  // Attach edit button listeners
  attachListenersToEditBtns(current_project);
}

export function attachListenersToEditBtns(current_project) {
  // Clear existing edit handlers
  currentEventHandlers.editHandlers.clear();

  current_project.items.forEach((todo) => {
    attachListenerToEditBtn(current_project, todo);
  });
}

export function formInputsDisplay(display = 'none') {
  const formInputs = document.querySelectorAll('.add_todo_input');
  formInputs.forEach(element => {
    element.style.display = display;
  });
}

export function attachListenerToEditBtn(current_project, current_todo) {
  const form = document.getElementById('form_add_todo');
  const formTitle = document.getElementById('add_todo_title');
  const formDescription = document.getElementById('add_todo_description');
  const formDuedate = document.getElementById('add_todo_duedate');
  const formPriority = document.getElementById('add_todo_priority');
  const btnAddToDo = document.getElementById("btn_add_todo");
  const btnSubmit = document.getElementById("submit_todo");
  const editBtn = document.getElementById('editBtn-' + current_todo.id);

  if (!editBtn) return; // Guard against missing elements

  function handleEdit() {
    // Populate form with current todo details
    formTitle.value = current_todo.title;
    formDescription.value = current_todo.description;
    formDuedate.value = current_todo.duedate;
    formPriority.value = current_todo.priority;

    // Switch to update mode
    btnSubmit.textContent = 'Update';
    btnAddToDo.style.display = 'none';
    formInputsDisplay('flex');

    // Remove current form submit handler
    if (currentEventHandlers.formSubmit) {
      form.removeEventListener('submit', currentEventHandlers.formSubmit);
    }

    // Create update handler
    function submitHandler_update(event) {
      event.preventDefault();
      
      // Update the todo item
      current_todo.title = formTitle.value;
      current_todo.description = formDescription.value;
      current_todo.duedate = formDuedate.value;
      current_todo.priority = formPriority.value;

      // Reset form and reattach original listeners
      resetToAddMode(current_project);
    }

    // Add update handler
    form.addEventListener('submit', submitHandler_update);
    
    // Store reference for cleanup
    currentEventHandlers.formSubmit = submitHandler_update;
  }

  // Store the handler reference
  currentEventHandlers.editHandlers.set(current_todo.id, handleEdit);
  
  // Add the listener
  editBtn.addEventListener("click", handleEdit);
}

function resetToAddMode(current_project) {
  const form = document.getElementById('form_add_todo');
  const btnAddToDo = document.getElementById("btn_add_todo");
  const btnSubmit = document.getElementById("submit_todo");

  // Hide form and show add button
  formInputsDisplay('none');
  btnAddToDo.style.display = 'flex';
  btnSubmit.textContent = 'Add';

  // Refresh the entire UI and reattach all listeners
  addTodoContent(current_project);
}

function removeAllEventListeners() {
  const form = document.getElementById('form_add_todo');
  const title = document.getElementById('add_todo_title');
  const btn = document.getElementById("btn_add_todo");

  // Remove main listeners if they exist
  if (currentEventHandlers.addTodoClick) {
    btn.removeEventListener("click", currentEventHandlers.addTodoClick);
  }
  if (currentEventHandlers.addTodoEnter) {
    title.removeEventListener("keypress", currentEventHandlers.addTodoEnter);
  }
  if (currentEventHandlers.formSubmit) {
    form.removeEventListener("submit", currentEventHandlers.formSubmit);
  }

  // Remove edit button listeners
  currentEventHandlers.editHandlers.forEach((handler, todoId) => {
    const editBtn = document.getElementById('editBtn-' + todoId);
    if (editBtn) {
      editBtn.removeEventListener("click", handler);
    }
  });
}

// Keep your existing functions unchanged
export function addProjectsToSidebar(projects, onSelect) {
  projects.map((currentValue, index, array) => {
    addProjectToSidebar(currentValue, onSelect)
  })
}

export function addProjectToSidebar(project, onSelect) {
  const parent = document.querySelector(".projects");
  const child = document.createElement("button");
  child.textContent = project.title;
  child.id = project.title;

  child.addEventListener("click", function () {
    onSelect(project)
  });

  parent.appendChild(child);
}

export function addTodoContent(current_project) {
  clearTodoUI()
  setTitleOfMain(current_project);
  current_project.items.map(addTodoUI);
  formInputsDisplay('none');
  
  // Reattach listeners after DOM update
  attachListenersToAddToDoButton(current_project);
}

function setTitleOfMain(project) {
  const target = document.getElementById("content-title");
  target.textContent = project.title;
}

function clearTodoUI() {
  document.querySelector(".lists").innerHTML = '';
}

function addTodoUI(todo) {
  const parent = document.querySelector(".lists");
  const child = document.createElement('div');
  child.className = 'todo-item';

  const child2 = document.createElement('div');
  child2.className = 'todo-item-content';

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

  const childElements = [title, desc, duedate, priority];

  for (let i = 0; i < childElements.length; i++) {
    child2.appendChild(childElements[i]);
  }

  const child3 = document.createElement('div');
  child3.className = 'todo-item-controls';

  const editBtn = document.createElement("button");
  editBtn.classList.add('edit');
  editBtn.id = 'editBtn-' + todo.id;
  editBtn.textContent = 'edit';

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add('delete');
  deleteBtn.id = 'deleteBtn-' + todo.title.replace(/\s+/g, '-');
  deleteBtn.textContent = 'x';

  child3.appendChild(editBtn);
  child3.appendChild(deleteBtn);
  child.appendChild(child2);
  child.appendChild(child3);
  parent.appendChild(child);
}

// sidebar PROJECT dom functions
export function initializeAddProjectButton(projects, switchProjectFunc) {
  const btnFocus = document.getElementById("focus_add_project");
  const btnAddProject = document.getElementById("add_project");
  const textInput = document.getElementById("add_project_text_input");

  btnFocus.addEventListener("click", function () {
    btnFocus.style.display = 'none';
    textInput.style.display = 'inline-block';
    btnAddProject.style.display = 'inline-block';
    textInput.focus();
  });

  btnAddProject.addEventListener("click", function () {
    let newProject = new project(textInput.value, [])
    projects.push(newProject)

    switchProjectFunc(newProject);

    addProjectToSidebar(newProject, (clicked_project) => {
      switchProjectFunc(clicked_project);
      addTodoContent(clicked_project)
    });
    addTodoContent(newProject)

    btnFocus.style.display = 'inline-block';
    textInput.style.display = 'none';
    btnAddProject.style.display = 'none';
  });

  textInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btnAddProject.click();
    }
  });
}
