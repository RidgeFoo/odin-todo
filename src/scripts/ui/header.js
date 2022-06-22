import svgCheck from "../../images/check-solid.svg";
import svgPlus from "../../images/plus-solid.svg";
import pubsub from "../app/pubsub.js";
import tippy from "tippy.js";

const header = (function () {
  function getHeaderElement() {
    const header = document.createElement("header");
    header.append(getLogoElement(), getAddTaskElement());
    return header;
  }

  function getLogoElement() {
    const logoContainer = document.createElement("div");
    const title = document.createElement("h1");
    const imgLogo = document.createElement("img");

    logoContainer.className = "logo-container";
    title.textContent = "GoDo";
    imgLogo.src = svgCheck;

    logoContainer.append(title, imgLogo);
    return logoContainer;
  }

  function getAddTaskElement() {
    const btnAddTask = document.createElement("button");
    btnAddTask.id = "add-task";
    tippy(btnAddTask, { content: "Add Task", arrow: false, delay: [500, 200] });

    const imgPlus = document.createElement("img");
    imgPlus.src = svgPlus;

    btnAddTask.append(imgPlus);

    btnAddTask.addEventListener("click", () =>
      pubsub.publish("/addTask", "The add task button was clicked")
    );
    return btnAddTask;
  }

  return getHeaderElement();
})();

export default header;
