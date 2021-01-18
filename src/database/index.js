const Sequelize = require("sequelize");
const dbconfig = require("../config/database");

//Imports dos models
const Student = require("../models/Student");
const Question = require("../models/Question");
const Category = require("../models/Category");
const Answer = require("../models/Answer");

const connection = new Sequelize(dbconfig);

//Inicializa os models
Student.init(connection);
Question.init(connection);
Category.init(connection);
Answer.init(connection);

//Inicializa os relacionamentos
Student.associate(connection.models);
Question.associate(connection.models);
Category.associate(connection.models);
Answer.associate(connection.models);