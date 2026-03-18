 const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
<<<<<<< HEAD
const Usuario = require('./models/Usuario');

/**
 * UsuarioController
 * Clase para manejar la lógica de negocio de los usuarios
 */
class UsuarioController {
    
    // --- Registro / Creación ---
=======
const Usuario = require('../models/Usuario');

class UsuarioController {
    // 1. CREAR USUARIO
>>>>>>> 7c74f8417d18b22496ffe8ec208871f636c4138d
    static async crear(req, res, next) {
        try {
            const errores = validationResult(req);
            if (!errores.isEmpty()) {
<<<<<<< HEAD
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
=======
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

            const nuevoUsuario = await Usuario.crear({ 
                nombre, 
                email, 
                password: passwordEncriptada, 
                rol 
            });

            res.status(201).json({ 
                error: false, 
                mensaje: 'Usuario creado exitosamente', 
                usuario: nuevoUsuario 
            });
        } catch (error) {
            next(error); 
        }
    }

    // 2. OBTENER POR ID
>>>>>>> 7c74f8417d18b22496ffe8ec208871f636c4138d
    static async obtener(req, res, next) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.buscarPorId(id);
<<<<<<< HEAD
            if (!usuario) {
                return res.status(404).json({
                    error: true,
                    mensaje: 'Usuario no encontrado'
                });
            }
=======

            if (!usuario) {
                return res.status(404).json({ 
                    error: true, 
                    mensaje: 'Usuario no encontrado' 
                });
            }

>>>>>>> 7c74f8417d18b22496ffe8ec208871f636c4138d
            res.json({ error: false, usuario });
        } catch (error) {
            next(error);
        }
    }

<<<<<<< HEAD
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
=======
    // 3. LISTAR
>>>>>>> 7c74f8417d18b22496ffe8ec208871f636c4138d
    static async listar(req, res, next) {
        try {
            const filtros = {
                rol: req.query.rol,
<<<<<<< HEAD
                busqueda: req.query.q
            };
            const usuarios = await Usuario.obtenerTodos(filtros);
            res.json({ error: false, usuarios, filtros_aplicados: filtros });
=======
                busqueda: req.query.q,
                pagina: req.query.pagina,
                limite: req.query.limite
            };

            const usuarios = await Usuario.obtenerTodos(filtros);
            res.json({ 
                error: false, 
                usuarios, 
                filtros_aplicados: filtros 
            });
        } catch (error) {
            next(error);
        }
    }

    // 4. ACTUALIZAR (PUT)
    static async actualizar(req, res, next) {
        try {
            const { id } = req.params;
            const { nombre, rol } = req.body;

            const usuario = await Usuario.buscarPorId(id);
            if (!usuario) {
                return res.status(404).json({ 
                    error: true, 
                    mensaje: 'Usuario no encontrado' 
                });
            }

            await Usuario.actualizar(id, { nombre, rol });
            
            res.json({ 
                error: false, 
                mensaje: 'Usuario actualizado correctamente' 
            });
        } catch (error) {
            next(error);
        }
    }

    // 5. ELIMINAR (DELETE)
    static async eliminar(req, res, next) {
        try {
            const { id } = req.params;

            const usuario = await Usuario.buscarPorId(id);
            if (!usuario) {
                return res.status(404).json({ 
                    error: true, 
                    mensaje: 'Usuario no encontrado' 
                });
            }

            await Usuario.eliminar(id);
            res.json({ 
                error: false, 
                mensaje: 'Usuario eliminado exitosamente' 
            });
>>>>>>> 7c74f8417d18b22496ffe8ec208871f636c4138d
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UsuarioController;