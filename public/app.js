let isLoginMode = true;
let isEditMode = false;

function alternarModoAuth() {
    isLoginMode = !isLoginMode;
    document.getElementById('authTitle').innerText = isLoginMode ? 'Login' : 'Criar Conta';
    document.getElementById('btnAuth').innerText = isLoginMode ? 'Entrar' : 'Registrar';
    document.getElementById('toggleText').innerText = isLoginMode ? 'Não tem conta?' : 'Já possui conta?';
    document.getElementById('toggleLink').innerText = isLoginMode ? 'Registre-se' : 'Faça Login';
    document.getElementById('authMsg').innerText = '';
}

async function processarAuth() {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const endpoint = isLoginMode ? '/api/login' : '/api/registrar';

    const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, senha })
    });
    
    const data = await res.json();
    
    if (res.ok) {
        if (!isLoginMode) {
            alert('Conta criada! Faça login para continuar.');
            alternarModoAuth();
        } else {
            document.getElementById('authSection').style.display = 'none';
            document.getElementById('crudSection').style.display = 'block';
            document.getElementById('btnSair').style.display = 'block';
            carregarEscolas();
        }
    } else {
        document.getElementById('authMsg').innerText = data.mensagem || 'Erro na operação';
    }
}

function sair() {
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('crudSection').style.display = 'none';
    document.getElementById('btnSair').style.display = 'none';
    document.getElementById('login').value = '';
    document.getElementById('senha').value = '';
}

async function carregarEscolas() {
    const res = await fetch('/api/escolas');
    const escolas = await res.json();
    const lista = document.getElementById('listaEscolas');
    lista.innerHTML = '';
    escolas.forEach(esc => {
        lista.innerHTML += `
            <li>
                <div class="escola-info"><strong>${esc.nome}</strong> - ${esc.local}</div>
                <div>
                    <button class="btn-action btn-edit" onclick="prepararEdicao(${esc.id}, '${esc.nome}', '${esc.local}')">Editar</button>
                    <button class="btn-action btn-danger" onclick="deletarEscola(${esc.id})">Excluir</button>
                </div>
            </li>`;
    });
}

async function salvarEscola() {
    const nome = document.getElementById('nomeEscola').value;
    const local = document.getElementById('localEscola').value;
    const id = document.getElementById('escolaId').value;

    const method = isEditMode ? 'PUT' : 'POST';
    const endpoint = isEditMode ? `/api/escolas/${id}` : '/api/escolas';

    await fetch(endpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, local })
    });
    
    cancelarEdicao();
    carregarEscolas();
}

function prepararEdicao(id, nome, local) {
    isEditMode = true;
    document.getElementById('escolaId').value = id;
    document.getElementById('nomeEscola').value = nome;
    document.getElementById('localEscola').value = local;
    
    document.getElementById('crudTitle').innerText = 'Editar Instituição';
    document.getElementById('btnSalvar').innerText = 'Atualizar';
    document.getElementById('btnCancelar').style.display = 'block';
}

function cancelarEdicao() {
    isEditMode = false;
    document.getElementById('escolaId').value = '';
    document.getElementById('nomeEscola').value = '';
    document.getElementById('localEscola').value = '';
    
    document.getElementById('crudTitle').innerText = 'Registrar Nova Instituição';
    document.getElementById('btnSalvar').innerText = 'Registrar';
    document.getElementById('btnCancelar').style.display = 'none';
}

async function deletarEscola(id) {
    if(confirm('Tem certeza que deseja excluir?')) {
        await fetch(`/api/escolas/${id}`, { method: 'DELETE' });
        carregarEscolas();
    }
}