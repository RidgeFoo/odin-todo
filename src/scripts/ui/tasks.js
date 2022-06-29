import svgAdd from "../../images/plus-solid.svg";
import PubSub from "../app/pubsub";

// The way the tasks are being passed around in this is really messy - must use a better way of doing this

/*
This module should setup the relevant containers at UI initialisation
The render tasks function can still take a list of tasks but simply swap out what is in the "task-list" UL element
or it can create that "task-list" UL element
*/

const tasks = (function () {
  function setupTaskContainer(tasks) {
    const container = document.createElement("div");
    container.id = "tasks-container";
    container.append(createTitle(), createTasks(tasks));
    return container;
  }

  function createTitle() {
    // Title should reflect the project / filter selected
    const title = document.createElement("h1");
    title.textContent = "Tasks";
    return title;
  }

  function createAddTaskButton() {
    const button = document.createElement("button");
    button.id = "tasks-add-task";
    const label = document.createElement("span");
    label.textContent = "Add task";
    button.insertAdjacentHTML("afterbegin", svgAdd);
    button.append(label);
    button.addEventListener("click", () => PubSub.publish("/taskModal"));

    return button;
  }

  function createTasks(tasks) {
    const container = document.createElement("div");
    container.id = "tasks";

    // Add task entries to this container accordingly
    container.append(renderTasks(tasks), createAddTaskButton());
    return container;
  }

  function createTaskElement(
    taskTitle,
    dueDate,
    priority,
    project,
    isCompleted
  ) {
    // returns the task elements with relevant buttons etc.
    const container = document.createElement("li");
    container.className = "task";

    const elTitle = document.createElement("p");
    elTitle.className = "task-title";
    elTitle.textContent = taskTitle;

    // Will become a coloured SVG for the different priority levels
    const elPriority = document.createElement("div");
    elPriority.className = "task-priority";
    elPriority.textContent = priority;

    // Split off into another function???
    const taskPropertiesContainer = document.createElement("div");
    taskPropertiesContainer.className = "task-properties";

    const elDueDate = document.createElement("p");
    elDueDate.className = "task-due-date";
    elDueDate.textContent = dueDate;

    const elProject = document.createElement("p");
    elProject.className = "task-project";
    elProject.textContent = project;

    taskPropertiesContainer.append(elDueDate, elProject);

    container.append(elPriority, elTitle, taskPropertiesContainer);
    return container;
  }

  function renderTasks(tasks) {
    // Renders our list of tasks in the task area???
    // Maybe this could be passed a list of tasks whenever a filter is applied and it renders those tasks????
    const tasklist = document.createElement("ul");
    tasklist.id = "task-list";
    const taskElements = tasks.map((task) =>
      createTaskElement(
        task.taskTitle,
        task.taskDueDate,
        task.taskPriority,
        task.projectName,
        task.taskIsDone
      )
    );
    tasklist.append(...taskElements);
    return tasklist;
  }

  return setupTaskContainer;
})();

export default tasks;
