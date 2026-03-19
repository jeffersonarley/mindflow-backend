const rateLimit = require('express-rate-limit');

// Límite estricto para Login/Registro (Lo que ya tienes)
const limiteAuth = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, 
    message: { error: true, mensaje: 'Demasiados intentos. IP bloqueada temporalmente.' },
    standardHeaders: true, // Informa al usuario cuántos intentos le quedan
    legacyHeaders: false,
});

// Límite GENERAL para el resto de la App (Protección DoS)
const limiteGeneral = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 100, // Permite 100 peticiones
    message: { error: true, mensaje: 'Tráfico inusual detectado desde su IP.' }
});

module.exports = { limiteAuth, limiteGeneral };