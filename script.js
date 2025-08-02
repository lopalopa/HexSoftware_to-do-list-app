document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();

  if (taskText === '') return;

  // Create list item
  const li = document.createElement('li');
  li.classList.add('task-item');

  // Create task span
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.onclick = () => li.remove();

  // Append task and button to list item
  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);

  // Append to task list
  document.getElementById('taskList').appendChild(li);
  input.value = '';
}
function createTaskElement(taskText, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.textContent = taskText;
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    updateLocalStorage();
  };

  li.appendChild(delBtn);
  return li;
}

function saveTask(taskText) {
  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => {
    const taskItem = createTaskElement(task.text, task.completed);
    document.getElementById("taskList").appendChild(taskItem);
  });
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function updateLocalStorage() {
  const listItems = document.querySelectorAll("#taskList li");
  const tasks = [];
  listItems.forEach(li => {
    const text = li.firstChild.textContent;
    const completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
