const { Model, DataTypes } = require("sequelize");

class Answer extends Model{
    static init(sequelize){
        super.init(
            {
                answer: DataTypes.TEXT,
                student_id: DataTypes.INTEGER
            },
            {
                sequelize,
            }
        )
    }
    static associate(models){
        this.belongsTo(models.Student);
        this.belongsTo(models.Question);
    }
}

module.exports = Answer;