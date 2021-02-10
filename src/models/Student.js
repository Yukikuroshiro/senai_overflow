const { Model, DataTypes } = require("sequelize");

class Student extends Model {
  //Aqui inicializamos nossos campos da tabela
  static init(sequelize) {
    super.init(
      {
        ra: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
      },
      {
        //tableName - serve para especificar o nome da tabela
        sequelize,
      }
    );
  }
  /*
        Aqui configuramos os relacionamentos
    */
  static associate(models) {
    this.hasMany(models.Question);
    this.hasMany(models.Answer);
  }
}

module.exports = Student;
