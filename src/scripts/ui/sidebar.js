import svgInbox from "../../images/inbox-solid.svg";
import svgToday from "../../images/calendar-day-solid.svg";
import svgUpcoming from "../../images/calendar-days-solid.svg";
import PubSub from "../app/pubsub";

const sidebar = (function () {
  const quickFilters = [
    { name: "inbox", svg: svgInbox, topic: "/filterInbox" },
    { name: "today", svg: svgToday, topic: "/filterToday" },
    { name: "upcoming", svg: svgUpcoming, topic: "/filterUpcoming" },
  ];

  function getNav() {
    const nav = document.createElement("nav");
    const navContainer = document.createElement("div");
    navContainer.id = "nav-container";

    navContainer.append(getQuickFilterContainer());
    nav.append(navContainer);
    return nav;
  }

  function getQuickFilterContainer() {
    const quickFilterContainer = document.createElement("div");
    quickFilterContainer.id = "quick-filters";
    const filters = quickFilters.map((filter) =>
      getQuickFilter(filter.name, filter.svg, filter.topic)
    );

    quickFilterContainer.append(...filters);

    return quickFilterContainer;
  }

  function getQuickFilter(name, svgPath, topic) {
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

  function getProjectsElement() {}

  return getNav();
})();

export default sidebar;
