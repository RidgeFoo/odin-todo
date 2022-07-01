// import Sherlock from "sherlockjs";
import Project from "./project";
import PubSub from "./pubsub";
import dummyData from "./dummy-data.json";

const Todo = (function () {
  // Uses an object to prevent projects with the same name being added
  const _projects = {};
  const _filterApplied = () => {}; // could this reference a function that we use as a callback???
  const _tasksToDisplay = [];

  initialise(dummyData);
  subscribeToCreateTask();

  /*
  A task can be added to a project that currently isn't filtered to and therefore shouldn't be displayed.
  We could use a callback function maybe that does the filtering of tasks when we publish to the "/renderTasks" topic,
  the args would simply be outcome of that callback function???
  */

  function addProject(name, tasks) {
    // tasks is optional really
    if (name in _projects) return;
    _projects[name] = Project(name, tasks);
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
    addProject(projectName);
    const project = getProject(projectName);
    const task = project.addTask(taskTitle, dueDate, priority);

    PubSub.publish("/renderTasks", getAllTasks());
    return task;
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
  function subscribeToCreateTask() {
    PubSub.subscribe("/createTask", (topic, obj) => {
      addTask(obj.project, obj.taskTitle, obj.dueDate, obj.priority);
    });
  }

  function initialise(json) {
    /*
    Takes a JSON representation of projects and initialise the objects as needed in memory.
    Most likely used with local storage to initialise objects.
    See README for an example spec
    */
    const projects = JSON.parse(json).projects;
    projects.forEach((project) => {
      addProject(project.name, project.tasks);
    });
  }

  function filterTasks(filterType, value) {}

  return {
    addProject,
    getProject,
    getProjectsAll,
    getProjectNames,
    removeProject,
    getAllTasks,
  };
})();

export default Todo;
