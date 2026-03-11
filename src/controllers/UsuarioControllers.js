 const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

class UsuarioController {
    // 1. CREAR USUARIO
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

    // 3. LISTAR
    static async listar(req, res, next) {
        try {
            const filtros = {
                rol: req.query.rol,
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
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UsuarioController;