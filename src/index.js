import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles.css";
import { initialize, initializeUI } from "./initialize.js";

// initialize state: 2 items x 2 projects
let projects = initialize();
let current_project = projects[0];

initializeUI(projects, current_project);

//todo add delete capabilities to todo item and project
//todo make todo hidden by default, visible on click
//todo make the details expand on click
