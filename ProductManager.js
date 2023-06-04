const fs = require("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.filePath = "products.json"; // ruta del archivo de persistencia
    this.loadProducts(); // cargar productos desde el archivo
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const codeExists = this.products.some((product) => product.code === code);
    if (codeExists) {
      throw new Error("El código de producto ya existe");
    }

    const product = {
      id: this.generateProductId(),
      title,
      description,
      price,
      thumbnail: thumbnail || "Sin imagen",
      code,
      stock,
    };

    this.products.push(product);
    this.saveProducts(); // guardar productos en el archivo
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) {
      throw new Error("Producto no encontrado");
    }

    const updatedProduct = { ...this.products[productIndex], ...updatedFields };
    this.products[productIndex] = updatedProduct;
    this.saveProducts(); // guardar productos actualizados en el archivo
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) {
      throw new Error("Producto no encontrado");
    }

    this.products.splice(productIndex, 1);
    this.saveProducts(); // guardar productos actualizados en el archivo
  }

  generateProductId() {
    const productId = this.products.length + 1;
    return productId.toString();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, "utf-8");
      this.products = JSON.parse(data);
      if (!Array.isArray(this.products)) {
        this.products = [];
      }
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.filePath, data, "utf-8");
  }
}

const productManager = new ProductManager();

// CREACION DE LOS 10 OBJETOS

productManager.addProduct(
  "producto 1",
  "Este es un producto prueba",
  100,
  "Sin imagen",
  "abc1",
  25
);
productManager.addProduct(
  "producto 2",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc2",
  25
);
productManager.addProduct(
  "producto 3",
  "Este es un producto prueba",
  300,
  "Sin imagen",
  "abc3",
  25
);
productManager.addProduct(
  "producto 4",
  "Este es un producto prueba",
  400,
  "Sin imagen",
  "abc4",
  25
);
productManager.addProduct(
  "producto 5",
  "Este es un producto prueba",
  500,
  "Sin imagen",
  "abc5",
  25
);
productManager.addProduct(
  "producto 6",
  "Este es un producto prueba",
   600,
  "Sin imagen",
  "abc6",
  25
);
productManager.addProduct(
  "producto 7",
  "Este es un producto prueba",
  700,
  "Sin imagen",
  "abc7",
  25
);
productManager.addProduct(
  "producto 8",
  "Este es un producto prueba",
  800,
  "Sin imagen",
  "abc8",
  25
);
productManager.addProduct(
  "producto 9",
  "Este es un producto prueba",
  900,
  "Sin imagen",
  "abc9",
  25
);
productManager.addProduct(
  "producto 10",
  "Este es un producto prueba",
  1000,
  "Sin imagen",
  "abc10",
  25
);

module.exports = ProductManager;
