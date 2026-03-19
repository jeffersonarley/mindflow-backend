const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
 const Usuario = require('../models/usuario'); 
const { generarToken } = require('../utils/jwt');
class AuthController {
static async registro(req, res, next) {
try {
const errores = validationResult(req);
if (!errores.isEmpty()) {
return res.status(400).json({
error: true,

mensaje: 'Datos de registro inválidos',
errores: errores.array()
});
}
const { nombre, email, password, rol } = req.body;
const usuarioExistente = await Usuario.buscarPorEmail(email);
if (usuarioExistente) {
return res.status(409).json({
error: true,
mensaje: 'El email ya está registrado'
});
}
const passwordHash = await bcrypt.hash(password, 12);
const nuevoUsuario = await Usuario.crear({
nombre,
email,
password: passwordHash,
rol: rol || 'comprador'
});
const token = generarToken(nuevoUsuario);
res.status(201).json({
error: false,
mensaje: 'Usuario registrado exitosamente',
usuario: nuevoUsuario,
token
});
} catch (error) {
next(error);
}
}
static async login(req, res, next) {
try {
const errores = validationResult(req);
if (!errores.isEmpty()) {
return res.status(400).json({
error: true,
mensaje: 'Credenciales inválidas',
errores: errores.array()
});
}
const { email, password } = req.body;
const usuario = await Usuario.buscarPorEmail(email);
if (!usuario) {
return res.status(401).json({
error: true,
mensaje: 'Credenciales incorrectas'
});

}
const passwordValida = await bcrypt.compare(password, usuario.password);
if (!passwordValida) {
return res.status(401).json({
error: true,
mensaje: 'Credenciales incorrectas'
});
}
const usuarioLimpio = {
id: usuario.id,
nombre: usuario.nombre,
email: usuario.email,
rol: usuario.rol
};
const token = generarToken(usuarioLimpio);
res.json({
error: false,
mensaje: 'Inicio de sesión exitoso',
usuario: usuarioLimpio,
token
});
} catch (error) {
next(error);
}
}
static async perfil(req, res, next) {
try {
const usuario = await Usuario.buscarPorId(req.usuario.id);
if (!usuario) {
return res.status(404).json({
error: true,
mensaje: 'Usuario no encontrado'
});
}
res.json({
error: false,
usuario
});
} catch (error) {
next(error);
}
}
static async cambiarPassword(req, res, next) {
        try {
            const { passwordActual, nuevaPassword } = req.body;
            const usuarioId = req.usuario.id; // Obtenido del token por el middleware

            // 1. Buscar el usuario en la base de datos
            // Usamos buscarPorEmail porque necesitamos traer el campo 'password' (el hash)
            const usuario = await Usuario.buscarPorId(usuarioId);
            const usuarioCompleto = await Usuario.buscarPorEmail(usuario.email);

            if (!usuarioCompleto) {
                return res.status(404).json({ error: true, mensaje: 'Usuario no encontrado' });
            }

            // 2. Verificar si la contraseña actual es correcta
            const esValida = await bcrypt.compare(passwordActual, usuarioCompleto.password);
            if (!esValida) {
                return res.status(401).json({
                    error: true,
                    mensaje: 'La contraseña actual es incorrecta'
                });
            }

            // 3. Encriptar la nueva contraseña
            const salt = await bcrypt.genSalt(12);
            const nuevoHash = await bcrypt.hash(nuevaPassword, salt);

            // 4. Guardar en la base de datos
            await Usuario.actualizarPassword(usuarioId, nuevoHash);

            res.json({
                error: false,
                mensaje: 'Contraseña actualizada con éxito'
            });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = AuthController;