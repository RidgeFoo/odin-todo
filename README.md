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
