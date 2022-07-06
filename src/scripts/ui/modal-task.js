import PubSub from "../app/pubsub";
import { clearChildElements } from "./helpers";

const defaultProject = "Inbox";
PubSub.subscribe("/addTaskModal", renderTaskModal);
PubSub.subscribe("/editTaskModal", renderTaskModal);
PubSub.subscribe("/renderProjects", renderProjectList);

const buttons = [
  {
    type: "submit",
    id: "btn-add-task",
    text: "Save",
  },
  {
    type: "reset",
    id: "btn-cancel",
    text: "Cancel",
    funcEventListener: () => {
      modal.close();
      toggleButtonColour();
    },
  },
];

const [btnAdd, btnCancel] = buttons.map(createButtonElement);
const taskPropertiesContainer = createTaskPropertiesContainer();
const projectOptions = createProjectSelect();
const projectLabel = createProjectLabel();
const buttonContainer = createButtonContainer();
const form = createForm();
const modal = createModal();

// This is only populated when we are editing a task
let taskToEdit;
function createButtonElement({ type, id, text, funcEventListener }) {
  const button = document.createElement("button");
  button.setAttribute("type", type);
  button.id = id;
  button.textContent = text;
  if (funcEventListener) button.addEventListener("click", funcEventListener);
  return button;
}

function createModal() {
  const modal = document.createElement("dialog");
  return modal;
}

function createForm() {
  const form = document.createElement("form");
  form.setAttribute("method", "dialog");
  form.addEventListener("change", toggleButtonColour);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (getFormValidity()) {
      sendFormData();
      toggleButtonColour();
      modal.close();
    }
  });

  return form;
}

function getFormValidity() {
  return form.checkValidity();
}

function createButtonContainer() {
  const container = document.createElement("div");
  container.id = "modal-buttons";
  container.append(btnCancel, btnAdd);
  return container;
}

function createTaskPropertiesContainer() {
  const container = document.createElement("div");
  container.id = "modal-task-properties";
  return container;
}

function createPriorityDropDown(taskPriority = null) {
  const options = ["Low", "Medium", "High"];

  const container = document.createElement("div");
  container.id = "set-priority";
  container.className = "task-property";

  const priorities = document.createElement("select");
  priorities.id = "priority";
  priorities.setAttribute("name", "priority");

  const label = document.createElement("label");
  label.setAttribute("for", "priority");
  label.textContent = "Priority";

  options.forEach((priority) => {
    const option = document.createElement("option");
    option.setAttribute("value", priority);
    option.textContent = priority;
    // For editing task select the current priority level for the task
    if (taskToEdit) {
      taskToEdit.taskPriority === priority
        ? option.setAttribute("selected", "")
        : null;
    }

    priorities.appendChild(option);
  });

  container.append(label, priorities);

  return container;
}

function createProjectDropDown() {
  const container = document.createElement("div");
  container.id = "set-project";
  container.className = "task-property";

  container.append(projectLabel, projectOptions);

  return container;
}

function createProjectLabel() {
  const label = document.createElement("label");
  label.textContent = "Project";
  label.setAttribute("for", "projectName");
  return label;
}

function createProjectSelect() {
  const defaultProject = "Inbox";
  const select = document.createElement("select");
  select.id = "project";
  select.setAttribute("name", "projectName");
  return select;
}

function createInputTitle() {
  const taskInput = document.createElement("input");
  taskInput.setAttribute("name", "title");
  taskInput.setAttribute("required", "");
  taskInput.setAttribute("type", "text");
  taskInput.setAttribute("placeHolder", "e.g. Take over the world!");
  taskInput.id = "title";
  if (taskToEdit) {
    taskInput.setAttribute("value", taskToEdit.taskTitle);
  }
  return taskInput;
}

function createInputDueDate() {
  const container = document.createElement("div");
  container.id = "set-date";
  container.className = "task-property";

  const dueDate = document.createElement("input");
  dueDate.id = "due-date";
  dueDate.setAttribute("type", "date");
  dueDate.setAttribute("name", "dueDate");
  dueDate.setAttribute("required", "");

  if (taskToEdit) {
    dueDate.setAttribute(
      "value",
      taskToEdit.taskDueDate.toISOString().slice(0, 10)
    );
  }

  const dueDateLabel = document.createElement("label");
  dueDateLabel.setAttribute("for", "due-date");
  dueDateLabel.textContent = "Due Date";

  container.append(dueDateLabel, dueDate);
  return container;
}

function createProjectListOption(project) {
  const option = document.createElement("option");
  option.setAttribute("value", project);
  option.textContent = project;

  if (taskToEdit) {
    if (taskToEdit.projectName === project) option.setAttribute("selected", "");
  } else if (project === defaultProject) {
    option.setAttribute("selected", "");
  }
  return option;
}

function renderProjectList(topic, projects) {
  clearChildElements(projectOptions);
  projects
    .sort()
    .forEach((project) =>
      projectOptions.appendChild(createProjectListOption(project))
    );
}

function toggleButtonColour() {
  if (getFormValidity()) {
    btnAdd.classList.add("form-valid");
  } else {
    btnAdd.classList.remove("form-valid");
  }
}

function renderContainerTaskProperties() {
  clearChildElements(taskPropertiesContainer);
  taskPropertiesContainer.append(
    createInputDueDate(),
    createPriorityDropDown(),
    createProjectDropDown()
  );
}

function renderTaskForm() {
  clearChildElements(form);
  renderContainerTaskProperties();
  form.append(createInputTitle(), taskPropertiesContainer, buttonContainer);
}

function renderTaskModal(topic, taskObj = null) {
  taskToEdit = taskObj;
  renderTaskForm();
  modal.append(form);
  modal.showModal();
}

function sendFormData() {
  /* TODO: This could check if it is an edit or create task modal type
    If an edit then it needs to also publish a remove task event for the "original" task */
  const formData = Object.fromEntries(new FormData(form));
  PubSub.publish("/createTask", formData);
}

export default modal;
