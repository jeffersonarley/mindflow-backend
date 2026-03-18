const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('./models/Usuario');

/**
 * UsuarioController
 * Clase para manejar la lógica de negocio de los usuarios
 */
class UsuarioController {
    
    // --- Registro / Creación ---
    static async crear(req, res, next) {
        try {
            const errores = validationResult(req);
            if (!errores.isEmpty()) {
                return res.status(400).json({
                    error: true,
                    mensaje: 'Datos inválidos',
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
            const passwordEncriptada = await bcrypt.hash(password, 12);
            const nuevoId = await Usuario.crear({
                nombre,
                email,
                password: passwordEncriptada,
                rol
            });
            res.status(201).json({
                error: false,
                mensaje: 'Usuario creado exitosamente',
                id: nuevoId
            });
        } catch (error) {
            next(error);
        }
    }

    // --- Obtener por ID ---
    static async obtener(req, res, next) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.buscarPorId(id);
            if (!usuario) {
                return res.status(404).json({
                    error: true,
                    mensaje: 'Usuario no encontrado'
                });
            }
            res.json({ error: false, usuario });
        } catch (error) {
            next(error);
        }
    }

    /**
     * TAREA 1: Actualizar usuario (PUT /api/usuarios/:id)
     */
    static async actualizar(req, res, next) {
        try {
            const { id } = req.params;
            const { nombre, email, rol } = req.body;

            // Verificamos si el usuario existe antes de intentar actualizar
            const usuarioExistente = await Usuario.buscarPorId(id);
            if (!usuarioExistente) {
                return res.status(404).json({
                    error: true,
                    mensaje: 'No se puede actualizar: Usuario no encontrado'
                });
            }

            const exito = await Usuario.actualizar(id, { nombre, email, rol });

            if (exito) {
                res.json({
                    error: false,
                    mensaje: 'Usuario actualizado correctamente'
                });
            } else {
                res.status(400).json({
                    error: true,
                    mensaje: 'No se realizaron cambios en el usuario'
                });
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * TAREA 1: Eliminar usuario (DELETE /api/usuarios/:id)
     */
    static async eliminar(req, res, next) {
        try {
            const { id } = req.params;

            const exito = await Usuario.eliminar(id);

            if (exito) {
                res.json({
                    error: false,
                    mensaje: 'Usuario eliminado exitosamente'
                });
            } else {
                res.status(404).json({
                    error: true,
                    mensaje: 'No se pudo eliminar: El usuario no existe'
                });
            }
        } catch (error) {
            next(error);
        }
    }

    // --- Listar todos ---
    static async listar(req, res, next) {
        try {
            const filtros = {
                rol: req.query.rol,
                busqueda: req.query.q
            };
            const usuarios = await Usuario.obtenerTodos(filtros);
            res.json({ error: false, usuarios, filtros_aplicados: filtros });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UsuarioController;