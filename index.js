const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConnection = require('./database/config');

//servidor de express
const app = express();
//BBDD
dbConnection();
//puerto
const port = process.env.PORT;

//CORS
app.use(cors());

//parseo del body
app.use(express.json());

//public
app.use(express.static('public'));

//rutas
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));

//escuchar peticiones
app.listen(
    port,
    ()=>{console.log(`servidor corriendo en el puerto ${port}`)}
);