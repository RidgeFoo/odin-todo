// import Sherlock from "sherlockjs";
import { endOfToday, add } from "date-fns";
import Project from "./project";
import PubSub from "./pubsub";

// Uses an object to prevent projects with the same name being added
const projects = {};
let currentFilterTitle;
let tasksFilterApplied;

function publishTaskListUpdated() {
  PubSub.publish("/taskListUpdated", tasksFilterApplied());
}

function removeTask(topic, { projectName, index }) {
  projects[projectName].removeTask(index);
  publishTaskListUpdated();
}

function getProjectNames() {
  return Object.keys(projects);
}

function publishProjectListUpdated() {
  PubSub.publish("/projectListUpdated", getProjectNames());
}

function addProject(name, tasks) {
  if (name in projects) return;
  projects[name] = Project(name, tasks);
  publishProjectListUpdated();
}

function getProjectsAll() {
  return projects;
}

function getProject(name) {
  return projects[name];
}

function publishCurrentlySetFilter() {
  PubSub.publish("/taskFilterUpdated", currentFilterTitle);
}

function getTasksByProject(projectName) {
  return getProject(projectName).getTaskDetailsAll();
}

function getAllTasks() {
  // Gets tasks from all projects
  return Object.values(projects)
    .map((project) => project.getTaskDetailsAll())
    .flat();
}

function getTasksDueToday() {
  // Get tasks due today and in the past that are not complete
  return getAllTasks().filter((task) => task.dueDate <= endOfToday());
}

function getTasksDueWithin7Days() {
  // Used with the Upcoming filter
  return getAllTasks().filter(
    (task) => task.dueDate <= add(new Date(), { days: 7 })
  );
}

// eslint-disable-next-line default-param-last
function setTaskFilter(type = "All Tasks", filterValue) {
  // This will be called by a PubSub subscription and when we initialise the app
  currentFilterTitle = filterValue || type;
  if (type === "All Tasks") {
    tasksFilterApplied = getAllTasks;
  } else if (type === "/filterByProject") {
    tasksFilterApplied = () => getTasksByProject(filterValue);
  } else if (type === "/filterByPeriod" && filterValue === "Today") {
    tasksFilterApplied = getTasksDueToday;
  } else if (type === "/filterByPeriod" && filterValue === "Upcoming") {
    tasksFilterApplied = getTasksDueWithin7Days;
  }

  publishTaskListUpdated();
  publishCurrentlySetFilter();
}

function removeProject(name) {
  delete projects[name];

  if (currentFilterTitle === name) {
    currentFilterTitle = "All Tasks";
    setTaskFilter();
  }
  publishProjectListUpdated();
  publishTaskListUpdated();
}

function addTask({ projectName, title, dueDate, priority }) {
  /* We render the task list based on the currently applied filter.
    If user adds a task that isn't within the current filter then they won't see it immediately. */
  addProject(projectName);
  const project = getProject(projectName);
  const task = project.addTask(title, dueDate, priority);
  publishTaskListUpdated();
  return task;
}

function editTask(topic, { originalTask, editedTask }) {
  removeTask(null, {
    projectName: originalTask.projectName,
    index: originalTask.index,
  });
  addTask(editedTask);
}
/* Function that handles the unpacking of the args passed as
  part of the /addTask topic and passes then to the relevant function */
function subscribeToCreateTask() {
  PubSub.subscribe("/createTask", (topic, taskObj) => {
    addTask(taskObj);
  });
}

function toJSON() {
  const todoObj = { projects: [] };

  Object.keys(projects).forEach((key) => {
    const projectObj = {
      name: key,
      tasks: projects[key].getTasks().map((task) => task.getDetails()),
    };
    todoObj.projects.push(projectObj);
  });
  return JSON.stringify(todoObj);
}

function saveToLocalStorage() {
  localStorage.setItem("todo", toJSON());
}

function loadFromStorage() {
  const json = JSON.parse(localStorage.getItem("todo"));
  json.projects.forEach((project) => {
    addProject(project.name, project.tasks);
  });
}

function init() {
  loadFromStorage();
  subscribeToCreateTask();
  setTaskFilter();

  PubSub.subscribe("/filterByProject", setTaskFilter);
  PubSub.subscribe("/filterByPeriod", setTaskFilter);
  PubSub.subscribe("/completeTask", removeTask);
  publishProjectListUpdated();
  PubSub.subscribe("/editTask", editTask);
  PubSub.subscribe("/createProject", (topic, projectName) =>
    addProject(projectName)
  );
  PubSub.subscribe("/removeProject", (topic, projectName) =>
    removeProject(projectName)
  );

  window.addEventListener("beforeunload", saveToLocalStorage);
}

export default {
  addProject,
  getProject,
  getProjectsAll,
  getProjectNames,
  removeProject,
  removeTask,
  getAllTasks,
  init,
  toJSON,
  saveToLocalStorage,
};
