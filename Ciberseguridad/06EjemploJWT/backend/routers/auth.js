const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./bd');


//Ruta para el registro
router.post('/register', async(req,res) => {
    const {email, password} = req.body;
    try{
        //Aquí es importante recordar que para el campo de password, es necesario hashearlo
        const hashed = await bcrypt.hash(password, 10);
        db.query('INSERT INTO usuarios (email, password) VALUES (?, ?)', [email, hashed], (err, result) => {
            if(err){
                console.log('Error al registrar al usuario', err);
                return res.status(500).send('Error al registrar');
                //res.send(a la página o al mensaje que programemos)
            }
            //debug
            console.log("Usuario registrado con el ID", result.insertId);
            res.status(200).send('Usuario registrado');
        })
    }catch(error){
        console.log('Error en el servidor al momento de registrar {register}: ', error);
        res.status(500).send('Error interno del servidor');
    }
});

//Ruta del login
router.post('./login', (req, res) => {
    db.query('SELECT * FROM usuarios WHERE emeail = ? ', [email], async(err, result) => {
        if(err){
            console.log('Error en la consulta del login: ', error);
            return res.status(500).send('Error en el servidor');
        }
        //Cuando no se encontro el email
        if(result,length === 0){
            console.log('Usuario no encontrado: ', error);
            return res.status(500).send('Credenciales invalidas');
        }

        //Si existe
        const user = result[0];
        //Validar el password hasheado
        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
            console.warn("Contraseña incorrecta para el usuario: ", email);
            return res.status(401).send('Contraseña incorrecta user no autorizado');
        }
        const token = jwt.sign(
            {id:user.id, email:user.email},
            //Este es el proceso del comparado del hash
            process.env.JWT_SECRET,
            {expiresIn:'2h'}
        );
        console.log('Token generado para el usuario: ', user.email);
        res.json({token});
    });
});

module.exports = router