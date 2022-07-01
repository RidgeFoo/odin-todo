import svgInbox from "../../images/inbox-solid.svg";
import svgToday from "../../images/calendar-day-solid.svg";
import svgUpcoming from "../../images/calendar-days-solid.svg";
import svgChevronDown from "../../images/chevron-down-solid.svg";
import svgChevronRight from "../../images/chevron-right-solid.svg";
import PubSub from "../app/pubsub";
import { clearChildElements } from "./helpers";

const sidebar = (function () {
  const quickFilters = [
    { name: "inbox", svg: svgInbox, topic: "/filter" },
    { name: "today", svg: svgToday, topic: "/filter" },
    { name: "upcoming", svg: svgUpcoming, topic: "/filter" },
  ];

  PubSub.subscribe("/renderProjects", renderProjects);

  const quickFilterContainer = createQuickFilterContainer();
  const projectList = createProjectList();
  const dropDownChevronContainer = createDropDownChevronContainer();
  const projectDropDown = createProjectDropDown();
  const projectsContainer = createProjectsContainer();

  function createProjectList() {
    const list = document.createElement("ul");
    list.id = "project-list";
    return list;
  }

  function renderProjects(topic, projects) {
    // Projects is an array of names for the time being
    console.log("Rendering new projects");
    clearChildElements(projectList);
    projects.forEach((project) => {
      projectList.appendChild(createProjectElement(project));
    });
  }

  function createProjectElement(name) {
    const el = document.createElement("li");
    el.className = "project-selector";
    el.textContent = name;
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
    // TODO: Change this!
    quickFilter.addEventListener("click", () => PubSub.publish(topic, name));

    return quickFilter;
  }

  function createProjectsContainer() {
    const container = document.createElement("div");
    container.id = "projects-container";

    container.append(projectDropDown, projectList);
    return container;
  }

  function createProjectDropDown() {
    const dropDown = document.createElement("button");
    dropDown.id = "project-drop-down";

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
    container.appendChild(getDropDownChevron());
    return container;
  }

  function getDropDownChevron(display) {
    // TODO: Change the way this works to put the local storage stuff somewhere else???
    // Based on whether the user last toggled to display the projects we should use the that value
    const displayProjects = JSON.parse(localStorage.getItem("displayProjects"));
    const template = document.createElement("template");
    template.innerHTML = displayProjects ? svgChevronDown : svgChevronRight;
    template.content.firstChild.id = "chevron";
    return template.content.firstChild;
  }

  function toggleProjectsDropDown() {
    // TODO: Honestly using PubSub for this may not really make sense
    PubSub.publish("/toggleStorageValue", "displayProjects");
    dropDownChevronContainer.replaceChildren(getDropDownChevron());

    // TODO: Change this as it doesn't quite work - this whole toggling thing needs a rethink really
    projectList.classList.toggle("hidden");
  }

  function toggleProjects() {
    // Display the projects if the toggle value is set appropriately
  }

  return createNav();
})();

export default sidebar;
