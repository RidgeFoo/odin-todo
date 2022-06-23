import Task from "./task";

export default function Project(name, colour) {
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
}
