import dummyData from "./app/dummy-data.json";

import "modern-css-reset";
import "../style.css";
import "tippy.js/dist/tippy.css";
import html from "../index.html";
//import PubSub from "./app/pubsub";
//import defaults from "./app/default-values";

import todo from "./app/todo";

import header from "./ui/header";
import sidebar from "./ui/sidebar";
import modal from "./ui/modal-task";
import tasks from "./ui/tasks";

// TODO: Tidy this up eventually
window.Todo = todo;

todo.init(dummyData);

const body = document.querySelector("body");
body.append(header, sidebar, tasks, modal);
