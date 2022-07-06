export default function Task(taskTitle, dueDate, priority) {
  let _title = taskTitle;
  let _dueDate = new Date(dueDate);
  let _priority = priority;

  function setTitle(taskTitle) {
    _title = taskTitle;
    return _title;
  }

  function setDueDate(dueDate) {
    _dueDate = dueDate;
    return _dueDate;
  }

  function setPriority(priority) {
    _priority = priority;
    return priority;
  }

  function toggleComplete() {
    _isDone = !_isDone;
  }

  function getTaskDetails() {
    return {
      title: _title,
      dueDate: _dueDate,
      priority: _priority,
    };
  }

  return {
    setTitle,
    setPriority,
    setDueDate,
    toggleComplete,
    getTaskDetails,
  };
}
