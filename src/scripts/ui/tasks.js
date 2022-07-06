import svgAdd from "../../images/plus-solid.svg";
import svgCircle from "../../images/circle-solid.svg";
import svgCircleCheck from "../../images/circle-check-solid.svg";
//import svgEdit from "../../images/pen-to-square-solid.svg";
import PubSub from "../app/pubsub";
import { clearChildElements } from "./helpers";
import { el } from "date-fns/locale";

PubSub.subscribe("/taskListUpdated", renderTasks);
PubSub.subscribe("/filterByProject", setMainTitle);
PubSub.subscribe("/filterByPeriod", setMainTitle);

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
  const taskList = document.createElement("ul");
  taskList.id = "task-list";
  return taskList;
}

function createTasksContainer() {
  const container = document.createElement("div");
  container.id = "tasks";

  // Add task entries to this container accordingly
  container.append(taskList, addTaskButton);
  return container;
}

function createTaskElement({
  taskTitle,
  taskDueDate,
  taskPriority,
  projectName,
  taskIndex, // TODO: May want to use this to handle a deletion event instead - see below
}) {
  // returns the task elements with relevant buttons etc.
  const listItem = document.createElement("li");
  listItem.className = "task";

  const mainArea = document.createElement("div");

  mainArea.addEventListener("click", () =>
    PubSub.publish("/editTaskModal", {
      taskTitle,
      taskDueDate,
      taskPriority,
      projectName,
    })
  );

  const elTitle = document.createElement("p");
  elTitle.className = "task-title";
  elTitle.textContent = taskTitle;

  const elPriority = document.createElement("div");
  elPriority.classList.add("task-priority", taskPriority.toLowerCase());
  elPriority.innerHTML = svgCircle;
  elPriority.addEventListener(
    "mouseenter",
    () => (elPriority.innerHTML = svgCircleCheck)
  );
  elPriority.addEventListener(
    "mouseleave",
    () => (elPriority.innerHTML = svgCircle)
  );

  /*
    TODO: Creating an anonymous function per element may not be the most efficient really
    binding the project name and task Index to CSS attributes and then just using the event object
    that gets passed into handle the event based on the CSS attributes rather than creating
    a closure of an anonymous function with the variables of the projectName and taskIndex bound???
    */
  elPriority.addEventListener("click", () =>
    PubSub.publish("/completeTask", { projectName, taskTitle })
  );

  // Split off into another function???
  const elTaskProperties = document.createElement("div");
  elTaskProperties.className = "task-properties";

  const elDueDate = document.createElement("p");
  elDueDate.className = "task-due-date";
  elDueDate.textContent = taskDueDate.toLocaleDateString();

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

function createMainTitle(title = "Tasks") {
  // TODO: Title should reflect the project / filter selected
  const elTitle = document.createElement("h1");
  elTitle.textContent = title;
  return elTitle;
}

function setMainTitle(topic, text) {
  mainTitle.textContent = text;
}

function createMain() {
  const main = document.createElement("div");
  main.id = "main";
  main.append(mainTitle, taskContainer);
  return main;
}

export default main;
