const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../bd');

// Funciones para la validación de correo y nombres
function validarEmail(email) {
    const chs = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return chs.test(email);
}

function validarPalabras(texto) {
    const chs = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+$/;
    return chs.test(texto);
}

// Ruta para el registro
router.post('/register', async (req, res) => {
    const { nombre, nombre_2, app_paterno, app_materno, email, password, confirm_pwd } = req.body;
    try {
        // Validacion general
        if (!nombre || !app_paterno || !app_materno || !email || !password || !confirm_pwd) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser llenados' });
        }

        // Validación de nombres y apellidos
        if (!validarPalabras(nombre.trim())) {
            return res.status(400).json({ error: 'El nombre solo debe tener letras' });
        }
        if (nombre_2.trim() !== '' && !validarPalabras(nombre_2.trim())) {
            return res.status(400).json({ error: 'El segundo nombre solo debe tener letras' });
        }
        if (!validarPalabras(app_paterno.trim()) || !validarPalabras(app_materno.trim())) {
            return res.status(400).json({ error: 'Los apellidos solo deben tener letras' });
        }
        
        // Validación de contraseña
        if (password.length < 8) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
        }

        if (password !== confirm_pwd) {
            return res.status(400).json({ error: 'Las contraseñas no coinciden' });
        }

        // Validaciones de coreo
        if (!validarEmail(email.trim())) {
            return res.status(400).json({ error: 'El correo electrónico no es válido' });
        }

        db.query('SELECT * FROM Usuario WHERE email = ?', [email], async (err, result) => {
            if (err) {
                console.log('Error al buscar email existente', err);
                return res.status(500).json({ error: 'Error en el servidor' });
            }
            if (result.length > 0) {
                return res.status(400).json({ error: 'El correo ya está registrado' });
            }

            // Hashea la contraseña
            const hashed = await bcrypt.hash(password, 10);

            db.query(
                'INSERT INTO Usuario (nombre, nombre_2, app_paterno, app_materno, email, password) VALUES (?, ?, ?, ?, ?, ?)',
                [nombre.trim(), nombre_2 ? nombre_2.trim() : null, app_paterno.trim(), app_materno.trim(), email.trim(), hashed],
                (err, result) => {
                    if (err) {
                        console.log('Error al registrar al usuario', err);
                        return res.status(500).json({ error: 'Error al registrar' });
                    }
                    console.log("Usuario registrado con el ID", result.insertId);
                    res.status(200).json({ message: 'Usuario registrado' });
                }
            );
        });
    } catch (error) {
        console.log('Error en el servidor al momento de registrar: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta del login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }

    db.query('SELECT * FROM Usuario WHERE email = ?', [email], async (err, result) => {
        if (err) {
            console.log('Error en la consulta del login: ', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (!result || result.length === 0) {
            console.log('Usuario no encontrado.');
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const user = result[0];
        // Compara la contraseña ingresada con el hash almacenado
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            console.warn("Contraseña incorrecta para el usuario: ", email);
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user.id, nombre: user.nombre, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Token generado para el usuario: ', user.email);
        res.json({ token });
    });
});

module.exports = router;