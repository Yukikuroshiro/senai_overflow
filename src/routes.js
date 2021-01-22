const express = require("express");

const authMiddleware = require("./middleware/authorization");
const uploadQuestionsMiddleware = require("./middleware/uploadQuestions");
const uploadQuestions = require("./services/firebase");

const studentValidators = require("./validators/students");
const questionValidators = require("./validators/questions");
const answerValidators = require("./validators/answers");

const studentController = require("./controllers/students");
const questionsController = require("./controllers/questions");
const answerController = require("./controllers/answers");
const feedController = require("./controllers/feed");
const sessionController = require("./controllers/sessions");
const { errors } = require("celebrate");

const routes = express.Router();

// const upload = multer.single("arquivo");

// routes.post("/upload", (req,res) =>{

//     const handleError = (error) => {
//         if(error){
//             res.status(400).send({error:"Arquivo inválido."})
//         }

//     console.log(req.file);

//     res.send(req.file);

//     }

//     upload(req,res,handleError)
// });

//|-----------------| Rotas Públicas |-----------------|
routes.post("/sessions", sessionController.store);
routes.post("/students", studentValidators.create, studentController.store);

routes.use(authMiddleware);

//|-----------------| Rotas Privadas |-----------------|

//|-----------------| Rotas de Alunos |-----------------|
routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

//|-----------------| Rotas de perguntas |-----------------|
routes.post(
  "/questions",
  uploadQuestionsMiddleware,
  uploadQuestions,
  questionValidators.create,
  questionsController.store
);

//Desafio, fazer o delete da imagem utilizando fs

routes.delete("/questions/:id", questionsController.delete);
routes.put("/questions/:id", questionsController.update);

//|-----------------| Rotas de Respostas |-----------------|
routes.post(
  "/questions/:id/answers",
  answerValidators.create,
  answerController.store
);

//|-----------------| Rotas do Feed |-----------------|
routes.get("/questions/feed", feedController.index);

module.exports = routes;
