import "modern-css-reset";
import "../style.css";
import "tippy.js/dist/tippy.css";
import html from "../index.html";
import PubSub from "./app/pubsub";
import defaults from "./app/default-values";
import Todo from "./app/todo";

import header from "./ui/header";
import sidebar from "./ui/sidebar";
import modal from "./ui/modal-task";
import tasks from "./ui/tasks";

window.Todo = Todo;

const body = document.querySelector("body");
body.append(header, sidebar, tasks, modal);

PubSub.subscribe("/filter", (topic, args) => console.log(topic, args));

// Need to figure out a better way of doing this stuff really
PubSub.publish("/renderTasks", Todo.getAllTasks());
PubSub.publish("/renderProjects", Todo.getProjectNames());
PubSub.subscribe("/filterByProject", (topic, args) => console.log(topic, args));
