const mysql = require('mysql2');
require('dotenv').config();

// Configuramos el grupo de conexiones (Pool)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportamos el pool configurado para usar promesas (async/await)
// Esto hace que el código sea más moderno y fácil de leer
module.exports = pool.promise();

// Mensaje de consola para saber que todo va bien
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error al conectar a la base de datos:', err.message);
    } else {
        console.log('✅ Base de datos conectada correctamente desde src/config/db.js');
        connection.release();
    }
});