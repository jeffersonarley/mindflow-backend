const express = require('express');
const router = express.Router();

// 1. IMPORTACIONES (Limpias y sin duplicados)
const AuthController = require('../controllers/authController');
const { autenticar } = require('../middleweares/auth'); 
const { limiteAuth } = require('../middleweares/rateLimiter');

// 2. RUTAS PÚBLICAS (Con protección de fuerza bruta)
// Aplicamos limiteAuth para que nadie intente registrarse o loguearse mil veces
router.post('/registro', limiteAuth, AuthController.registro);
router.post('/login', limiteAuth, AuthController.login);

// 3. RUTAS PROTEGIDAS (Requieren Token)
router.get('/perfil', autenticar, AuthController.perfil);
router.post('/cambiar-password', autenticar, AuthController.cambiarPassword);

module.exports = router;