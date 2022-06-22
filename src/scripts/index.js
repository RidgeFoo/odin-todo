// Importing the HTML to handle the SVG references in the HTML using the webpack html-loader plugin
import html from "../index.html";
import "../style.css";
import Todo from "./todo.js";
import "modern-css-reset";
import PubSub from "./pubsub";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

Todo.addProject("myProject", "Red");

const projectOne = Todo.getProjects()[0];

projectOne.addTask("myTask", "2021-01-01", 999);

const taskOne = projectOne.getTasks()[0];

console.log(`Project Name: ${projectOne.getName()}`);
console.log(`Task name: ${taskOne.getTitle()}`);
console.log(taskOne.getTaskDetails());

// Testing out PubSub logic
const pubSub = new PubSub();

// The way the PubSub logic is implemented means you must have a subscribers before
// you can publish - publishing doesn't create a topic with an empty array
// I'm not entirely sure why this would be a problem.

// Subscribing to the topic and using an arrow function as the function we want to use
// as the callback function when events are published.
pubSub.subscribe("/addFavourite", (topic, args) => {
  console.log("test", topic, args);
});

// Publishing a new topic with args
pubSub.publish("/addFavourite", ["test"]);

tippy("[data-tippy-content]", { arrow: false, delay: [500, 200] });
