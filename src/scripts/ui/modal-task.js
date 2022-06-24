import PubSub from "../app/pubsub";

export default (function () {
  const modal = document.createElement("dialog");

  function setupModal() {
    modal.append(createTaskForm());
  }

  function createTaskTitle() {
    const container = document.createElement("div");
    container.id = "container-task-title";
    const taskInput = document.createElement("input");
    const taskLabel = document.createElement("label");

    taskInput.setAttribute("name", "taskTitle");
    taskInput.setAttribute("required", "");
    taskInput.setAttribute("type", "text");
    taskInput.setAttribute("placeHolder", "e.g. Take over the world!");
    taskInput.id = "taskTitle";

    taskLabel.setAttribute("for", "taskTitle");
    taskLabel.textContent = "Task Title: ";
    container.append(taskLabel, taskInput);
    return container;
  }

  function createTaskProperties() {
    const container = document.createElement("div");
    container.id = "modal-task-properties";

    const dueDate = document.createElement("input");
    dueDate.id = "dueDate";
    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", "dueDate");
    dueDateLabel.textContent = "Due Date: ";
    dueDate.setAttribute("type", "date");

    container.append(dueDate);

    return container;
  }

  function createFormButtons() {
    const container = document.createElement("div");
    container.id = "modal-buttons";

    const btnAdd = document.createElement("button");
    btnAdd.setAttribute("type", "submit");
    const btnCancel = document.createElement("button");
    btnAdd.textContent = "Add Task";
    btnCancel.textContent = "Cancel";
    btnCancel.setAttribute("type", "reset");

    btnCancel.addEventListener("click", toggleModal);
    container.append(btnCancel, btnAdd);

    return container;
  }

  function createTaskForm() {
    const form = document.createElement("form");

    form.append(createTaskTitle(), createTaskProperties(), createFormButtons());

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (form.checkValidity()) toggleModal();
    });

    return form;
  }

  function toggleModal() {
    modal.open ? modal.close() : modal.showModal();
  }

  setupModal();
  PubSub.subscribe("/addTask", toggleModal);

  return modal;
})();
