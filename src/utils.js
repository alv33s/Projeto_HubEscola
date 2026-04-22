function validarDadosEscola(nome, local) {
  if (!nome || nome.trim() === '') return false;
  if (!local || local.trim() === '') return false;
  return true;
}

function validarSenha(senha) {
  // Senha deve ter no mínimo 4 caracteres
  if (!senha || senha.length < 4) return false;
  return true;
}

module.exports = { validarDadosEscola, validarSenha };