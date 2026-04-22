const { validarDadosEscola, validarSenha } = require('../../src/utils');

describe('Testes Unitários - Utils', () => {
  test('Deve retornar verdadeiro para dados de escola válidos', () => {
    expect(validarDadosEscola('Escola A', 'Local B')).toBe(true);
  });

  test('Deve retornar falso para dados de escola vazios', () => {
    expect(validarDadosEscola('', '')).toBe(false);
  });

  test('Deve retornar verdadeiro para senha válida (>= 4 caracteres)', () => {
    expect(validarSenha('1234')).toBe(true);
    expect(validarSenha('senhaForte')).toBe(true);
  });

  test('Deve retornar falso para senha curta (< 4 caracteres)', () => {
    expect(validarSenha('123')).toBe(false);
  });
});