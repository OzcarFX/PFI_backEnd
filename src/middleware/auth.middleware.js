import jwt from "jsonwebtoken";

const secret_key = process.env.SECRET; 

// Middleware para verificar si un token JWT es válido.
export const auth = (req, res, next) => {
    // 1. Obtener el header de autorización
    //const authHeader = req.headers["authorization"];
      const authHeader = req.headers.authorization;
          
    // 2. Extrae el token (espera formato "Bearer TOKEN")
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        // 401: Token no proporcionado
        return res.status(401).json({ error: "Acceso denegado: Token requerido." });
    }

    // 3. Verificar el token
    jwt.verify(token, secret_key, (err, user) => {
        
        // 403: Token inválido o expirado
        if (err) {
            
            return res.status(403).json({ error: "Token inválido o expirado." });
        }
        
        // 4. Si es válido, pasar los datos del usuario a req.user (Opcional, pero buena práctica)
        req.user = user;
        
        // 5. Continuar a la ruta
        next();
    });
};