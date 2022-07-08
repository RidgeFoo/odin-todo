// import Sherlock from "sherlockjs";
import Project from "./project";
import PubSub from "./pubsub";
import { endOfToday, add } from "date-fns";

// Uses an object to prevent projects with the same name being added
const _projects = {};
let _tasksFilterApplied; // could this reference a function that we use as a callback when rendering tasks???

function addProject(name, tasks) {
  // tasks is optional really
  if (name in _projects) return;
  _projects[name] = Project(name, tasks);
  PubSub.publish("/renderProjects", getProjectNames());
}

function getProjectsAll() {
  return _projects;
}

function getProjectNames() {
  return Object.keys(_projects);
}

function getProject(name) {
  return _projects[name];
}

function removeProject(name) {
  _projects = delete _projects[name];
}

function addTask({ projectName, title, dueDate, priority }) {
  /* We render the task list based on the currently applied filter.
    If user adds a task that isn't within the current filter then they won't see it immediately.*/
  addProject(projectName);
  const project = getProject(projectName);
  const task = project.addTask(title, dueDate, priority);
  _publishTaskListUpdated();
  return task;
}

function _editTask(topic, { originalTask, editedTask }) {
  removeTask(null, {
    projectName: originalTask.projectName,
    index: originalTask.index,
  });
  addTask(editedTask);
}

function getTasksByProject(projectName) {
  return getProject(projectName).getTaskDetailsAll();
}

function getAllTasks() {
  // Gets tasks from all projects
  return Object.values(_projects)
    .map((project) => project.getTaskDetailsAll())
    .flat();
}

function removeTask(topic, { projectName, index }) {
  _projects[projectName].removeTask(index);
  _publishTaskListUpdated();
}

/* Function that handles the unpacking of the args passed as
  part of the /addTask topic and passes then to the relevant function */
function _subscribeToCreateTask() {
  PubSub.subscribe("/createTask", (topic, taskObj) => {
    addTask(taskObj);
  });
}

function _setTaskFilter(type = "All", filterValue) {
  // This will be called by a PubSub subscription and when we initialise the app
  if (type === "All") {
    _tasksFilterApplied = getAllTasks;
  } else if (type === "/filterByProject") {
    _tasksFilterApplied = () => getTasksByProject(filterValue);
  } else if ((type === "/filterByPeriod") & (filterValue === "Today")) {
    _tasksFilterApplied = _getTasksDueToday;
  } else if ((type === "/filterByPeriod") & (filterValue === "Upcoming")) {
    _tasksFilterApplied = _getTasksDueWithin7Days;
  }

  _publishTaskListUpdated();
}

function _publishTaskListUpdated() {
  PubSub.publish("/taskListUpdated", _tasksFilterApplied());
}

function _getTasksDueToday() {
  // Get tasks due today and in the past that are not complete
  return getAllTasks().filter((task) => task.dueDate <= endOfToday());
}

function _getTasksDueWithin7Days() {
  // Used with the Upcoming filter
  return getAllTasks().filter(
    (task) => task.dueDate <= add(new Date(), { days: 7 })
  );
}

function init(json) {
  /*
    Takes a JSON representation of projects and initialise the objects as needed in memory.
    Most likely used with local storage to initialise objects.
    See README for an example spec
    */
  const projects = JSON.parse(json).projects;
  projects.forEach((project) => {
    addProject(project.name, project.tasks);
  });
  _setTaskFilter();
  _subscribeToCreateTask();

  PubSub.subscribe("/filterByProject", _setTaskFilter);
  PubSub.subscribe("/filterByPeriod", _setTaskFilter);
  PubSub.subscribe("/completeTask", removeTask);
  PubSub.publish("/renderTasks", _tasksFilterApplied());
  PubSub.publish("/renderProjects", getProjectNames());
  PubSub.subscribe("/editTask", _editTask);
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
};
