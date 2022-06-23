import PubSub from "../app/pubsub";

const storage = (function () {
  const defaults = [{ name: "displayProjects", value: false }];

  function getDefaultValue(name) {
    return defaults.filter((x) => x.name === name)[0];
  }

  function populateStorage() {
    defaults.forEach((x) => {
      if (!localStorage.getItem(x.name)) {
        updateStorageValue(x.name, x.value);
      }
    });
  }

  function updateStorageValue(key, value) {
    localStorage.setItem(key, value);
  }

  function toggleStorageValue(topic, key) {
    const currentValue = JSON.parse(localStorage.getItem(key));

    if (typeof currentValue !== Boolean)
      Error("The value you are trying to toggle is not a boolean");

    localStorage.setItem(key, JSON.stringify(!currentValue));
  }

  populateStorage();

  PubSub.subscribe("/toggleStorageValue", toggleStorageValue);

  return getDefaultValue;
})();

export default storage;
