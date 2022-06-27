import svgAdd from "../../images/plus-solid.svg";
import PubSub from "../app/pubsub";

const tasks = (function () {
  function setupTasksContainer() {
    const container = document.createElement("div");
    container.id = "tasks";

    container.append(createTitle(), createAddTaskButton());
    return container;
  }

  function createAddTaskButton() {
    const button = document.createElement("button");
    button.id = "tasks-add-task";

    const label = document.createElement("span");
    label.textContent = "Add task";

    button.insertAdjacentHTML("afterbegin", svgAdd);

    button.append(label);

    button.addEventListener("click", () => PubSub.publish("/addTask"));

    return button;
  }

  function createTitle() {
    // Title should reflect the project / filter selected
    const title = document.createElement("h1");
    title.textContent = "Tasks";
    return title;
  }

  function createTaskEntries() {
    // returns the task elements with relevant buttons etc.
  }

  return setupTasksContainer();
})();

export default tasks;
