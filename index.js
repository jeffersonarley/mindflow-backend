const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// 1. IMPORTAR LIMITADORES (NUEVO)
// Antes: require('./src/middleweares/rateLimit');
// Después:
const { limiteGeneral } = require('./src/middleweares/rateLimiter');

// IMPORTAR RUTAS
const usuarioRoutes = require('./src/routes/usuarioRoutes'); 
const authRoutes = require('./src/routes/authRoutes'); 
const { testConnection } = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// 2. MIDDLEWARES GLOBALES
app.use(limiteGeneral); // ✅ PROTECCIÓN GLOBAL: Aplica a todas las rutas por defecto
app.use(cors());
app.use(morgan('dev')); 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 3. Archivos estáticos
app.use('/uploads', express.static('uploads'));

// 4. Rutas base
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Marketplace Inteligente API',
        version: '1.0.0',
        documentacion: '/api-docs'
    });
});

// 5. VINCULAR LAS RUTAS
app.use('/api/usuarios', usuarioRoutes); 
app.use('/api/auth', authRoutes); 

// 6. Middleware para rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({
        error: true,
        mensaje: 'Endpoint no encontrado'
    });
});

// 7. Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: true,
        mensaje: err.message || 'Error interno del servidor'
    });
});

// 8. Arrancar Servidor y Probar Conexión
app.listen(PORT, async () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    try {
        await testConnection();
        console.log('✅ Conexión a la DB exitosa');
    } catch (error) {
        console.error('❌ No se pudo conectar a la DB:', error.message);
    }
});