import storage from "../ui/storage";
import Project from "../app/project";
import Task from "../app/task";

export default (function () {
  const defaults = [
    { name: "displayProjects", value: false },
    {
      name: "projects",
      value: Project("Inbox", "Blue", [
        Task("Default Task", "2022-12-31", "Low"),
      ]).toJSON(),
    },
  ];

  storage.populateStorageWithDefaults(defaults);
})();
