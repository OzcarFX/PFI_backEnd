import jwt from "jsonwebtoken";
// Importar dotenv/config no es necesario aquí si ya está en index.js
//la variable SECRET ya está en process.env

export const login = (req, res) => {
  // Aseguramos que req.body esté disponible (gracias a app.use(express.json()) en index.js)
  const { email, password } = req.body;

  // Credenciales hardcodeadas para la prueba (Inseguro)
  if (email === "OzFX@fx.com" && password === "123456!") {
    
    // 1. Generar el Token
    // Payload: { email: "OzFX@fx.com" }
    // Secreto: process.env.SECRET
    const token = jwt.sign({ email }, process.env.SECRET, {
      expiresIn: "1h", // Expira en 1 hora
    });

    // 2. Respuesta exitosa con el token
    return res.json({ token });
  }

  // 3. Respuesta de error
  res.status(401).json({ error: "Credenciales invalidas" });
};