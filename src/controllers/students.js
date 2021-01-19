const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const auth = require("../config/auth.json");
const jwt = require("jsonwebtoken");

module.exports = {
    //Cria a função que vai ser executa pela rota
    async index(req, res){

        try {
            const student = await Student.findAll();
            res.send(student);
        } catch (error) {
            console.log(error);
            res.status(500).send({error})
            
        }
    },

    async store(req, res){
        const {ra, name, email, password} = req.body;
    
        try {
            let student = await Student.findOne({
                where: {
                    ra
                } 
            });

            if(student)
                return res.status(400).send({error:"Aluno já cadastrado"});
            //Métodos de criptografar
            //hash(variavelQueSeráCriptografa) -> retorna uma promesa
            //hashSync(variavelQueSeráCriptografa) -> retorna a criptografia

            const passwordCript = bcrypt.hashSync(password);

            student = await Student.create({ra, name, email, password:passwordCript});

            const token = jwt.sign({
                studentId: student.id,
                studentName: student.name
            }, auth.secret);

            res.status(201).send({
                student: {
                    studentId: student.id,
                    Name: student.name,
                    ra: student.ra,
                    email: student.email
                },
                token
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        
        
        // const resultado = await Student.findOne( { where: {ra: ra } } );

        // if(resultado == null){
        //     let aluno = await Student.create({ra, nome, email, senha});
        //     res.status(201).send(aluno);
        // }
        // else{
        //     res.status(400).send({erro:"RA já registrado"});
        // }
        // console.log(alunos[alunos.length -1].id + 1)
        // const nextId = alunos.length > 0 ? alunos[alunos.length -1].id + 1 : 1;
    
        // alunos.push({id:nextId, ra, nome, email, senha});
        // usuario.id = alunos.length;
        // // return console.log(usuario);
        // alunos.push(usuario);
        // 
    },

    async update(req, res){
        //Recuperar o id do aluno
        const studentId = req.params.id;
    
        //Recuperar os dados do corpo
        const {name,email} = req.body
    
        //Fazer a alteração
        try {
            let student = await Student.findByPk(studentId);

            if(!student)
                res.status(404).send({error: "Aluno não encontrado."})

            student.name = name;
            student.email = email;

            student.save();

            //Retornar a resposta
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }    
    
    
        // const alunoId = req.params.id;
        // const novosDados = req.body;
    
        // alunoEditar = alunos.filter(a => a.id.toString() === alunoId);
        // alunoEditar = {
        //     "id":alunoEditar[0].id,
        //     "ra":alunoEditar[0].ra,
        //     "nome":novosDados.nome,
        //     "email":novosDados.email,
        //     "senha":novosDados.senha
        // }
    
        // return(console.log(alunoEditar));
        // // const {nome, email, senha} = req.body;
        // // console.log(req.body);
    },
    
    async delete(req,res){
        //Recuperar o id do aluno
        const studentId = req.params.id;
    
        //retirar esse aluno da lista
        try {
            let student = await Student.findByPk(studentId);
        
            if(!student)
                return res.status(404).send({error: "Aluno não encontrado."});
            
            await student.destroy();
            
            //devolver resposta de sucesso
            res.status(204).send();

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    async find(req, res){
        //Recuperar o id do aluno
        const studentId = req.params.id;

        try {
            let student = await Student.findByPk(studentId, {
                attributes: ['id', 'ra','name', 'email']
            });
            if(!student)
                return res.status(404).send({erro: "Aluno não encontrado."});
        
            res.send(student);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    
        //retirar esse aluno da lista
        // const alunoBuscado = alunos.filter(a => a.id.toString() === alunoId);
    
        //devolver resposta de sucesso
        // res.status(200).send(alunoBuscado);
        // console.log(alunoBuscado);
        
    }
};