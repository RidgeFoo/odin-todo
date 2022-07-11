import storage from "./storage";

const defaults = [
  { name: "displayProjects", value: false },
  {
    name: "todo",
    value: JSON.stringify({ projects: [{ name: "Inbox", tasks: [] }] }),
  },
];

storage.populateStorageWithDefaults(defaults);
