const Student = require("../models/Student");

module.exports = {
    //Cria a função que vai ser executa pela rota
    async listarAlunos(req, res){

        try {
            const alunos = await Student.findAll();
            res.send(alunos);
        } catch (error) {
            console.log(error);
            res.status(500).send({error})
            
        }
    },

    async adicionarAlunos(req, res){
        const {ra, nome, email, senha} = req.body;
    
        try {
            let aluno = await Student.findOne({
                where: {
                    ra
                } 
            });

            if(aluno)
                return res.status(400).send({erro:"Aluno já cadastrado"});

            aluno = await Student.create({ra, nome, email, senha});

            res.status(201).send(aluno);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
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

    async editarAluno(req, res){
        //Recuperar o id do aluno
        const alunoId = req.params.id;
    
        //Recuperar os dados do corpo
        const {nome,email} = req.body
    
        //Fazer a alteração
        try {
            let aluno = await Student.findByPk(alunoId);

            if(!aluno)
                res.status(404).send({erro: "Aluno não encontrado."})

            aluno.nome = nome;
            aluno.email = email;

            aluno.save();

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
    
    async deletarAluno(req,res){
        //Recuperar o id do aluno
        const alunoId = req.params.id;
    
        //retirar esse aluno da lista
        try {
            let aluno = await Student.findByPk(alunoId);
        
            if(!aluno)
                return res.status(404).send({erro: "Aluno não encontrado."});
            
            await aluno.destroy();
            
            //devolver resposta de sucesso
            res.status(204).send();

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    
    
    async buscarAluno(req, res){
        //Recuperar o id do aluno
        const alunoId = req.params.id;

        try {
            let aluno = await Student.findByPk(alunoId, {
                attributes: ['id', 'ra','nome', 'email']
            });
        
            if(!aluno)
                return res.status(404).send({erro: "Aluno não encontrado."});
        
            res.send(aluno);
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