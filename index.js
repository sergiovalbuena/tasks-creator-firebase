import { saveTask, getTasks, onGetTask } from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

window.addEventListener("DOMContentLoaded", async () => {
  // const querySnapshot = await getTasks();

  onGetTask((querySnapshot) => {
    let html = "";

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      const task = doc.data();

      html += `
        <div>
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <button class='btn-delete' data-id="${doc.id}">Delete</button>
          </div>
        
      `;
    });

    tasksContainer.innerHTML = html;

    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')
    btnsDelete.forEach(btn => {
      btn.addEventListener('click', (event) => {
        console.log(event.target.dataset.id)
      })
    })

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
