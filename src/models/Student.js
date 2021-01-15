const { Model, DataTypes } = require("sequelize");

class Student extends Model {

    //Aqui inicializamos nossos campos da tabela
    static init(sequelize){
        super.init(
            {
                ra: DataTypes.STRING,
                nome: DataTypes.STRING,
                email: DataTypes.STRING,
                senha: DataTypes.STRING
            },
            {
                //tableName - serve para especificar o nome da tabela
                sequelize,
                tableName:"alunos"
            }
        )
    }
    /*
        Aqui configuramos os relacionamentos
    */
    static associate(models){
        this.hasMany(models.Question, {foreignKey: "aluno_id" });
        this.hasMany(models.Answer);
    }
}

module.exports = Student;