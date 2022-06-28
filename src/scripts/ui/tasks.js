import svgAdd from "../../images/plus-solid.svg";
import PubSub from "../app/pubsub";

const tasks = (function () {
  function setupTaskContainer() {
    const container = document.createElement("div");
    container.id = "tasks-container";
    container.append(createTitle(), createTasks());
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

  function createTasks() {
    const container = document.createElement("div");
    container.id = "tasks";

    // Add task entries to this container accordingly

    container.append(renderTasks(), createAddTaskButton());
    return container;
  }

  function createTaskElement(taskTitle, dueDate, priority, project) {
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

  function renderTasks() {
    // Renders our list of tasks in the task area???
    const tasklist = document.createElement("ul");
    tasklist.id = "task-list";
    tasklist.append(
      createTaskElement("I'm a task title", "2022/01/01", "Low", "Inbox")
    );
    return tasklist;
  }

  return setupTaskContainer();
})();

export default tasks;
