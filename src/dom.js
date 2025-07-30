// this module is for populating the dom

export function addProject(project) {
  // parent div
  const parent = document.querySelector(".projects")

  // new div for a project
  const child = document.createElement("div");
  child.textContent = project.title;

  parent.appendChild(child);

}