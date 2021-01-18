const { Model, DataTypes } = require("sequelize");

class Question extends Model {

    //Aqui inicializamos nossos campos da tabela
    static init(sequelize){
        super.init(
            {
                title: DataTypes.STRING,
                description: DataTypes.STRING,
                image: DataTypes.STRING,
                gist: DataTypes.STRING,
                
            },
            {
                //tableName - serve para especificar o nome da tabela
                sequelize,
            }
        )
    }
    /*
        Aqui configuramos os relacionamentos
    */
    static associate(models){
        this.belongsTo(models.Student);
        this.belongsToMany(models.Category, {through:"question_category"});
        this.hasMany(models.Answer);
    }
}

module.exports = Question;