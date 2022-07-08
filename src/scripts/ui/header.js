import svgCheck from "../../images/check-solid.svg";
import svgPlus from "../../images/plus-solid.svg";
import pubsub from "../app/pubsub.js";
import tippy from "tippy.js";

function createHeader() {
  const header = document.createElement("header");
  header.append(createLogo(), createAddTask());
  return header;
}

function createLogo() {
  const logoContainer = document.createElement("div");
  const title = document.createElement("h1");

  logoContainer.className = "logo-container";
  title.textContent = "GoDo";

  logoContainer.append(title);
  logoContainer.insertAdjacentHTML("beforeend", svgCheck);
  return logoContainer;
}

function createAddTask() {
  const btnAddTask = document.createElement("button");
  btnAddTask.id = "add-task";
  tippy(btnAddTask, { content: "Add Task", arrow: false });

  btnAddTask.innerHTML = svgPlus;

  btnAddTask.addEventListener("click", () => pubsub.publish("/addTaskModal"));
  return btnAddTask;
}

export default createHeader();
