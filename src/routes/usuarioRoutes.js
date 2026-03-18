const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
<<<<<<< HEAD
const { validacionParametroId } = require('../middlewares/validaciones');
const router = express.Router();

// --- Rutas existentes ---

// POST /api/usuarios - Crear usuario
// Nota: Aquí podrías tener también validacionCrearUsuario si la usas
router.post('/', UsuarioController.crear);
=======
const {
    validacionCrearUsuario,
    validacionParametroId
} = require('../middlewares/validaciones');

// POST /api/usuarios - Crear usuario
router.post('/', validacionCrearUsuario, UsuarioController.crear);
>>>>>>> 7c74f8417d18b22496ffe8ec208871f636c4138d

// GET /api/usuarios - Listar usuarios
router.get('/', UsuarioController.listar);

// GET /api/usuarios/:id - Obtener usuario por ID
router.get('/:id', validacionParametroId, UsuarioController.obtener);

<<<<<<< HEAD
// ==========================================
// TAREA 1: AGREGAR ESTOS ENDPOINTS AQUÍ
// ==========================================

// Actualizar Usuario (PUT)
// Se activa con: http://localhost:3000/api/usuarios/:id
router.put('/:id', validacionParametroId, UsuarioController.actualizar);

// Eliminar Usuario (DELETE)
// Se activa con: http://localhost:3000/api/usuarios/:id
=======
// --- DESAFÍO: ACTUALIZAR Y ELIMINAR ---

// PUT /api/usuarios/:id - Actualizar usuario
router.put('/:id', validacionParametroId, UsuarioController.actualizar);

// DELETE /api/usuarios/:id - Eliminar usuario
>>>>>>> 7c74f8417d18b22496ffe8ec208871f636c4138d
router.delete('/:id', validacionParametroId, UsuarioController.eliminar);

module.exports = router;