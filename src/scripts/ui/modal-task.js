import PubSub from "../app/pubsub";
import { clearChildElements } from "./helpers";

const defaultProject = "Inbox";
let projectList; // used for the project drop down
let isEdit;
let originalTask; // used when we are editing a task so that we can remove the "old" pre-edit task;

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

const defaultTaskObject = {
  project: null,
  title: null,
  priority: null,
  dueDate: null,
};

const [btnAdd, btnCancel] = buttons.map(createButtonElement);

let taskPropertiesContainer;
let inputTitle;
let inputDueDate;
let priorityDropDown;
let projectDropDown;
let form;

const buttonContainer = createButtonContainer();
const modal = createModal();

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

function getFormValidity() {
  return form.checkValidity();
}

function createButtonContainer() {
  const container = document.createElement("div");
  container.id = "modal-buttons";
  container.append(btnCancel, btnAdd);
  return container;
}

function renderPriorityDropDown(taskPriority = null) {
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
    taskPriority === priority ? option.setAttribute("selected", "") : null;

    priorities.appendChild(option);
  });

  container.append(label, priorities);

  priorityDropDown = container;
}

function renderInputTitle(currentTitle = null) {
  const taskInput = document.createElement("input");
  taskInput.setAttribute("name", "title");
  taskInput.setAttribute("required", "");
  taskInput.setAttribute("type", "text");
  taskInput.setAttribute("placeHolder", "e.g. Take over the world!");
  taskInput.id = "title";
  if (currentTitle) taskInput.setAttribute("value", currentTitle);

  inputTitle = taskInput;
}

function renderInputDueDate(currentDueDate = null) {
  const container = document.createElement("div");
  container.id = "set-date";
  container.className = "task-property";

  const dueDate = document.createElement("input");
  dueDate.id = "due-date";
  dueDate.setAttribute("type", "date");
  dueDate.setAttribute("name", "dueDate");
  dueDate.setAttribute("required", "");
  if (currentDueDate)
    dueDate.setAttribute("value", currentDueDate.toISOString().slice(0, 10));

  const dueDateLabel = document.createElement("label");
  dueDateLabel.setAttribute("for", "due-date");
  dueDateLabel.textContent = "Due Date";

  container.append(dueDateLabel, dueDate);
  inputDueDate = container;
}

function createProjectListOption(project, currentProject = null) {
  const option = document.createElement("option");
  option.setAttribute("value", project);
  option.textContent = project;
  if (currentProject === project) {
    option.setAttribute("selected", "");
  } else if (!currentProject & (project === defaultProject)) {
    option.setAttribute("selected", "");
  }

  return option;
}

function updateProjectList(topic, projects) {
  projectList = projects.sort();
}

function renderProjectDropDown(currentProject = null) {
  const container = document.createElement("div");
  container.id = "set-project";
  container.className = "task-property";

  const label = document.createElement("label");
  label.textContent = "Project";
  label.setAttribute("for", "projectName");

  const defaultProject = "Inbox";
  const select = document.createElement("select");
  select.id = "project";
  select.setAttribute("name", "projectName");

  projectList.forEach((project) =>
    select.appendChild(createProjectListOption(project, currentProject))
  );

  container.append(label, select);

  projectDropDown = container;
}

function toggleButtonColour() {
  if (getFormValidity()) {
    btnAdd.classList.add("form-valid");
  } else {
    btnAdd.classList.remove("form-valid");
  }
}

function renderTaskPropertiesContainer() {
  const container = document.createElement("div");
  container.id = "modal-task-properties";
  container.append(inputDueDate, priorityDropDown, projectDropDown);
  taskPropertiesContainer = container;
}

function renderForm() {
  form = document.createElement("form");
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
}

function renderInputs({ projectName, title, dueDate, priority }) {
  renderInputTitle(title);
  renderInputDueDate(dueDate);
  renderPriorityDropDown(priority);
  renderProjectDropDown(projectName);
  renderTaskPropertiesContainer();
  form.append(inputTitle, taskPropertiesContainer, buttonContainer);
}

function renderModal(taskObj) {
  renderForm();
  renderInputs(taskObj);
  toggleButtonColour();
  clearChildElements(modal);
  modal.append(form);
  modal.showModal();
}

function editTask(topic, taskObj) {
  isEdit = true;
  originalTask = taskObj;
  renderModal(taskObj);
}

function addTask(topic) {
  isEdit = false;
  renderModal(defaultTaskObject);
}

function sendFormData() {
  /* TODO: This could check if it is an edit or create task modal type
    If an edit then it needs to also publish a remove task event for the "original" task */
  const formData = Object.fromEntries(new FormData(form));
  if (isEdit) {
    PubSub.publish("/editTask", {
      originalTask,
      editedTask: formData,
    });
  } else {
    PubSub.publish("/createTask", formData);
  }
}

PubSub.subscribe("/addTaskModal", addTask);
PubSub.subscribe("/editTaskModal", editTask);
PubSub.subscribe("/renderProjects", updateProjectList);

export default modal;
