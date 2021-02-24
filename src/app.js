//Importa o express
const { errors } = require("celebrate");
const express = require("express");

const cors = require("cors");

require("dotenv").config();

//Importar as rotas
const routes = require("./routes");

require("./database");

//Cria a aplicação express
const app = express();

app.use(express.json());

app.use(cors());

//Definimos a pasta uploads como pública, servindo arquivos estáticos
app.use("/uploads", express.static("uploads"));

app.use(routes);
app.use(errors());

module.exports = app;
