const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Simulación de base de datos (en memoria)
let tareas = [
  { id: 1, texto: "Aprender Express", completada: false },
  { id: 2, texto: "Crear una lista de tareas", completada: true }
];

// ✅ GET /api/tasks - Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  res.json(tareas);
});

// ✅ POST /api/tasks - Crear nueva tarea
app.post('/api/tasks', (req, res) => {
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: "El campo 'texto' es obligatorio." });
  }

  const nuevaTarea = {
    id: tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1,
    texto,
    completada: false
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// ✅ PUT /api/tasks/:id - Actualizar una tarea existente
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { texto, completada } = req.body;

  const tarea = tareas.find(t => t.id === id);
  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada." });
  }

  if (texto !== undefined) tarea.texto = texto;
  if (completada !== undefined) tarea.completada = completada;

  res.json(tarea);
});

// ✅ DELETE /api/tasks/:id - Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tareas.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Tarea no encontrada." });
  }

  const tareaEliminada = tareas.splice(index, 1)[0];
  res.json({ mensaje: "Tarea eliminada", tarea: tareaEliminada });
});

app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}`);
});
