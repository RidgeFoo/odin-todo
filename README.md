# Odin - Todo Project

- Adding a task to project
- todo.js holds all the projects:

  - Should the projects and tasks objects contain their own methods or should they just be objects with properties?
  - Should the todo.js handle adding projects and tasks - seems simpler that way.
  - Projects and Tasks could be classes?
    - Projects have Tasks?
    - If they stay the way they are the todo.js is still coordinating the interaction between Projects and Tasks.
      - For example, adding a task:
        - we would get the relevant project
        - We then use that project to add a new task
      - For displaying tasks
        - Get the relevant project
        - Project lists tasks

- Serialising and De-serialising tasks and projects is a problem potentially.
- When loading from storage the objects all need to be recreated.

  - Does it make sense to have methods with the project and task objects?
  - Should todo.js handle all of the functionality relating to projects and tasks?

## To Do:

- [ ] Add a task to the default "Inbox" project - ignore storage for now!
- [ ] Display said task
- [ ] Project Drop Down - Display Projects except the "Inbox" project
- [ ] Clicking on Project in the project dropdown should filter the tasks displayed to just the tasks associated with the project.
- [ ] Clicking the Inbox button in the quick filter should filter displayed tasks to just the tasks in the Inbox project.
- [ ] Clicking on the "Today" or "Upcoming" buttons should filter the tasks across all projects just based on the Due Dates of the tasks.
- [ ] Delete a task
- [ ] Edit a task
- [ ] Delete a project
- [ ] Tasks title should change depending on the filter applied i.e. if a project then display the project name or if a date filter then the filter name

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
