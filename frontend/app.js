const API = 'http://localhost:3000';

async function loadTasks() {
  const res = await fetch(`${API}/tasks`);
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  const stats = document.getElementById('stats');
  
  const done = tasks.filter(t => t.done).length;
  stats.textContent = `${tasks.length} tareas — ${done} completadas`;
  
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');
    li.innerHTML = `
      <span class="title">${task.title}</span>
      <div class="actions">
        <button class="btn-done" onclick="toggleTask(${task.id})">
          ${task.done ? '↩ Deshacer' : '✓ Listo'}
        </button>
        <button class="btn-delete" onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById('taskInput');
  const title = input.value.trim();
  if (!title) return alert('Escribe una tarea primero');
  await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  input.value = '';
  loadTasks();
}

async function toggleTask(id) {
  await fetch(`${API}/tasks/${id}`, { method: 'PUT' });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
  loadTasks();
}

document.getElementById('taskInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

loadTasks();