const { Model, DataTypes } = require("sequelize");

class Question extends Model {

    //Aqui inicializamos nossos campos da tabela
    static init(sequelize){
        super.init(
            {
                titulo: DataTypes.STRING,
                descricao: DataTypes.STRING,
                imagem: DataTypes.STRING,
                gist: DataTypes.STRING,
                
            },
            {
                //tableName - serve para especificar o nome da tabela
                sequelize,
                tableName: "perguntas"
            }
        )
    }
    /*
        Aqui configuramos os relacionamentos
    */
    static associate(models){
        this.belongsTo(models.Student, {foreignKey:"aluno_id"});
        this.belongsToMany(models.Category, {through:"question_category"});
        this.hasMany(models.Answer);
    }
}

module.exports = Question;