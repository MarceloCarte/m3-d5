const inputTask = document.getElementById("addTask");
const btnAddTask = document.getElementById("btnAddTask");
const totalTask = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const taskList = document.getElementById("taskList");

let tasks = [];

function addTasks() {
  const description = inputTask.value;

  if (description !== "") {
    const newTask = {
      id: Date.now(),
      description: description,
      completed: false,
    };

    tasks.push(newTask);
    inputTask.value = "";
    renderTask();

    console.log(tasks);
  }
}

btnAddTask.addEventListener("click", addTasks);

function renderTask() {
  taskList.innerHTML = tasks
    .map(
      (task) => `
        <li class="taskBox">
        <span class="taskId">#${task.id}</span>
        <span>${task.description} </span>
        <div class="btns">
        <input type="checkbox" ${task.completed ? "checked" : ""} 
        onchange="checkbox(${task.id})">
        <button class="btnDelete" 
        onClick="deleteTask(${task.id})">Delete</button>
        </div>
        </li>
        `
    )
    .join("");

  counters();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTask();
}

function counters() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  totalTask.innerHTML = total;
  completedTasks.innerHTML = completed;
  pendingTasks.innerHTML = pending;
}

function checkbox(id) {
  const task = tasks.find((task) => task.id === id);

  if (task) {
    task.completed = !task.completed;
  }
  renderTask();
}
