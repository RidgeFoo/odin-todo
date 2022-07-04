import svgAdd from "../../images/plus-solid.svg";
import PubSub from "../app/pubsub";
import { clearChildElements } from "./helpers";

const tasks = (function () {
  const addTaskButton = createAddTaskButton();
  const taskList = createTaskListContainer();
  const taskContainer = createTasksContainer();
  const mainTitle = createMainTitle();
  const main = createMain();

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

  function createTaskListContainer() {
    const taskList = document.createElement("ul");
    taskList.id = "task-list";
    return taskList;
  }

  function createTasksContainer() {
    const container = document.createElement("div");
    container.id = "tasks";

    // Add task entries to this container accordingly
    container.append(taskList, addTaskButton);
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
    const elTaskProperties = document.createElement("div");
    elTaskProperties.className = "task-properties";

    const elDueDate = document.createElement("p");
    elDueDate.className = "task-due-date";
    elDueDate.textContent = dueDate.toDateString();

    const elProject = document.createElement("p");
    elProject.className = "task-project";
    elProject.textContent = project;

    elTaskProperties.append(elDueDate, elProject);

    container.append(elPriority, elTitle, elTaskProperties);
    return container;
  }

  function renderTasks(topic, tasks) {
    // Can be used to render the tasks that have been filtered by some other function
    clearChildElements(taskList);
    const taskElements = tasks.map((task) =>
      createTaskElement(
        task.taskTitle,
        task.taskDueDate,
        task.taskPriority,
        task.projectName,
        task.taskIsDone
      )
    );
    taskList.append(...taskElements);
  }

  function createMainTitle(title = "Tasks") {
    // TODO: Title should reflect the project / filter selected
    const elTitle = document.createElement("h1");
    elTitle.textContent = title;
    return elTitle;
  }

  function createMain() {
    const main = document.createElement("div");
    main.id = "main";
    main.append(mainTitle, taskContainer);
    return main;
  }

  PubSub.subscribe("/taskListUpdated", renderTasks);

  return main;
})();

export default tasks;
