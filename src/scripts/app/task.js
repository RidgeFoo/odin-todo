export default function Task(taskTitle, dueDate, priority) {
  let _title = taskTitle;
  let _dueDate = dueDate;
  let _priority = priority;

  function getTitle() {
    return _title;
  }

  function setTitle(taskTitle) {
    // TODO: add validations?
    _title = taskTitle;
    return _title;
  }

  function getDueDate() {
    return _dueDate;
  }

  function getPriority() {
    return _priority;
  }

  function setDueDate(dueDate) {
    // TODO: add validations?
    _dueDate = dueDate;
    return _dueDate;
  }

  function setPriority(priority) {
    // TODO: add validations?
    _priority = priority;
    return priority;
  }

  function getTaskDetails() {
    return {
      title: getTitle(),
      dueDate: getDueDate(),
      priority: getPriority(),
    };
  }

  return {
    getTitle,
    setTitle,
    getPriority,
    setPriority,
    getDueDate,
    setDueDate,
    getTaskDetails,
  };
}
