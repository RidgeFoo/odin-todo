// import Sherlock from "sherlockjs";
import Project from "./project";
import PubSub from "./pubsub";

const Todo = (function () {
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

  function addTask(projectName, taskTitle, dueDate, priority) {
    /* We render the task list based on the currently applied filter.
    If user adds a task that isn't within the current filter then they won't see it immediately.*/
    addProject(projectName);
    const project = getProject(projectName);
    const task = project.addTask(taskTitle, dueDate, priority);
    PubSub.publish("/taskListUpdated", _tasksFilterApplied());
    return task;
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

  function removeTask(projectName, index) {
    // Need to think about this a bit more
  }

  /* Function that handles the unpacking of the args passed as
  part of the /addTask topic and passes then to the relevant function */
  function _subscribeToCreateTask() {
    PubSub.subscribe("/createTask", (topic, obj) => {
      addTask(obj.project, obj.taskTitle, obj.dueDate, obj.priority);
    });
  }

  function _setTaskFilter(type = "All", value) {
    // This will be called by a PubSub subscription and when we initialise the app
    if (type === "All") {
      _tasksFilterApplied = getAllTasks;
    } else if (type === "/filterByProject") {
      _tasksFilterApplied = () => getTasksByProject(value);
    } else if (type === "/filterByPeriod") {
      console.log("Filtering by time period isn't implemented yet");
    }

    PubSub.publish("/taskListUpdated", _tasksFilterApplied());
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
    PubSub.publish("/renderTasks", _tasksFilterApplied());
    PubSub.publish("/renderProjects", getProjectNames());
  }

  return {
    addProject,
    getProject,
    getProjectsAll,
    getProjectNames,
    removeProject,
    getAllTasks,
    init,
  };
})();

export default Todo;
