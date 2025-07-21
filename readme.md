# Fábrica de Tijolos

Projeto desenvolvido para o desafio técnico "Fábrica de Tijolos", implementando um sistema de gerenciamento de tijolos com backend em Java Spring Boot e frontend em React com TypeScript.

## Tecnologias Utilizadas
- **Backend**:
  - Java 17
  - Spring Boot 3.3.2
  - MySQL 8.2.0 (com `mysql-connector-j:8.2.0`)
  - Spring Data JPA/Hibernate
  - Maven
- **Frontend**:
  - React 18
  - TypeScript
  - Material-UI (@mui/material)
  - Chart.js e react-chartjs-2
  - Axios
  - React Router DOM
  - Node.js (v16 ou superior)

## Instruções para Executar

### Pré-requisitos
- Java 17
- Maven
- Node.js (v16 ou superior)
- MySQL 8.2.0
- Git

### Configuração do Banco de Dados
1. Configure o MySQL:
   ```bash
   mysql -u root -p
   CREATE DATABASE brickfactory;
   CREATE USER 'brickuser'@'localhost' IDENTIFIED BY 'brickpassword';
   GRANT ALL PRIVILEGES ON brickfactory.* TO 'brickuser'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

### Configuração do Backend
1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências e compile o projeto:
   ```bash
   mvn clean install
   ```
3. Inicie o servidor:
   ```bash
   mvn spring-boot:run
   ```
   - O backend estará disponível em `http://localhost:8080`.
   - O banco será populado com 100 tijolos automaticamente na inicialização.

### Configuração do Frontend
1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   npm install axios chart.js react-chartjs-2 react-router-dom @types/react-router-dom @mui/material @emotion/react @emotion/styled
   ```
3. Verifique vulnerabilidades:
   ```bash
   npm audit fix
   ```
4. Inicie o frontend:
   ```bash
   npm start
   ```
   - O frontend estará disponível em `http://localhost:3000`.

### Funcionalidades
- **Backend**:
  - Inicialização de 100 tijolos com cor aleatória (branco/preto), furos (1-8), status `EM_INSPECAO` e `defective=false`.
  - Endpoints REST:
    - `GET /bricks?page={page}&size={size}`: Lista tijolos com paginação.
    - `GET /bricks/{id}`: Detalhes de um tijolo.
    - `POST /bricks`: Cria um tijolo.
    - `POST /bricks/random`: Cria um tijolo aleatório.
    - `PUT /bricks/{id}/status`: Atualiza o status (`APROVADO` ou `REPROVADO`, com 1/3 de chance de defeito em `APROVADO`).
    - `DELETE /bricks/{id}`: Deleta um tijolo defeituoso.
- **Frontend**:
  - **Listagem**: Exibe tijolos em uma tabela com filtros (status, cor, ID) e paginação.
  - **Criação**: Formulário para criar tijolos manualmente ou aleatoriamente.
  - **Detalhes**: Exibe detalhes de um tijolo com ações para aprovar, reprovar ou deletar (se defeituoso).
  - **Relatório**: Exibe estatísticas (tijolos brancos/pretos com furos pares/ímpares, status e defeituosos) com gráfico de barras.

  ## Telas criadas ##
<img width="1921" height="933" alt="Listagem" src="https://github.com/user-attachments/assets/dc78ec0d-f92b-4699-9f90-c2528d901134" />
<img width="1921" height="933" alt="Criar" src="https://github.com/user-attachments/assets/04d81805-6083-4529-872d-f5b5a9fce708" />
<img width="1921" height="933" alt="Relatorio" src="https://github.com/user-attachments/assets/eab1a941-7995-464f-b996-c6d8e9c840e8" />


## Observações e Limitações
- O erro `bricks.filter is not a function` foi corrigido com a substituição do `Listagem.tsx` pelo `BrickList.tsx` que assumiu a mesma função não afetando o projeto, além disso implementei no `Relatorio.tsx` um tratamento robusto da resposta da API, suportando tanto objetos `Page` (com `content`) quanto arrays diretos.
- A API usa paginação (`page` e `size`) para otimizar a listagem, com limite de 100 tijolos no relatório para evitar sobrecarga.
- O frontend assume que o backend está em `http://localhost:8080`. Para ambientes diferentes, configure a variável de ambiente `REACT_APP_API_URL`.
- O banco de dados MySQL deve estar configurado corretamente antes de iniciar o backend.
- Executado `npm audit fix` para corrigir vulnerabilidades nas dependências do frontend.
- Deploy opcional pode ser feito em plataformas como Heroku (backend) e Vercel (frontend), mas não foi implementado neste projeto.
- Testes unitários e de integração não foram incluídos devido ao escopo do desafio, mas podem ser adicionados para maior robustez.

## Endereço do Repositório
- Repositório GitHub: https://github.com/pedo-marques/brick-factory

## Contato
- Desenvolvido por Pedro Marques
- E-mail: pedro_marques_dev@hotmail.com
