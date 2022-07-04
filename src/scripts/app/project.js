import Task from "./task";

export default function Project(name, taskList) {
  // We need to rebuild projects and their methods from data held in the LocalStorage
  // Tasks is an array of objects with the relevant properties
  let _name = name;
  let _tasks = processTasks(taskList);

  function processTasks(taskList) {
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
    if (!Array.isArray(taskList)) return [];

    const list = [];

    taskList.forEach((task) =>
      list.push(new Task(task.title, task.dueDate, task.priority))
    );

    return list;
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
    _tasks.push(Task(title, dueDate, priority));
  }

  function removeTask(index) {
    _tasks.splice(index, 1);
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
