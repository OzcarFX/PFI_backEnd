import * as model from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  res.json(await model.getAllProducts());
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await model.getProductById(id);
  if (!product) {
    return res.status(404).json({ error: "Not Found" });
  }
  res.json(product);
};

export const createProduct = async (req, res) => {

    //console.log("Tipo de req.body:", typeof req.body);
    //console.log("Contenido de req.body:", req.body);
    if (!req.body.nombre) { 
        return res.status(422).json({ error: "El nombre es obligatorio" });
    }
    
    // Pasa el objeto completo al modelo
    // La variable 'producto' contiene { nombre: "...", valor: ..., categorias: [...] }
    const producto = req.body; 

    // Llama al modelo pasando el objeto producto completo
    const product = await model.createProduct(producto); 

    res.status(201).json(product);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deleted = await model.deleteProduct(id);

  if (!deleted) {
    return res.status(404).json({ error: "Not Found" });
  }

  res.json({ message: "Product deleted" });
};
