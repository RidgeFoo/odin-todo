/* eslint-disable no-unused-vars */
import "modern-css-reset";
import "../style.css";
import "tippy.js/dist/tippy.css";
import html from "../index.html";
import defaults from "./app/default-values";

import todo from "./app/todo";
import header from "./ui/header";
import sidebar from "./ui/sidebar";
import taskModal from "./ui/modal-task";
import tasks from "./ui/tasks";
import projectModal from "./ui/modal-project";

// Initiliase the app logic
todo.init();

// Initialise the UI
document
  .querySelector("body")
  .append(header, sidebar, tasks, taskModal, projectModal);
