import PubSub from "./pubsub";

const storage = (function () {
  function populateStorageWithDefaults(defaults) {
    defaults.forEach((x) => {
      if (!localStorage.getItem(x.name)) {
        localStorage.setItem(x.name, x.value);
      }
    });
  }

  function toggleStorageValue(topic, key) {
    const currentValue = JSON.parse(localStorage.getItem(key));

    if (typeof currentValue !== Boolean)
      Error("The value you are trying to toggle is not a boolean");

    localStorage.setItem(key, JSON.stringify(!currentValue));
  }

  PubSub.subscribe("/toggleStorageValue", toggleStorageValue);

  return { populateStorageWithDefaults };

  // Maybe put the serialisation logic in here for projects and tasks?
})();

export default storage;
