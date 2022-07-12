export default function Task(title, dueDate, priority) {
  function getDetails() {
    return {
      title,
      dueDate: new Date(dueDate),
      priority,
    };
  }

  return {
    getDetails,
  };
}
