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
import dummyData from "./app/dummy-data.json";

todo.init(dummyData);

window.todo = todo;

const body = document.querySelector("body");
body.append(header, sidebar, tasks, taskModal, projectModal);
