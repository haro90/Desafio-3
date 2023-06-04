const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');

const productManager = new ProductManager();

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit) || productManager.getProducts().length;
  const products = productManager.getProducts().slice(0, limit);
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  try {
    const product = productManager.getProductById(id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
