require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config")
// crear el servidor express

const app = express();
// Base de datos

app.use(cors());
//Rutas

dbConnection();
// COnfigurar CORS

app.get('/', (req,res) => {
    res.json({
        ok:true,
        msg: 'Hola Mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log("Servodor corriendo en el purto:", process.env.PORT);
});