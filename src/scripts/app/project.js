import Task from "./task";

// Factory function
export default function Project(name, tasks) {
  // We need to rebuild projects and their methods from data held in the LocalStorage
  // Tasks is an array of objects with the relevant properties
  let _name = name;
  let _tasks = [];

  processTasks(tasks);

  function processTasks(tasks) {
    /*
    Primarily use to load tasks from local storage
    Expects an array with objects with properties:
    [
      {
      "title": "Task 1",
      "dueDate": "2020-01-01",
      "priority": "Low"
      }
    ]
    */
    if (!Array.isArray(tasks)) return;

    tasks.forEach((task) => addTask(task.title, task.dueDate, task.priority));
  }

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

  function getTaskDetailsAll() {
    return _tasks.map((task, index) =>
      Object.assign(
        { projectName: _name, taskIndex: index },
        task.getTaskDetails()
      )
    );
  }

  function addTask(title, dueDate, priority) {
    const newTask = Task(title, dueDate, priority);
    _tasks.push(newTask);
    return newTask;
  }

  function removeTask(task) {
    _tasks = _tasks.filter((x) => x !== task);
    return task;
  }

  function toJSON() {
    return JSON.stringify({
      name: _name,
      tasks: _tasks.map((task) => task.getTaskDetails()),
    });
  }

  return {
    getName,
    setName,
    getTasks,
    getTaskDetailsAll,
    addTask,
    removeTask,
    toJSON,
  };
}
