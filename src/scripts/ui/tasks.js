/* eslint-disable no-use-before-define */
import svgAdd from "../../images/plus-solid.svg";
import svgCircle from "../../images/circle-solid.svg";
import svgCircleCheck from "../../images/circle-check-solid.svg";
import PubSub from "../app/pubsub";
import { clearChildElements } from "./helpers";

PubSub.subscribe("/taskListUpdated", renderTasks);
PubSub.subscribe("/taskFilterUpdated", setMainTitle);

const addTaskButton = createAddTaskButton();
const taskList = createTaskListContainer();
const taskContainer = createTasksContainer();
const mainTitle = createMainTitle();
const main = createMain();

function createAddTaskButton() {
  const button = document.createElement("button");
  button.id = "tasks-add-task";
  const label = document.createElement("span");
  label.textContent = "Add task";
  button.insertAdjacentHTML("afterbegin", svgAdd);
  button.append(label);
  button.addEventListener("click", () => PubSub.publish("/addTaskModal"));
  return button;
}

function createTaskListContainer() {
  const list = document.createElement("ul");
  list.id = "task-list";
  return list;
}

function createTasksContainer() {
  const container = document.createElement("div");
  container.id = "tasks";

  // Add task entries to this container accordingly
  container.append(taskList, addTaskButton);
  return container;
}

function createTaskElement({ title, dueDate, priority, projectName, index }) {
  // returns the task elements with relevant buttons etc.
  const listItem = document.createElement("li");
  listItem.className = "task";

  const mainArea = document.createElement("div");

  mainArea.addEventListener("click", () =>
    PubSub.publish("/editTaskModal", {
      title,
      dueDate,
      priority,
      projectName,
      index,
    })
  );

  const elTitle = document.createElement("p");
  elTitle.className = "task-title";
  elTitle.textContent = title;

  const elPriority = document.createElement("div");
  elPriority.classList.add("task-priority", priority.toLowerCase());
  elPriority.innerHTML = svgCircle;
  elPriority.addEventListener("mouseenter", () => {
    elPriority.innerHTML = svgCircleCheck;
  });
  elPriority.addEventListener("mouseleave", () => {
    elPriority.innerHTML = svgCircle;
  });

  /*
    TODO: Creating an anonymous function per element may not be the most efficient really
    binding the project name and task Index to CSS attributes and then just using the event object
    that gets passed into handle the event based on the CSS attributes rather than creating
    a closure of an anonymous function with the variables of the projectName and taskIndex bound???
    */
  elPriority.addEventListener("click", () =>
    PubSub.publish("/completeTask", { projectName, index })
  );

  // Split off into another function???
  const elTaskProperties = document.createElement("div");
  elTaskProperties.className = "task-properties";

  const elDueDate = document.createElement("p");
  elDueDate.className = "task-due-date";
  elDueDate.textContent = dueDate.toLocaleDateString();

  const elProject = document.createElement("p");
  elProject.className = "task-project";
  elProject.textContent = projectName;

  elTaskProperties.append(elDueDate, elProject);

  mainArea.append(elTitle, elTaskProperties);

  listItem.append(elPriority, mainArea);
  return listItem;
}

function renderTasks(topic, tasks) {
  // Can be used to render the tasks that have been filtered by some other function
  clearChildElements(taskList);
  const taskElements = tasks.map((task) => createTaskElement(task));
  taskList.append(...taskElements);
}

function createMainTitle(title = "All Tasks") {
  // TODO: Title should reflect the project / filter selected
  const elTitle = document.createElement("h1");
  elTitle.textContent = title;
  return elTitle;
}

function setMainTitle(topic, text) {
  mainTitle.textContent = text;
}

function createMain() {
  const container = document.createElement("div");
  container.id = "main";
  container.append(mainTitle, taskContainer);
  return container;
}

export default main;
