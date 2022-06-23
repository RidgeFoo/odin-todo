import svgCheck from "../../images/check-solid.svg";
import svgPlus from "../../images/plus-solid.svg";
import pubsub from "../app/pubsub.js";
import tippy from "tippy.js";
import storage from "./storage";

const header = (function () {
  function createHeader() {
    const header = document.createElement("header");
    header.append(createLogo(), createAddTask());
    return header;
  }

  function createLogo() {
    const logoContainer = document.createElement("div");
    const title = document.createElement("h1");
    const imgLogo = document.createElement("img");

    logoContainer.className = "logo-container";
    title.textContent = "GoDo";
    imgLogo.src = svgCheck;

    logoContainer.append(title, imgLogo);
    return logoContainer;
  }

  function createAddTask() {
    const btnAddTask = document.createElement("button");
    btnAddTask.id = "add-task";
    tippy(btnAddTask, { content: "Add Task", arrow: false, delay: [500, 200] });

    const imgPlus = document.createElement("img");
    imgPlus.src = svgPlus;

    btnAddTask.append(imgPlus);

    btnAddTask.addEventListener("click", () => pubsub.publish("/addTask"));
    return btnAddTask;
  }

  return createHeader();
})();

export default header;
