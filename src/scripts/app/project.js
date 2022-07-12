import Task from "./task";

export default function Project(name, taskList) {
  // We need to rebuild projects and their methods from data held in the LocalStorage
  // Tasks is an array of objects with the relevant properties
  const projectName = name;
  const tasks = [];

  function processTasks() {
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
    if (!Array.isArray(taskList)) return;

    taskList.forEach((task) =>
      tasks.push(new Task(task.title, task.dueDate, task.priority))
    );
  }

  function getName() {
    return name;
  }

  function getTasks() {
    return tasks;
  }

  function getTaskDetailsAll() {
    return tasks.map((task, index) => {
      const taskDetails = task.getDetails();
      return {
        projectName,
        index,
        ...taskDetails,
      };
    });
  }

  function addTask(title, dueDate, priority) {
    tasks.push(Task(title, dueDate, priority));
  }

  function removeTask(index) {
    tasks.splice(index, 1);
  }

  processTasks(taskList);

  return {
    getName,
    getTasks,
    getTaskDetailsAll,
    addTask,
    removeTask,
  };
}
