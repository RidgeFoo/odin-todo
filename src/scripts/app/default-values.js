import storage from "./storage";

export default (function () {
  const defaults = [
    { name: "displayProjects", value: false },
    {
      name: "todo",
      value: JSON.stringify({ projects: [{ name: "Inbox", tasks: [] }] }),
    },
  ];

  storage.populateStorageWithDefaults(defaults);
})();
