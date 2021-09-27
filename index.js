require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config")
// crear el servidor express

const app = express();

// COnfigurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json())

// Base de datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login',require("./routes/auth"));

app.listen(process.env.PORT, () => {
    console.log("Servodor corriendo en el purto:", process.env.PORT);
});