import "modern-css-reset";
import "../style.css";
import "tippy.js/dist/tippy.css";
import storage from "./ui/storage";
import html from "../index.html";
import PubSub from "./app/pubsub";
import defaults from "./app/default-values";
import Todo from "./app/todo";

import header from "./ui/header";
import sidebar from "./ui/sidebar";
import modal from "./ui/modal-task";

const body = document.querySelector("body");
body.append(header, sidebar, modal);

Todo.addProject("myProject", "Red");

const projectOne = Todo.getProjects()[0];

projectOne.addTask("myTask", "2021-01-01", 999);

const taskOne = projectOne.getTasks()[0];

console.log(`Project Name: ${projectOne.getName()}`);
console.log(`Task name: ${taskOne.getTitle()}`);
console.log(taskOne.getTaskDetails());

PubSub.subscribe("/addTask", (topic, args) => console.log(topic, args));
PubSub.subscribe("/filterInbox", (topic, args) => console.log(topic, args));
PubSub.subscribe("/filterToday", (topic, args) => console.log(topic, args));
PubSub.subscribe("/filterUpcoming", (topic, args) => console.log(topic, args));
