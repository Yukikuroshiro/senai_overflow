//Importa o express
const { errors } = require("celebrate");
const express = require("express");

//Importar as rotas
const routes = require("./routes");

require("./database");

//Cria a aplicação express
const app = express();

app.use(express.json());

//Definimos a pasta uploads como pública, servindo arquivos estáticos
app.use("/uploads", express.static("uploads"));

app.use(routes);
app.use(errors());

module.exports = app;
