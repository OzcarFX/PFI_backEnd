
//Buenas noches profe y disculpe la demora en la entrega del proyecto. 
//El mismo se fué realizando durantes las clases y se incorporaron algunos consejos como el hecho de no utilizar la capa de servicios 
// ya que en este proyecto era un simple pasa mano y no generaba ninguna ventaja. También notara que en algunos puntos utilicé 
// ayuda de AI Gemini para algunos errores que fueron surgiendo.
// 
import "dotenv/config";
import express from "express";
import productsRouter from "./src/routes/products.router.js";
import authRouter from "./src/routes/auth.router.js"; // <<< IMPORTA RUTA DE AUTENTICACIÓN
import { auth } from "./src/middleware/auth.middleware.js";

const app = express();
app.use(express.json());


app.use("/api", productsRouter);
app.use("/api", authRouter); // <<< RUTA DE AUTENTICACIÓN
app.use(auth);

app.get("/", auth, (req, res) => {
  res.send("API ...");
});


app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

//const PORT = 3000;
const PORT = process.env.PORT || 3008;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
