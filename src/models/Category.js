const { Model, DataTypes } = require("sequelize");

class Category extends Model {

    //Aqui inicializamos nossos campos da tabela
    static init(sequelize){
        super.init(
            {
                description: DataTypes.STRING,
            },
            {
                sequelize,
            }
        )
    }
    /*
        Aqui configuramos os relacionamentos
    */
    static associate(models){
        this.belongsToMany(models.Question, {through:"question_category"});
    }
}

module.exports = Category;