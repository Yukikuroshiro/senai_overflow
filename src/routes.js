const express = require("express");
const Multer = require("multer");

const authMiddleware = require("./middleware/authorization");

const studentValidators = require("./validators/students");
const questionValidators = require("./validators/questions");
const answerValidators = require("./validators/answers");

const studentController = require("./controllers/students");
const questionsController = require("./controllers/questions");
const answerController = require("./controllers/answers");
const feedController = require("./controllers/feed")
const sessionController = require("./controllers/sessions");


const routes = express.Router();

const multer = Multer({
    storage: Multer.diskStorage({
        destination:"uploads/",
        filename: (req, file, callback) => {
            const filename = Date.now() + "." + file.originalname.split(".").pop();

            return callback(null, filename);
        }
    })
});

routes.post("/upload", multer.single("arquivo"), (req,res) =>{
    console.log(req.file);

    res.send(req.file);
});

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
routes.post("/questions", questionValidators.create,questionsController.store);
routes.delete("/questions/:id", questionsController.delete);
routes.put("/questions/:id", questionsController.update);

//|-----------------| Rotas de Respostas |-----------------|
routes.post("/questions/:id/answers", answerValidators.create,answerController.store);

//|-----------------| Rotas do Feed |-----------------|
routes.get("/questions/feed", feedController.index)

module.exports = routes;