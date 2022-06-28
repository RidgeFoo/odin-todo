import Task from "./task";

export default function Project(name, tasks) {
  // We need to rebuild projects and their methods from data held in the LocalStorage
  let _name = name;
  let _tasks = typeof tasks === Array ? tasks : [];

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

  function addTask(title, dueDate, priority, taskIndex) {
    const newTask = Task(title, dueDate, priority, taskIndex);
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
    addTask,
    removeTask,
    toJSON,
  };
}
