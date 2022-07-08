import svgInbox from "../../images/inbox-solid.svg";
import svgToday from "../../images/calendar-day-solid.svg";
import svgUpcoming from "../../images/calendar-days-solid.svg";
import svgChevronDown from "../../images/chevron-down-solid.svg";
import svgChevronRight from "../../images/chevron-right-solid.svg";
import svgAdd from "../../images/plus-solid.svg";
import PubSub from "../app/pubsub";
import { clearChildElements } from "./helpers";
import tippy from "tippy.js";

const quickFilters = [
  { name: "Inbox", svg: svgInbox, topic: "/filterByProject" },
  { name: "Today", svg: svgToday, topic: "/filterByPeriod" },
  { name: "Upcoming", svg: svgUpcoming, topic: "/filterByPeriod" },
];

PubSub.subscribe("/renderProjects", renderProjects);

const initialProjectToggleStatus = getProjectToggleStatus() || false;
const quickFilterContainer = createQuickFilterContainer();
const projectList = createProjectList();
const addProjectButton = createAddProjectButton();
const dropDownChevronContainer = createDropDownChevronContainer();
const projectDropDown = createProjectDropDown();
const projectsHeader = createProjectsHeader();
const projectsContainer = createProjectsContainer();

function createProjectList() {
  const list = document.createElement("ul");
  list.id = "project-list";
  if (!initialProjectToggleStatus) list.classList.add("hidden");
  return list;
}

function renderProjects(topic, projects) {
  // Projects is an array of names for the time being
  console.log("Rendering new projects");
  clearChildElements(projectList);
  projects
    .filter((i) => i !== "Inbox") // A bit messy doing something like this
    .forEach((project) => {
      projectList.appendChild(createProjectElement(project));
    });
}

function createProjectElement(name) {
  const el = document.createElement("li");
  el.className = "project-filter";
  el.textContent = name;
  el.addEventListener("click", () => PubSub.publish("/filterByProject", name));
  return el;
}

function createNav() {
  const nav = document.createElement("nav");
  const navContainer = document.createElement("div");
  navContainer.id = "nav-container";

  navContainer.append(quickFilterContainer, projectsContainer);
  nav.append(navContainer);
  return nav;
}

function createQuickFilterContainer() {
  const quickFilterContainer = document.createElement("div");
  quickFilterContainer.id = "quick-filters";

  quickFilters.forEach((filter) =>
    quickFilterContainer.appendChild(
      createQuickFilter(filter.name, filter.svg, filter.topic)
    )
  );

  return quickFilterContainer;
}

function createQuickFilter(name, svg, topic) {
  const quickFilter = document.createElement("button");
  quickFilter.className = "quick-filter";
  quickFilter.id = name;

  quickFilter.insertAdjacentHTML("afterbegin", svg);

  const label = document.createElement("span");
  label.textContent = name;
  label.className = "quick-filter-label";

  quickFilter.append(label);
  quickFilter.addEventListener("click", () => PubSub.publish(topic, name));

  return quickFilter;
}

function createProjectsContainer() {
  const container = document.createElement("div");
  container.id = "projects-container";

  container.append(projectsHeader, projectList);
  return container;
}

function createProjectsHeader() {
  const div = document.createElement("div");
  div.id = "projects-header";
  div.append(projectDropDown, addProjectButton);
  return div;
}

function createAddProjectButton() {
  const btn = document.createElement("button");
  btn.id = "add-project";
  btn.innerHTML = svgAdd;
  btn.addEventListener("click", (event) => console.log(event));
  tippy(btn, { content: "Add project", arrow: false });
  return btn;
}

function createProjectDropDown() {
  const dropDown = document.createElement("button");
  dropDown.id = "project-dropdown";

  const label = document.createElement("span");
  label.className = "project-label";
  label.textContent = "Projects";

  dropDown.append(dropDownChevronContainer, label);
  dropDown.addEventListener("click", toggleProjectsDropDown);
  return dropDown;
}

function createDropDownChevronContainer() {
  const container = document.createElement("div");
  container.id = "chevron-container";
  container.appendChild(getDropDownChevron(initialProjectToggleStatus));
  return container;
}

function getDropDownChevron(isDisplayed) {
  // Based on whether the user last toggled to display the projects we should use the that value
  const template = document.createElement("template");
  template.innerHTML = isDisplayed ? svgChevronDown : svgChevronRight;
  template.content.firstChild.id = "chevron";
  return template.content.firstChild;
}

function toggleProjectsDropDown() {
  // TODO: Honestly using PubSub for this may not really make sense
  PubSub.publish("/toggleStorageValue", "displayProjects");
  const displayProjects = getProjectToggleStatus();
  dropDownChevronContainer.replaceChildren(getDropDownChevron(displayProjects));
  displayProjects
    ? projectList.classList.remove("hidden")
    : projectList.classList.add("hidden");
}

function getProjectToggleStatus() {
  return JSON.parse(localStorage.getItem("displayProjects"));
}

export default createNav();
