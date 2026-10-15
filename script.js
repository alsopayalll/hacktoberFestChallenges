const STORAGE_KEY = "miniTodoTasks";

const form = document.getElementById("todo-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const pendingCount = document.getElementById("pending-count");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

// Load saved tasks, or start with an empty list if nothing is stored yet.
function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

let tasks = loadTasks();

function addTask(text) {
  const trimmed = text.trim();
  if (trimmed === "") {
    return;
  }

  // id is unique so we can toggle or delete the right task later.
  tasks.push({
    id: Date.now(),
    text: trimmed,
    completed: false,
  });

  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find(function (item) {
    return item.id === id;
  });

  if (task) {
    task.completed = !task.completed;
    saveTasks();
    render();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(function (item) {
    return item.id !== id;
  });

  saveTasks();
  render();
}

function updatePendingCount() {
  const pending = tasks.filter(function (item) {
    return item.completed === false;
  }).length;

  pendingCount.textContent = "Pending tasks: " + pending;
}

function getVisibleTasks() {
  if (currentFilter === "pending") {
    return tasks.filter(function (item) {
      return item.completed === false;
    });
  }

  if (currentFilter === "completed") {
    return tasks.filter(function (item) {
      return item.completed === true;
    });
  }

  return tasks;
}

function render() {
  taskList.innerHTML = "";

  // Filter only what is shown. The full tasks array stays unchanged.
  const visibleTasks = getVisibleTasks();

  visibleTasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "task";
    if (task.completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Mark task completed");
    checkbox.addEventListener("change", function () {
      toggleTask(task.id);
    });

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updatePendingCount();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTask(input.value);
  input.value = "";
  input.focus();
});

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.getAttribute("data-filter");

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    render();
  });
});

render();
