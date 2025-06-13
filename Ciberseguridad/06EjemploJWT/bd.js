const mysql = require('mysql2');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Crear una conexión con la base de datos
const db = mysql.createConnection({
    host : process.env.BD_HOST,
    user : process.env.BD_USER,
    password : process.env.BD_PASSWORD,
    database : process.env.BD_NAME,
});

// Verificar que se conecte
db.connect(err => {
    if (err) throw err;
    console.log("Conectado a la BD en MYSQL");
    console.log("host : " , process.env.BD_HOST);
    console.log("user : " , process.env.BD_USER);
    console.log("password : " , process.env.BD_PASSWORD);
    console.log("database : " , process.env.BD_NAME);
})

module.exports = db;