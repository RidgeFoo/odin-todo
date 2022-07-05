import PubSub from "../app/pubsub";
import { clearChildElements } from "./helpers";

/*
We can use this to act as our edit or add task modal
If the modal is called from an add task "path" then the inputs should have no values
and the button should be an "Add" button.

If the modal is called from an edit task "path" then the inputs should be populated
with the task values. An "Apply Changes" button should replace the "Add" button.
When the "Apply" button is clicked then the original task should be deleted and a new
task created. This is for simplicity as the user may change the project of the task.

We recreate the form depending on the path???
Replace with within the dialog?

We render the form accordingly
*/

PubSub.subscribe("/addTaskModal", () => modal.showModal());
PubSub.subscribe("/editTaskModal", populateForm); // TODO change this appropriately
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
    funcEventListener: () => modal.close(),
  },
];

const [btnAdd, btnCancel] = buttons.map(createButtonElement);
const inputTitle = createInputTitle();
const inputDueDate = createInputDueDate();
const inputPriority = createPriorityDropDown();
const projectListContainer = createProjectListContainer();
const projectDropDown = createProjectDropDown();
const taskPropertiesContainer = createTaskPropertiesContainer();
const buttonContainer = createButtonContainer();
const form = createForm();
const modal = createModal();

function createButtonElement({ type, id, text, funcEventListener }) {
  const button = document.createElement("button");
  button.setAttribute("type", type);
  button.id = id;
  button.textContent = text;
  if (funcEventListener) button.addEventListener("click", funcEventListener);
  return button;
}

function createButtonContainer() {
  const container = document.createElement("div");
  container.id = "modal-buttons";
  container.append(btnCancel, btnAdd);
  return container;
}

function createForm() {
  const form = document.createElement("form");
  form.setAttribute("method", "dialog");
  form.addEventListener("change", toggleButtonColour);
  form.append(inputTitle, taskPropertiesContainer, buttonContainer);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.checkValidity()) {
      sendFormData();
      toggleButtonColour();
      modal.close();
      form.reset();
    }
  });

  return form;
}

function createTaskPropertiesContainer() {
  const container = document.createElement("div");
  container.id = "modal-task-properties";
  container.append(inputDueDate, inputPriority, projectDropDown);
  return container;
}

function createPriorityDropDown() {
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
    option.setAttribute("value", priority.toLowerCase());
    option.textContent = priority;

    priorities.appendChild(option);
  });

  container.append(label, priorities);

  return container;
}

function createProjectDropDown() {
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

function createInputTitle() {
  const taskInput = document.createElement("input");
  taskInput.setAttribute("name", "taskTitle");
  taskInput.setAttribute("required", "");
  taskInput.setAttribute("type", "text");
  taskInput.setAttribute("placeHolder", "e.g. Take over the world!");
  taskInput.id = "task-title";
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

  const dueDateLabel = document.createElement("label");
  dueDateLabel.setAttribute("for", "due-date");
  dueDateLabel.textContent = "Due Date";

  container.append(dueDateLabel, dueDate);
  return container;
}

function createProjectListContainer() {
  const container = document.createElement("datalist");
  container.id = "projects";
  return container;
}

function createDataListOption(value) {
  const option = document.createElement("option");
  option.setAttribute("value", value);
  return option;
}

function renderProjectList(topic, projects) {
  clearChildElements(projectListContainer);

  projects
    .sort()
    .forEach((project) =>
      projectListContainer.appendChild(createDataListOption(project))
    );
}

function toggleButtonColour() {
  if (form.checkValidity()) {
    btnAdd.classList.add("form-valid");
  } else {
    btnAdd.classList.remove("form-valid");
  }
}

// TODO: Implement this - how to handle projects
function populateForm({ projectName, taskTitle, taskDueDate, taskPriority }) {
  inputDueDate.setAttribute("value", taskDueDate);
  inputTitle.setAttribute("value", taskTitle);
  inputPriority.setAttribute("value", taskPriority);
  modal.showModal();
}

function createModal() {
  const modal = document.createElement("dialog");
  modal.append(form);
  return modal;
}

function sendFormData() {
  /* TODO: This could check if it is an edit or create task modal type
    If an edit then it needs to also publish a remove task event for the "original" task */
  const formData = Object.fromEntries(new FormData(form));
  PubSub.publish("/createTask", formData);
}

export default modal;
