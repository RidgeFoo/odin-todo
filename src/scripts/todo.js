// import Sherlock from "sherlockjs";
import Project from "./project";

const Todo = (function () {
  const _projects = [];

  function addProject(name, colour) {
    const newProject = Project(name, colour);
    _projects.push(newProject);
    return newProject;
  }

  function getProjects() {
    return _projects;
  }

  function removeProject(project) {
    // remove the project somehow from the array
  }

  return {
    addProject,
    getProjects,
    removeProject,
  };
})();

export default Todo;
