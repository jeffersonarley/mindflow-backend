const { executeQuery } = require('../config/database');

class Usuario {
    // --- CREAR USUARIO ---
    static async crear(datosUsuario) {
        const { nombre, email, password, rol = 'comprador' } = datosUsuario;
        const query = `
            INSERT INTO users (nombre, email, password, rol, fecha_registro)
            VALUES (?, ?, ?, ?, NOW())
        `;
        try {
            const resultado = await executeQuery(query, [nombre, email, password, rol]);
            return { id: resultado.insertId, nombre, email, rol };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('El email ya está registrado');
            }
            throw error;
        }
    }

    // --- BUSCAR POR EMAIL ---
    static async buscarPorEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const usuarios = await executeQuery(query, [email]);
        return usuarios.length > 0 ? usuarios[0] : null;
    }

    // --- BUSCAR POR ID ---
    static async buscarPorId(id) {
        const query = 'SELECT id, nombre, email, rol, fecha_registro FROM users WHERE id = ?';
        const usuarios = await executeQuery(query, [id]);
        return usuarios.length > 0 ? usuarios[0] : null;
    }

    // --- TAREA 2: OBTENER TODOS CON FILTROS ---
   static async obtenerTodos(filtros = {}) {
        const { rol, q } = filtros;
        
        // 1. Base de la consulta
        let sql = 'SELECT id, nombre, email, rol, fecha_registro FROM users WHERE 1=1';
        const params = [];

        // 2. Filtro por Rol
        if (rol && rol !== "") {
            sql += ' AND rol = ?';
            params.push(rol);
        }

        // 3. Filtro por Búsqueda (q)
        if (q && q !== "") {
            sql += ' AND (nombre LIKE ? OR email LIKE ?)';
            const busqueda = `%${q}%`;
            params.push(busqueda, busqueda);
        }

        // 4. Ordenar por fecha (Sin LIMIT por ahora para probar)
        sql += ' ORDER BY fecha_registro DESC';

        try {
            // Esto imprimirá en tu consola negra para que veas qué falla
            console.log("SQL:", sql);
            console.log("Parámetros:", params);
            
            return await executeQuery(sql, params);
        } catch (error) {
            console.error("Error en la consulta:", error);
            throw error;
        }
    }

    // --- TAREA 1: ACTUALIZAR ---
    static async actualizar(id, datos) {
        const { nombre, rol } = datos;
        const query = 'UPDATE users SET nombre = ?, rol = ? WHERE id = ?';
        return await executeQuery(query, [nombre, rol, id]);
    }

    // --- TAREA 1: ELIMINAR ---
    static async eliminar(id) {
        const query = 'DELETE FROM users WHERE id = ?';
        return await executeQuery(query, [id]);
    }

    // --- CAMBIAR CONTRASEÑA ---
    static async actualizarPassword(id, nuevaPassword) {
        const query = 'UPDATE users SET password = ? WHERE id = ?';
        return await executeQuery(query, [nuevaPassword, id]);
    }
}

module.exports = Usuario;