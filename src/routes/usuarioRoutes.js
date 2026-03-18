const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const { validacionParametroId } = require('../middlewares/validaciones');
const router = express.Router();

// --- Rutas existentes ---

// POST /api/usuarios - Crear usuario
// Nota: Aquí podrías tener también validacionCrearUsuario si la usas
router.post('/', UsuarioController.crear);

// GET /api/usuarios - Listar usuarios
router.get('/', UsuarioController.listar);

// GET /api/usuarios/:id - Obtener usuario por ID
router.get('/:id', validacionParametroId, UsuarioController.obtener);

// ==========================================
// TAREA 1: AGREGAR ESTOS ENDPOINTS AQUÍ
// ==========================================

// Actualizar Usuario (PUT)
// Se activa con: http://localhost:3000/api/usuarios/:id
router.put('/:id', validacionParametroId, UsuarioController.actualizar);

// Eliminar Usuario (DELETE)
// Se activa con: http://localhost:3000/api/usuarios/:id
router.delete('/:id', validacionParametroId, UsuarioController.eliminar);

module.exports = router;