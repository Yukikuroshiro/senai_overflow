const express = require("express");

const alunoController = require("./controllers/alunos");
const perguntaController = require("./controllers/perguntas");
const answerController = require("./controllers/answers");

const routes = express.Router();

//|-----------------| Rotas de Alunos |-----------------|
routes.get("/alunos", alunoController.listarAlunos);
routes.get("/alunos/:id", alunoController.buscarAluno);
routes.post("/alunos", alunoController.adicionarAlunos);
routes.delete("/alunos/:id", alunoController.deletarAluno);
routes.put("/alunos/:id", alunoController.editarAluno);

//|-----------------| Rotas de perguntas |-----------------|
routes.post("/perguntas", perguntaController.store);
routes.delete("/perguntas/:id", perguntaController.delete);
routes.put("/perguntas/:id", perguntaController.update);

//|-----------------| Rotas de Respostas |-----------------|
routes.post("/perguntas/:id/respostas", answerController.store);
routes.get("/perguntas/:id/respostas", answerController.index);

module.exports = routes;