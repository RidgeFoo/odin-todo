/* eslint-disable no-use-before-define */
import PubSub from "../app/pubsub";

const modal = renderModal();

function renderModal() {
  const dialog = document.createElement("dialog");
  dialog.id = "modal-project";

  const form = document.createElement("form");
  form.id = "form-project";
  form.addEventListener("submit", sendFormData);

  const input = document.createElement("input");
  input.id = "project-name";
  input.setAttribute("name", "projectName");
  input.setAttribute("type", "text");
  input.setAttribute("required", "");
  input.setAttribute("placeholder", "e.g. Chores");

  const btnContainer = document.createElement("div");
  btnContainer.className = "modal-buttons";

  const btnSave = document.createElement("button");
  btnSave.className = "btn-save";
  btnSave.setAttribute("type", "submit");
  btnSave.textContent = "Save";

  const btnCancel = document.createElement("button");
  btnCancel.className = "btn-cancel";
  btnCancel.setAttribute("type", "reset");
  btnCancel.textContent = "Cancel";
  btnCancel.addEventListener("click", closeModal);

  btnContainer.append(btnCancel, btnSave);

  form.append(input, btnContainer);
  dialog.appendChild(form);
  return dialog;
}

export function showModal() {
  modal.showModal();
}

function closeModal() {
  modal.close();
}

function sendFormData(event) {
  event.preventDefault();
  const form = event.target;
  const formData = Object.fromEntries(new FormData(form));
  PubSub.publish("/createProject", formData.projectName);
  form.reset();
  closeModal();
}

export default modal;
