## Backend: tecnologias e versões

Para construção do backend, foram utilizados:

- Node 16.14.0 e NPM 8.3.1
- Framework Express 4.17.3
- MongoDB 5.0.0

## Ao clonar repositório

1. Entrar na pasta backend
2. Executar comando ```npm install``` para instalar dependências
3. Definir URL de conexão ao MongoDB no arquivo ``backend/src/config/database.js``
4. Executar comando ```npm run dev``` para rodar API na porta 3003
5. Rotas criadas da API:
    1. ``GET`` ``/todo`` -> para buscar tarefas
    2. ``POST`` ``/todo`` -> para adicionar tarefa
    3. ``PUT`` ``/todo/:id`` -> para atualizar tarefa
    4. ``GET`` ``/todo/:id`` -> para buscar tarefa por ID
    5. ``DELETE`` ``/todo/:id`` -> para deletar tarefa
    6. ``PATCH`` ``/todo/start/:id`` -> para iniciar execução da tarefa
    7. ``PATCH`` ``/todo/finish/:id`` -> para finalizar execução da tarefa
    8. ``PATCH`` ``/todo/done/:id`` -> para mudar status da tarefa
