# Fábrica de Tijolos

Projeto desenvolvido como desafio técnico para simular uma fábrica de tijolos, com backend em Java/Spring Boot e frontend em React com TypeScript.

## Estrutura do Projeto

- `backend/`: API RESTful com Spring Boot, usando H2 (local) ou PostgreSQL (produção).
- `frontend/`: Interface web em React com TypeScript, Material-UI e Chart.js.

## Requisitos

- Java 17
- Maven
- Node.js 16+
- npm

## Configuração e Execução

### Backend
1. Navegue até `backend/`:
   ```bash
   cd backend

2. Instale as dependências:
    ```bash
     mvn install

3. Execute:
    ```bash
    mvn spring-boot:run

- API: http://localhost:8080
- Console H2: http://localhost:8080/h2-console

### Frontend

Navegue até frontend/:
    ```bash
    cd frontend

2. Instale as dependências:
     ```bash
     npm install

3. Execute:
      ```bash
      npm start


