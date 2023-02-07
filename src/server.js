import express from "express";

import ProductManager from "/main.js";

const manager = new ProductManager("main.json");

const app = express(); 

app.use(express.urlencoded({ extended: true })); 

const PORT = 8080;


app.get("/", (req, res) => {
  res.send("Primer servidor con express");
});

app.get("/products", async (req, res) => {
  const products = await manager.getProducts();
  let { limit } = req.query;
  if (limit) {
    res.send(products.slice(0, limit));
  } else {
    res.send(products);
  }
});

app.get("/products/:id", async (req, res) => {
  const product = await manager.getById(parseInt(req.params.id));
  if (product) {
    res.send(product);
  } else {
    res.json({ Error: "id not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
