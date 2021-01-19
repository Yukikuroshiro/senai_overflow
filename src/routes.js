const express = require("express");

const authMiddleware = require("./middleware/authorization");

const studentController = require("./controllers/students");
const questionsController = require("./controllers/questions");
const answerController = require("./controllers/answers");
const feedController = require("./controllers/feed")
const sessionController = require("./controllers/sessions")


const routes = express.Router();

// const middleware = (req,res,next) => {
//     console.log('passou pelo middleware');
//     next();
// };

//|-----------------| Rotas Públicas |-----------------|
routes.post("/sessions", sessionController.store);
routes.post("/students", studentController.store);

routes.use(authMiddleware);

//|-----------------| Rotas Privadas |-----------------|

//|-----------------| Rotas de Alunos |-----------------|
routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
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