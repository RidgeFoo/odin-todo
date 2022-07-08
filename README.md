# Odin - Todo Project

## To Do:

- [x] Fix the button toggle - may want to render them the same way as everything else
- [x] Fix deleting a task - index isn't being passed around correctly
- [x] Edit a task - it works but is a bit messy really and not as efficient as it could be
- [ ] Storage and initialising from storage needs to be done
  - Save to storage every time a task is added or deleted or when the user closes the tab if possible???
- [ ] Add a project from the sidebar
- [ ] Delete a project
- [x] Fix upcoming and today filters
- [ ] Make sure to add attributions in the footer area

### Nice to haves:

- [ ] Come up with a better way of handling the toggling and initialisation of the project dropdown list - feels messy currently but works.
- [ ] Don't just delete completed tasks but "archive" them and make them visible using a checkbox or something like that.
- [ ] Adding a home button that shows all tasks.
- [ ] Hiding and showing the sidebar.
- [ ] Inbox should be the default project when adding tasks. Users shouldn't have to select a project when adding a task.
- [ ] Adding project from the sidebar area.
- [ ] Task sorting could be better.
- [ ] Add a toggle for the sidebar.

## Storing the data in local storage

Below is an example of how the project and task data will be held in local storage

```json
{
  "projects": [
    {
      "name": "Inbox",
      "tasks": [
        {
          "name": "Task 1",
          "dueDate": "2020-01-01",
          "priority": "Low"
        },
        {
          "name": "Task 2",
          "dueDate": "2020-01-02",
          "priority": "Low"
        }
      ]
    },
    {
      "name": "Work",
      "tasks": [
        {
          "name": "Work 1",
          "dueDate": "2022-01-01",
          "priority": "High"
        },
        {
          "name": "Work 2",
          "dueDate": "2022-04-01",
          "priority": "High"
        }
      ]
    }
  ]
}
```
