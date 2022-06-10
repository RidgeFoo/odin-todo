import todo from "./todo.js";

todo.addProject("myProject", "Red");

const projectOne = todo.getProjects()[0];

projectOne.addTask("myTask", "2021-01-01", 999);

const taskOne = projectOne.getTasks()[0];

console.log(`Project Name: ${projectOne.getName()}`);
console.log(`Task name: ${taskOne.getTitle()}`);
