const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// IMPORTAR RUTAS
const usuarioRoutes = require('./src/routes/usuarioRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos estáticos
app.use('/uploads', express.static('uploads'));
<<<<<<< HEAD
// Rutas


=======

// Rutas base
>>>>>>> 7c74f8417d18b22496ffe8ec208871f636c4138d
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Marketplace Inteligente API',
        version: '1.0.0',
        documentacion: '/api-docs'
    });
});

// VINCULAR LAS RUTAS DE USUARIOS
// Esto hace que todas las rutas de usuario empiecen con /api/usuarios
app.use('/api/usuarios', usuarioRoutes); 

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: true,
        mensaje: err.message || 'Error interno del servidor'
    });
});

// Middleware para rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({
        error: true,
        mensaje: 'Endpoint no encontrado'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

const { testConnection } = require('./src/config/database');


testConnection();