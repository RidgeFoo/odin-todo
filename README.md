# Odin - Todo Project

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

- [x] Clicking on Project in the project dropdown should filter the tasks displayed to just the tasks associated with the project.
- [x] Clicking the Inbox button in the quick filter should filter displayed tasks to just the tasks in the Inbox project.
- [x] Clicking on the "Today" or "Upcoming" buttons should filter the tasks across all projects just based on the Due Dates of the tasks.

  - Today will bring in all tasks due today or in the past.
  - Upcoming is tasks due within 7 days or in the past.

- [x] Tasks list title should change depending on the filter applied i.e. if a project then display the project name or if a date filter then the filter name
- [x] Task priority should be a coloured circle - Red, Amber, Green
- [x] Complete / Delete a task by clicking the coloured circle

- [ ] Edit a task
  - Clicking a task should open the add task modal or maybe a different modal entirely?
  - Fill in the values in the form and instead of having add task it should show "Apply Changes"?
  - Should be able to change project - might be simplest just to delete the original task every time "Apply Changes" is clicked?.
- [ ] Storage and initialising from storage needs to be done
  - Save to storage every time a task is added or deleted or when the user closes the tab if possible???
- [ ] Delete a project
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
