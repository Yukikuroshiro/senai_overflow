const Question = require("../models/Question");
const Student = require("../models/Student");


module.exports = {
    async index(req, res){
        // const questionId = req.params.id;

        // let question = await Question.findByPk(questionId);

        // //Se aluno não existir, retorno erro
        // try {
        //     if(!question)
        //         return res.status(404).send({erro:"Pergunta não encontrada"});        

        //     let answers = question.hasAnswers(questionId);

        //     res.status(200).send(answers);
        // } catch (error) {
        //     console.log(error);
        //     res.status(500).send(error);
        // }
    },
    async store(req, res){
        const questionId = req.params.id;
        const studentId = req.headers.authorization;
        const answer = req.body.answer;

        try {
            //Buscar o aluno pelo ID
            let student = await Student.findByPk(studentId);
            if(!student)
                return res.status(404).send({erro:"Aluno não encontrado"});

            //Verifica se a pergunta existe
            let question = await Question.findByPk(questionId);

            //Se pergunta não existir, retorna erro 404
            if(!question)
                return res.status(404).send({erro:"Pergunta não encontrada"});

            //Cria a resposta para a pergunta com o aluno do token
            const result = await question.createAnswer({answer,student_id:studentId});

            //Responde com status de sucesso
            res.status(201).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    find(req, res){
        
    },
    update(req, res){
        
    },
    delete(req, res){
        
    }
}