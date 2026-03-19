const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario'); 

class UsuarioController {
    // Crear Usuario
    static async crear(req, res, next) {
        try {
            const errores = validationResult(req);
            if (!errores.isEmpty()) {
                return res.status(400).json({ error: true, errores: errores.array() });
            }

            const { nombre, email, password, rol } = req.body;
            const usuarioExistente = await Usuario.buscarPorEmail(email);
            
            if (usuarioExistente) {
                return res.status(409).json({ error: true, mensaje: 'El email ya existe' });
            }

            const salt = await bcrypt.genSalt(12);
            const passwordEncriptada = await bcrypt.hash(password, salt);

            const resultado = await Usuario.crear({
                nombre, email, password: passwordEncriptada, rol: rol || 'comprador'
            });

            res.status(201).json({ error: false, mensaje: 'Usuario creado', id: resultado.id });
        } catch (error) { next(error); }
    }

    // Listar Usuarios
    static async listar(req, res, next) {
        try {
            const usuarios = await Usuario.obtenerTodos(req.query);
            res.json({ error: false, usuarios });
        } catch (error) { next(error); }
    }

    // Obtener uno solo
    static async obtener(req, res, next) {
        try {
            const usuario = await Usuario.buscarPorId(req.params.id);
            if (!usuario) return res.status(404).json({ error: true, mensaje: 'No encontrado' });
            res.json({ error: false, usuario });
        } catch (error) { next(error); }
    }

    // Actualizar
    static async actualizar(req, res, next) {
        try {
            const { id } = req.params;
            const { nombre, rol } = req.body;
            const actualizado = await Usuario.actualizar(id, { nombre, rol });
            if (!actualizado) return res.status(404).json({ error: true, mensaje: 'No encontrado' });
            res.json({ error: false, mensaje: 'Actualizado correctamente' });
        } catch (error) { next(error); }
    }

    // Eliminar
    static async eliminar(req, res, next) {
        try {
            const eliminado = await Usuario.eliminar(req.params.id);
            if (!eliminado) return res.status(404).json({ error: true, mensaje: 'No encontrado' });
            res.json({ error: false, mensaje: 'Eliminado correctamente' });
        } catch (error) { next(error); }
    }

   
}

module.exports = UsuarioController;