//Lo primero es empezar a definir el servidor que se encargara de realizar el almacenamiento de la aplicación

const express = require('express');
//express es el servidor
const cors = require('cors');
//cors es un modulo que se encarga de crear accesos a las rutas de los métodos
//Esos metodos son las rutas de acceso get, post, put, delete, etc.
//Como vamos a usar un jwt para poder acceder  por medio de una autentición
const authRouters = require ('./routers/auth');

//Necesitaremos los elementos de mi variable
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouters);

app.listen(3000, () => {
    console.log('Servidor en local: http://localhost:3000');
})
