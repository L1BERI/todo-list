const inputTask = document.querySelector("[data-task-input]");
const btnTask = document.querySelector("[data-task-btn]");
const listTask = document.querySelector("[data-task-list]");

const tasks = loadTasksFromLocalStorage();

btnTask.onclick = function () {
  if (inputTask.value === "") return;
  const currentTask = {
    title: inputTask.value,
    complete: false,
    createdAt: new Date().toLocaleString(), 
    completedAt: null, 
  };

  tasks.push(currentTask);
  saveTasksToLocalStorage();
  render();
  inputTask.value = "";
};

listTask.onclick = function (e) {
  if (e.target.dataset.index) {
    const itemIndex = +e.target.dataset.index;
    const btnType = e.target.dataset.type;
    
    if (btnType === "toggle") {
      tasks[itemIndex].complete = !tasks[itemIndex].complete;
      tasks[itemIndex].completedAt = tasks[itemIndex].complete ? new Date().toLocaleString() : null;
      saveTasksToLocalStorage();
      render();
    }
    
    if (btnType === "remove") {
      tasks.splice(itemIndex, 1);
      saveTasksToLocalStorage();
      render();
    }
  }
};

function render() {
  listTask.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    listTask.insertAdjacentHTML("beforeend", getTaskItem(i));
  }

  if (tasks.length === 0) {
    listTask.insertAdjacentHTML(
      "beforeend",
      `
        <li class="todo__item">
          <span class="todo__text">Пусто</span>
        </li>
      `
    );
  }
}

function getTaskItem(i) {
  return `
    <li class="todo__item">
      <div class="todo__item-wrapper">
        <span class="todo__text ${tasks[i].complete ? "text-lined" : ""}">${tasks[i].title}</span>
        <div class="todo__controls">
          <span class="todo__complete ${tasks[i].complete ? "checked" : ""}" data-index=${i} data-type='toggle'>&#10004;</span>
          <span class="todo__remove" data-index=${i} data-type='remove'>&#10006;</span>
        </div>
      </div>
      <div class="todo__item-time">
        <span class="todo__item-start">Добавлено: ${tasks[i].createdAt}</span>
        <span class="todo__item-end">${tasks[i].completedAt ? `Выполнено: ${tasks[i].completedAt}` : ''}</span>
      </div>
    </li>
  `;
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasksFromStorage = localStorage.getItem("tasks");
  return tasksFromStorage ? JSON.parse(tasksFromStorage) : [];
}

render();
