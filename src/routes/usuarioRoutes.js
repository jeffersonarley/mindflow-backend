const express = require('express');
const router = express.Router();

// 1. Asegúrate de que los nombres coincidan con tus archivos (u minúscula)
const UsuarioController = require('../controllers/usuarioController');

// 2. OJO: Aquí usamos el nombre exacto de tu carpeta "middleweares"
const { validacionParametroId } = require('../middleweares/validaciones');

// Definición de Rutas
router.post('/', UsuarioController.crear);
router.get('/', UsuarioController.listar);
router.get('/:id', validacionParametroId, UsuarioController.obtener);
router.put('/:id', validacionParametroId, UsuarioController.actualizar);
router.delete('/:id', validacionParametroId, UsuarioController.eliminar);

module.exports = router;