const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
// Middlewares globales
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
// Middleware para archivos estáticos
app.use('/uploads', express.static('uploads'));
// Rutas
app.get('/', (req, res) => {
res.json({
mensaje: 'Marketplace Inteligente API',
version: '1.0.0',
documentacion: '/api-docs'
});
});
// Manejo de errores global
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(err.status || 500).json({
error: true,
mensaje: err.message || 'Error interno del servidor'
});
});
// Middleware para rutas no encontradas
app.use('', (req, res) => {
res.status(404).json({
error: true,
mensaje: 'Endpoint no encontrado'
});
});

app.listen(PORT, () => {
console.log(` Servidor corriendo en puerto ${PORT}`);
console.log(` Logs: ${process.env.NODE_ENV || 'development'}`);
});
const { testConnection } = require('./src/config/database');
testConnection();