const request = require('supertest');
const app = require('../backend/index');

describe('API de Tareas', () => {

  test('GET /health retorna status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /tasks retorna una lista', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /tasks crea una tarea nueva', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Tarea de prueba' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Tarea de prueba');
  });

  test('POST /tasks sin título retorna error 400', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({});
    expect(res.statusCode).toBe(400);
  });

  test('PUT /tasks/:id cambia el estado de la tarea', async () => {
    const created = await request(app)
      .post('/tasks')
      .send({ title: 'Tarea para completar' });
    const id = created.body.id;
    const res = await request(app).put(`/tasks/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.done).toBe(1);
  });

  test('DELETE /tasks/:id elimina la tarea', async () => {
    const created = await request(app)
      .post('/tasks')
      .send({ title: 'Tarea para eliminar' });
    const id = created.body.id;
    const res = await request(app).delete(`/tasks/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Tarea eliminada');
  });

});