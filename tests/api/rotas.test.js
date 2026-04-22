const request = require('supertest');
const app = require('../../src/server');

describe('Testes de API - Integração', () => {
  let escolaId;

  test('Deve registrar um novo usuário com sucesso', async () => {
    const res = await request(app).post('/api/registrar').send({ login: 'teste', senha: 'password' });
    expect(res.statusCode).toBe(201);
  });

  test('Deve falhar ao registrar usuário com senha muito curta', async () => {
    const res = await request(app).post('/api/registrar').send({ login: 'teste2', senha: '12' });
    expect(res.statusCode).toBe(400);
  });

  test('Deve fazer login com o usuário registrado', async () => {
    const res = await request(app).post('/api/login').send({ login: 'teste', senha: 'password' });
    expect(res.statusCode).toBe(200);
  });

  test('Deve criar uma nova escola e retornar 201', async () => {
    const res = await request(app).post('/api/escolas').send({ nome: 'Centro Educacional', local: 'Taguatinga' });
    expect(res.statusCode).toBe(201);
    escolaId = res.body.id;
  });

  test('Deve atualizar os dados de uma escola existente', async () => {
    const res = await request(app).put(`/api/escolas/${escolaId}`).send({ nome: 'Centro Atualizado', local: 'Taguatinga Sul' });
    expect(res.statusCode).toBe(200);
  });
});