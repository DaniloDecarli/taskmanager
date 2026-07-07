# Task Manager

Sistema de gestão de tarefas (MVP) construído conforme a arquitetura definida em `arquitetura_projeto.md`.

- **Backend**: Java 21 + Spring Boot 3 (REST API, JWT, Spring Security, JPA/Hibernate, Flyway)
- **Frontend**: Vue.js 3 + Vite (Pinia, Vue Router, Axios)
- **Banco de dados**: PostgreSQL

## Funcionalidades do MVP

- Cadastro e login de usuários (autenticação via JWT, senha com BCrypt)
- CRUD completo de tarefas (título, descrição, prazo, status concluído/pendente)
- Cada usuário só acessa as próprias tarefas

## Estrutura

```
taskmanager/
├── backend/     # API REST (Spring Boot)
├── frontend/    # SPA (Vue 3)
└── docker-compose.yml
```

## Como rodar com Docker (recomendado)

Na raiz do projeto:

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8080/api
- PostgreSQL: localhost:5432 (db `taskmanager`, user `postgres`, senha `postgres`)

## Como rodar localmente (sem Docker)

### Backend

Pré-requisitos: Java 21, Maven, um PostgreSQL rodando localmente.

```bash
cd backend
# ajuste usuário/senha/host do banco em src/main/resources/application.yml
# ou exporte as variáveis DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, JWT_SECRET
mvn spring-boot:run
```

As migrations do Flyway criam as tabelas automaticamente na primeira execução.

### Frontend

Pré-requisitos: Node.js 20+.

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Acesse http://localhost:5173

## Endpoints principais da API

| Método | Rota                | Descrição                          | Autenticado |
|--------|----------------------|-------------------------------------|-------------|
| POST   | `/api/auth/register`| Cria uma conta                      | Não         |
| POST   | `/api/auth/login`   | Autentica e retorna token JWT       | Não         |
| GET    | `/api/tasks`        | Lista as tarefas do usuário logado  | Sim         |
| GET    | `/api/tasks/{id}`   | Busca uma tarefa                    | Sim         |
| POST   | `/api/tasks`        | Cria uma tarefa                     | Sim         |
| PUT    | `/api/tasks/{id}`   | Atualiza uma tarefa                 | Sim         |
| DELETE | `/api/tasks/{id}`   | Remove uma tarefa                   | Sim         |

Rotas autenticadas exigem o header `Authorization: Bearer <token>`.

## Próximos passos (evolução, conforme o documento de arquitetura)

- Perfis de acesso (roles) e controle de permissões mais granular
- Cache com Redis
- Mensageria (RabbitMQ/Kafka)
- Observabilidade (Prometheus/Grafana)
- Documentação OpenAPI/Swagger
- Pipeline de CI/CD
- Testes de integração mais abrangentes
