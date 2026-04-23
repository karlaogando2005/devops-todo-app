const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const fs = require('fs');

const app = express();
const db = new Database('tasks.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

function log(msg) {
  const line = `${new Date().toISOString()} - ${msg}\n`;
  fs.appendFileSync('app.log', line);
  console.log(line.trim());
}

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  log('Health check realizado');
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date() });
});

app.get('/tasks', (req, res) => {
  const tasks = db.prepare('SELECT * FROM tasks').all();
  log(`GET /tasks - ${tasks.length} tareas`);
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'El título es requerido' });
  const result = db.prepare('INSERT INTO tasks (title) VALUES (?)').run(title);
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
  log(`POST /tasks - Tarea creada: ${title}`);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  db.prepare('UPDATE tasks SET done = ? WHERE id = ?').run(task.done ? 0 : 1, id);
  const updated = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  log(`PUT /tasks/${id} - Tarea actualizada`);
  res.json(updated);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  log(`DELETE /tasks/${id} - Tarea eliminada`);
  res.json({ message: 'Tarea eliminada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => log(`Servidor corriendo en puerto ${PORT}`));

module.exports = app;