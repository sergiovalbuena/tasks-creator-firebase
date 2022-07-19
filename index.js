import { saveTask, getTasks, onSnapshot, collection, db } from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

window.addEventListener("DOMContentLoaded", async () => {
  // const querySnapshot = await getTasks();

  onSnapshot(collection(db, "tasks"), (querySnapshot) => {
    let html = "";

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      const task = doc.data();

      html += `
        <div>
          <h3>${task.title}</h3>
          <p>${task.description}</p>
        </div>
      `;
    });

    tasksContainer.innerHTML = html;
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  // console.log(title, description)
  // console.log(title.value, description.value)

  saveTask(title.value, description.value);

  taskForm.reset();
});
