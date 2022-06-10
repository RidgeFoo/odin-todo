const todo = (function () {
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

  const Task = function (taskTitle, dueDate, priority) {
    let _title = taskTitle;
    let _dueDate = dueDate;
    let _priority = priority;

    function getTitle() {
      return _title;
    }

    function setTitle(taskTitle) {
      _title = taskTitle;
      return _title;
    }
    return { getTitle, setTitle };
  };

  const Project = function (name, colour) {
    let _name = name;
    let _colour = colour;
    const _tasks = [];

    function getName() {
      return _name;
    }

    function setName(name) {
      _name = projectName;
      return _name;
    }

    function getTasks() {
      return _tasks;
    }

    function addTask(title, dueDate, priority) {
      const newTask = Task(title, dueDate, priority);
      _tasks.push(newTask);
      return newTask;
    }

    function removeTask(task) {
      // somehow select the right task to remove - task is likely to be an object
      return;
    }

    return {
      getName,
      setName,
      getTasks,
      addTask,
      removeTask,
    };
  };

  return {
    addProject,
    getProjects,
    removeProject,
  };
})();

export default todo;
