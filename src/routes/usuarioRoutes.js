const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const {
    validacionCrearUsuario,
    validacionParametroId
} = require('../middlewares/validaciones');

// POST /api/usuarios - Crear usuario
router.post('/', validacionCrearUsuario, UsuarioController.crear);

// GET /api/usuarios - Listar usuarios
router.get('/', UsuarioController.listar);

// GET /api/usuarios/:id - Obtener usuario por ID
router.get('/:id', validacionParametroId, UsuarioController.obtener);

// --- DESAFÍO: ACTUALIZAR Y ELIMINAR ---

// PUT /api/usuarios/:id - Actualizar usuario
router.put('/:id', validacionParametroId, UsuarioController.actualizar);

// DELETE /api/usuarios/:id - Eliminar usuario
router.delete('/:id', validacionParametroId, UsuarioController.eliminar);

module.exports = router;