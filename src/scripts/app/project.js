import Task from "./task";

export default function Project(name, colour, tasks) {
  // We need to rebuild projects and their methods from data held in the LocalStorage
  let _name = name;
  let _colour = colour;
  const _tasks = tasks ? tasks : [];

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

  function toJSON() {
    return JSON.stringify({
      name: _name,
      colour: _colour,
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
