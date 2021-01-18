'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("answers", {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:"students",
          key:"id"
        },
        onUpdate: "CASCADE",
        onDelete:"CASCADE"
      },
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:"questions",
          key:"id"
        },
        onUpdate: "CASCADE",
        onDelete:"CASCADE"
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("aswers");
  }
};
