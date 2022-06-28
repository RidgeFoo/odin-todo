// import Sherlock from "sherlockjs";
import Project from "./project";
import PubSub from "./pubsub";

const Todo = (function () {
  // Prevents projects with the same name being added
  const _projects = {};

  function addProject(name) {
    if (name in _projects) return;
    _projects[name] = Project(name);
  }

  function getProjects() {
    return _projects;
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
    return task;
  }

  function getAllTaskDetails() {
    // Gets tasks from all projects
    const tasks = Object.values(_projects)
      .map((project) => project.getTasks())
      .flat();
    return tasks.map((task) => task.getTaskDetails());
  }

  // Need to think about this a bit more
  function removeTask(projectName, index) {}

  /* Function that handles the unpacking of the args passed as
  part of the /addTask topic and passes then to the relevant function */
  function subscribeToAddTask() {
    PubSub.subscribe("/createTask", (topic, obj) => {
      console.log("creating a new task!");
      addTask(obj.project, obj.taskTitle, obj.dueDate, obj.priority);
    });
  }

  subscribeToAddTask();

  return {
    addProject,
    getProjects,
    removeProject,
    getAllTaskDetails,
  };
})();

export default Todo;
