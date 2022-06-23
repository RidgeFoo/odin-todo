import svgInbox from "../../images/inbox-solid.svg";
import svgToday from "../../images/calendar-day-solid.svg";
import svgUpcoming from "../../images/calendar-days-solid.svg";
import svgChevronDown from "../../images/chevron-down-solid.svg";
import svgChevronRight from "../../images/chevron-right-solid.svg";
import PubSub from "../app/pubsub";

const sidebar = (function () {
  const quickFilters = [
    { name: "inbox", svg: svgInbox, topic: "/filterInbox" },
    { name: "today", svg: svgToday, topic: "/filterToday" },
    { name: "upcoming", svg: svgUpcoming, topic: "/filterUpcoming" },
  ];

  function selectDropDownChevron() {
    return document.getElementById("drop-down-chevron");
  }

  function createNav() {
    const nav = document.createElement("nav");
    const navContainer = document.createElement("div");
    navContainer.id = "nav-container";

    navContainer.append(
      createQuickFilterContainer(),
      createProjectsContainer()
    );
    nav.append(navContainer);
    return nav;
  }

  function createQuickFilterContainer() {
    const quickFilterContainer = document.createElement("div");
    quickFilterContainer.id = "quick-filters";
    const filters = quickFilters.map((filter) =>
      createQuickFilter(filter.name, filter.svg, filter.topic)
    );

    quickFilterContainer.append(...filters);

    return quickFilterContainer;
  }

  function createQuickFilter(name, svgPath, topic) {
    const quickFilter = document.createElement("button");
    quickFilter.className = "quick-filter";
    quickFilter.id = name;

    const img = document.createElement("img");
    img.src = svgPath;

    const label = document.createElement("span");
    label.textContent = name;
    label.className = "quick-filter-label";

    quickFilter.append(img, label);
    quickFilter.addEventListener("click", () =>
      PubSub.publish(topic, `The ${name} button was clicked!`)
    );

    return quickFilter;
  }

  function createProjectsContainer() {
    const container = document.createElement("div");
    container.className = "projects";

    container.appendChild(createProjectDropDown());
    return container;
  }

  function createProjectDropDown() {
    const dropDown = document.createElement("button");
    dropDown.id = "project-drop-down";

    const label = document.createElement("span");
    label.id = "project-label";
    label.textContent = "Projects";

    dropDown.append(createDropDownChevron(), label);

    dropDown.addEventListener("click", toggleProjectsDropDown);

    return dropDown;
  }

  function createDropDownChevron() {
    // Based on whether the user last toggled to display the projects we should use the that value
    const img = document.createElement("img");
    img.id = "drop-down-chevron";
    const displayProjects = JSON.parse(localStorage.getItem("displayProjects"));
    img.src = displayProjects ? svgChevronDown : svgChevronRight;
    return img;
  }

  function toggleProjectsDropDown() {
    // Honestly using PubSub for this may not really make sense
    PubSub.publish("/toggleStorageValue", "displayProjects");
    setDropDownChevron();
  }

  function setDropDownChevron() {
    selectDropDownChevron().replaceWith(createDropDownChevron());
  }

  PubSub.subscribe("/toggleProjects", toggleProjectsDropDown);

  return createNav();
})();

export default sidebar;
