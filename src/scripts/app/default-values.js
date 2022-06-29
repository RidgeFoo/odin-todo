import storage from "./storage";
import Todo from "../app/todo";

export default (function () {
  const defaults = [
    { name: "displayProjects", value: false },
    // {
    //   name: "todo",
    //   value: Project("Inbox", [
    //     Task("Default Task", "2022-12-31", "Low"),
    //   ]).toJSON(),
    // },
  ];

  storage.populateStorageWithDefaults(defaults);
})();
