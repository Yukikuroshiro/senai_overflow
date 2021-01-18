const express = require("express");

const studentController = require("./controllers/students");
const questionsController = require("./controllers/questions");
const answerController = require("./controllers/answers");
const feedController = require("./controllers/feed")

const routes = express.Router();

//|-----------------| Rotas de Alunos |-----------------|
routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
routes.post("/students", studentController.store);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

//|-----------------| Rotas de perguntas |-----------------|
routes.post("/questions", questionsController.store);
routes.delete("/questions/:id", questionsController.delete);
routes.put("/questions/:id", questionsController.update);

//|-----------------| Rotas de Respostas |-----------------|
routes.post("/questions/:id/answers", answerController.store);
routes.get("/questions/:id/answers", answerController.index);

//|-----------------| Rotas do Feed |-----------------|
routes.get("/questions/feed", feedController.index)

module.exports = routes;