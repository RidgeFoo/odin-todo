// import Sherlock from "sherlockjs";
import Project from "./project";
import PubSub from "./pubsub";
import { endOfToday, add } from "date-fns";

// Uses an object to prevent projects with the same name being added
const _projects = {};
let _currentFilterTitle;
let _tasksFilterApplied; // could this reference a function that we use as a callback when rendering tasks???

function addProject(name, tasks) {
  // tasks is optional really
  if (name in _projects) return;
  _projects[name] = Project(name, tasks);
  _publishProjectListUpdated();
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
  delete _projects[name];

  if (_currentFilterTitle === name) {
    _currentFilterTitle = "All Tasks";
    _setTaskFilter();
  }
  _publishProjectListUpdated();
  _publishTaskListUpdated();
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

function _setTaskFilter(type = "All Tasks", filterValue) {
  // This will be called by a PubSub subscription and when we initialise the app
  _currentFilterTitle = filterValue || type;
  if (type === "All Tasks") {
    _tasksFilterApplied = getAllTasks;
  } else if (type === "/filterByProject") {
    _tasksFilterApplied = () => getTasksByProject(filterValue);
  } else if ((type === "/filterByPeriod") & (filterValue === "Today")) {
    _tasksFilterApplied = _getTasksDueToday;
  } else if ((type === "/filterByPeriod") & (filterValue === "Upcoming")) {
    _tasksFilterApplied = _getTasksDueWithin7Days;
  }

  _publishTaskListUpdated();
  _publishCurrentlySetFilter();
}

function _publishTaskListUpdated() {
  PubSub.publish("/taskListUpdated", _tasksFilterApplied());
}

function _publishProjectListUpdated() {
  PubSub.publish("/projectListUpdated", getProjectNames());
}

function _publishCurrentlySetFilter() {
  PubSub.publish("/taskFilterUpdated", _currentFilterTitle);
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

function toJSON() {
  const todoObj = { projects: [] };
  for (const key in _projects) {
    const projectObj = {
      name: key,
      tasks: _projects[key].getTasks().map((task) => task.getDetails()),
    };
    todoObj.projects.push(projectObj);
  }
  return JSON.stringify(todoObj);
}

function saveToLocalStorage() {
  localStorage.setItem("todo", toJSON());
}

function loadFromStorage() {
  // if (!localStorage.getItem("todo")) return;

  const projects = JSON.parse(localStorage.getItem("todo")).projects;
  projects.forEach((project) => {
    addProject(project.name, project.tasks);
  });
}

function init() {
  loadFromStorage();
  _subscribeToCreateTask();
  _setTaskFilter();

  PubSub.subscribe("/filterByProject", _setTaskFilter);
  PubSub.subscribe("/filterByPeriod", _setTaskFilter);
  PubSub.subscribe("/completeTask", removeTask);
  _publishProjectListUpdated();
  PubSub.subscribe("/editTask", _editTask);
  PubSub.subscribe("/createProject", (topic, projectName) =>
    addProject(projectName)
  );
  PubSub.subscribe("/removeProject", (topic, projectName) =>
    removeProject(projectName)
  );
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
