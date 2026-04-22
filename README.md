# Hub Escola Pro 🎓

## 📝 Sobre o Projeto
O **Hub Escola Pro** é um sistema de gestão educacional simplificado, desenvolvido como projeto prático para a disciplina de **Teste de Software**. O sistema permite o gerenciamento de instituições de ensino, oferecendo uma interface para cadastro, consulta, atualização e exclusão (CRUD) de escolas, além de um sistema de autenticação seguro.

## 🎯 Finalidade
A principal finalidade deste projeto é servir como base para a aplicação de diversas técnicas de garantia de qualidade e testes automatizados, cobrindo:
- **Testes Unitários:** Validação de lógicas isoladas e regras de negócio.
- **Testes de API (Integração):** Verificação dos endpoints REST e comunicação com o banco de dados.
- **Testes Ponta a Ponta (E2E):** Simulação da experiência real do usuário no navegador.

## 🚀 Funcionalidades
- **Autenticação Segura:** - Registro de novos usuários.
    - Login com verificação de credenciais e criptografia de senhas (BCrypt).
- **Gestão de Instituições (CRUD):**
    - **Registro:** Cadastro de novas escolas com nome e localidade.
    - **Consulta:** Listagem dinâmica das instituições salvas.
    - **Edição:** Atualização de dados de instituições já cadastradas.
    - **Exclusão:** Remoção de registros do banco de dados com confirmação.
- **Interface Responsiva:** Design moderno e amigável desenvolvido com CSS customizado.

## 📁 Estrutura do Projeto
A organização de pastas segue as melhores práticas de separação de responsabilidades:

```text
hub-escola/
├── cypress/                # Testes de interface (E2E) com Cypress
│   └── e2e/
│       └── fluxo.cy.js     # Cenários de teste de fluxo completo
├── public/                 # Frontend (Interface do Usuário)
│   ├── index.html          # Estrutura principal
│   ├── style.css           # Estilização e Design
│   └── app.js              # Lógica de interação do frontend
├── src/                    # Backend (API e Regras de Negócio)
│   ├── server.js           # Servidor Express e rotas da API
│   ├── database.js         # Configuração do banco SQLite (em memória)
│   └── utils.js            # Funções auxiliares e validações
├── tests/                  # Testes Automatizados (Jest)
│   ├── unit/
│   │   └── utils.test.js   # Testes de funções isoladas
│   └── api/
│       └── rotas.test.js   # Testes de integração dos endpoints
├── package.json            # Dependências e scripts do projeto
└── README.md               # Documentação do projeto
```

## 🛠️ Tecnologias Utilizadas
Runtime: Node.js

Framework Web: Express

Banco de Dados: SQLite3 (In-memory para testes)

Segurança: Bcryptjs (Hash de senhas)

Testes: Jest, Supertest e Cypress

## ⚙️ Como Executar o Projeto
Pré-requisitos
Node.js instalado.

1. Instalação
Clone o repositório e instale as dependências:

`npm install`

2. Iniciar o Sistema
Para rodar o servidor e acessar a interface web:

`npm start`

Após iniciar, abra o navegador em: http://localhost:3000

3. Executar Testes
O projeto possui scripts específicos para cada tipo de teste:

Executar Testes Unitários:

`npm run test:unit`

Executar Testes de API:

`npm run test:api`

Executar Testes E2E (Cypress):

`npm run test:e2e`

(Nota: O servidor deve estar rodando para os testes E2E funcionarem)

👥 Autores
Felipe Alves, Felipe Nascimento, Felipe Marinho, Enzo Freitas, Arthur Oliveira
