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

- [x] Project drop down in add task needs to use a similar rendering method to the tasks
- [x] Sidebar needs to have a similar rendering method to the above???
  - When a new project is created then project drop downs should render to reflect the change
- [x] Task borders are overlapping between tasks making a thick border - fix using CSS selectors
- [x] Project Drop Down - Display Projects except the "Inbox" project

- [x] Add a task to the default "Inbox" project - ignore storage for now!
- [x] Display said task
- [x] Change the way the task rendering works / initialising of the task list

- [x] Fix project drop down behaviour - chevron and when projects are shown needs to match properly

- [ ] Clicking on Project in the project dropdown should filter the tasks displayed to just the tasks associated with the project.
- [ ] Clicking the Inbox button in the quick filter should filter displayed tasks to just the tasks in the Inbox project.
- [ ] Clicking on the "Today" or "Upcoming" buttons should filter the tasks across all projects just based on the Due Dates of the tasks.
- [ ] Tasks list title should change depending on the filter applied i.e. if a project then display the project name or if a date filter then the filter name

- [ ] Delete a task
- [ ] Edit a task
- [ ] Complete a task
- [ ] Delete a project

- [ ] Storage and initialising from storage needs to be done

### Nice to haves:

- [ ] Come up with a better way of handling the toggling and initialisation of the project dropdown list - feels messy currently but works

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
