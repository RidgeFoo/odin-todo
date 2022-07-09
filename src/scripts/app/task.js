export default function Task(taskTitle, dueDate, priority) {
  let _title = taskTitle;
  let _dueDate = new Date(dueDate);
  let _priority = priority;

  function getDetails() {
    return {
      title: _title,
      dueDate: _dueDate,
      priority: _priority,
    };
  }

  return {
    getDetails,
  };
}
