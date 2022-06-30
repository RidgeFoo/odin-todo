export default function Task(taskTitle, dueDate, priority, isDone) {
  let _title = taskTitle;
  let _dueDate = dueDate;
  let _priority = priority;
  let _isDone = isDone || false;

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
      taskTitle: _title,
      taskDueDate: _dueDate,
      taskPriority: _priority,
      taskIsDone: _isDone,
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
