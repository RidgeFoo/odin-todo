import "modern-css-reset";
import "../style.css";
import "tippy.js/dist/tippy.css";

import html from "../index.html";
// import Todo from "./todo.js";
import PubSub from "./app/pubsub";
// import tippy from "tippy.js";
// import "tippy.js/dist/tippy.css";

import header from "./ui/header";
import sidebar from "./ui/sidebar";
const body = document.querySelector("body");
body.append(header, sidebar);

// Todo.addProject("myProject", "Red");

// const projectOne = Todo.getProjects()[0];

// projectOne.addTask("myTask", "2021-01-01", 999);

// const taskOne = projectOne.getTasks()[0];

// console.log(`Project Name: ${projectOne.getName()}`);
// console.log(`Task name: ${taskOne.getTitle()}`);
// console.log(taskOne.getTaskDetails());

// // Testing out PubSub logic
// const pubSub = new PubSub();

// // The way the PubSub logic is implemented means you must have a subscribers before
// // you can publish - publishing doesn't create a topic with an empty array
// // I'm not entirely sure why this would be a problem.

// // Subscribing to the topic and using an arrow function as the function we want to use
// // as the callback function when events are published.
// pubSub.subscribe("/addFavourite", (topic, args) => {
//   console.log("test", topic, args);
// });

// // Publishing a new topic with args
// pubSub.publish("/addFavourite", ["test"]);

// tippy("[data-tippy-content]", { arrow: false, delay: [500, 200] });

PubSub.subscribe("/addTask", (topic, args) => console.log(topic, args));
PubSub.subscribe("/filterInbox", (topic, args) => console.log(topic, args));
PubSub.subscribe("/filterToday", (topic, args) => console.log(topic, args));
PubSub.subscribe("/filterUpcoming", (topic, args) => console.log(topic, args));
