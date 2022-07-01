import PubSub from "../app/pubsub";
import { clearChildElements } from "./helpers";

export default (function () {
  const taskInput = createTaskInput();
  const projectListContainer = createProjectListContainer();
  const projectDropDown = createProjectDropDown();
  const dueDate = createDueDateInput();
  const prioritiesDropDown = createPriorityDropDown();
  const taskProperties = createTaskProperties();
  const buttons = createFormButtons();
  const btnAdd = buttons.querySelector("#btn-add-task");

  const form = createTaskForm();
  const modal = createModal();

  PubSub.subscribe("/taskModal", toggleModal);
  PubSub.subscribe("/renderProjects", renderProjectList);

  function createTaskInput() {
    const taskInput = document.createElement("input");
    taskInput.setAttribute("name", "taskTitle");
    taskInput.setAttribute("required", "");
    taskInput.setAttribute("type", "text");
    taskInput.setAttribute("placeHolder", "e.g. Take over the world!");
    taskInput.id = "task-title";

    return taskInput;
  }

  function createTaskProperties() {
    const container = document.createElement("div");
    container.id = "modal-task-properties";
    container.append(dueDate, prioritiesDropDown, projectDropDown);
    return container;
  }

  function createDueDateInput() {
    const container = document.createElement("div");
    container.id = "set-date";
    container.className = "task-property";

    const dueDate = document.createElement("input");
    dueDate.id = "due-date";
    dueDate.setAttribute("type", "date");
    dueDate.setAttribute("name", "dueDate");
    dueDate.setAttribute("required", "");

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", "due-date");
    dueDateLabel.textContent = "Due Date";

    container.append(dueDateLabel, dueDate);
    return container;
  }

  function createPriorityDropDown() {
    const container = document.createElement("div");
    container.id = "set-priority";
    container.className = "task-property";

    const priorities = document.createElement("select");
    priorities.id = "priority";
    priorities.setAttribute("name", "priority");

    const label = document.createElement("label");
    label.setAttribute("for", "priority");
    label.textContent = "Priority";

    const options = ["Low", "Medium", "High"];

    options.forEach((priority) => {
      let option = document.createElement("option");
      option.setAttribute("value", priority.toLowerCase());
      option.textContent = priority;

      priorities.appendChild(option);
    });

    container.append(label, priorities);

    return container;
  }

  function createProjectListContainer() {
    const container = document.createElement("datalist");
    container.id = "projects";
    return container;
  }

  function renderProjectList(topic, projects) {
    clearChildElements(projectListContainer);
    projects.sort().forEach((project) => {
      projectListContainer.appendChild(createDataListOption(project));
    });
  }

  function createDataListOption(value) {
    const option = document.createElement("option");
    option.setAttribute("value", value);
    return option;
  }

  function createProjectDropDown() {
    const projects = ["Inbox", "Work"];

    // Could allow the user to input a new project and create that project
    const container = document.createElement("div");
    container.id = "set-project";
    container.className = "task-property";

    const label = document.createElement("label");
    label.textContent = "Project";
    label.setAttribute("for", "project");

    const dropDown = document.createElement("input");
    dropDown.id = "project";
    dropDown.setAttribute("name", "project");
    dropDown.setAttribute("list", "projects");
    dropDown.setAttribute("required", "");

    container.append(label, dropDown, projectListContainer);

    return container;
  }

  function createFormButtons() {
    const container = document.createElement("div");
    container.id = "modal-buttons";

    const btnAdd = document.createElement("button");
    btnAdd.setAttribute("type", "submit");
    btnAdd.textContent = "Add Task";
    btnAdd.id = "btn-add-task";

    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Cancel";
    btnCancel.setAttribute("type", "reset");
    btnCancel.id = "btn-cancel";

    btnCancel.addEventListener("click", toggleModal);

    container.append(btnCancel, btnAdd);
    return container;
  }

  function createTaskForm() {
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.addEventListener("change", toggleAddTaskButtonColour);

    form.append(taskInput, taskProperties, buttons);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (form.checkValidity()) {
        sendFormData();
        toggleModal();
        form.reset();
        toggleAddTaskButtonColour();
      }
    });

    return form;
  }

  function toggleAddTaskButtonColour() {
    if (form.checkValidity()) {
      btnAdd.classList.add("form-valid");
    } else {
      btnAdd.classList.remove("form-valid");
    }
  }

  function createModal() {
    const modal = document.createElement("dialog");
    modal.append(form);
    return modal;
  }

  function toggleModal() {
    modal.open ? modal.close() : modal.showModal();
  }

  function sendFormData() {
    const formData = Object.fromEntries(new FormData(form));
    PubSub.publish("/createTask", formData);
  }

  return modal;
})();
