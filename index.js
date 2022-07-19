import {
  saveTask,
  getTasks,
  onGetTask,
  deleteTask,
  getTask,
  updateTask,
} from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";

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
          <button class='btn-edit' data-id="${doc.id}">Edit</button>
          </div>
        
      `;
    });

    tasksContainer.innerHTML = html;

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        //console.log(dataset.id)
        deleteTask(dataset.id);
        // btn.addEventListener('click', (event) => {
        //   console.log(event.target.dataset.id)
      });
    });

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      //console.log(btn)
      btn.addEventListener("click", async (event) => {
        //console.log(event.target.dataset.id)
        const doc = await getTask(event.target.dataset.id);
        //console.log(doc);
        console.log(doc.data());
        const task = doc.data();

        taskForm["task-title"].value = task.title;
        taskForm["task-description"].value = task.description;

        editStatus = true;
        //id = e.target.dataset.id;
        id = doc.id;

        //taskForm["btn-task-save"].innerText = "Update";
      });
    });
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  // console.log(title, description)
  // console.log(title.value, description.value)

  //saveTask(title.value, description.value);

  if (!editStatus) {
    saveTask(title.value, description.value);
    //console.log("updating");
    //TODO toast to commetned updated
  } else {
    updateTask(id, {
      title: title.value,
      description: description.value
    });

    editStatus = false;
  }

  taskForm.reset();
});
