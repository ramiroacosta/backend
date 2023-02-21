import express from "express";

const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');

import { __dirname, __filename } from "./path.js";

import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js"


const upload = multer({ storage: storage })

const app = express();
const PORT = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.use('/static', express.static(__dirname + '/public'))
app.use("/api/products", routerProduct)
app.use("/api/carts", routerCart)
app.post("/upload", upload.single("product"), (req, res) => {
    res.send("Imagen Cargada")
})


app.listen(PORT, () => {
    console.log(`Server on port:${PORT}`);
});


const server = http.createServer(app);
const io = socketIO(server);

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Crear el endpoint para la vista "index"
app.get('/', (req, res) => {
  // Renderizar la vista "index.handlebars"
  res.render('index', { products: [] });
});

// Crear el endpoint para la vista "realTimeProducts"
app.get('/realtimeproducts', (req, res) => {
  // Renderizar la vista "realTimeProducts.handlebars"
  res.render('realTimeProducts', { products: [] });
});

// Escuchar las conexiones de Websockets
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Enviar la lista de productos a un nuevo cliente
  socket.emit('products', []);

  // Escuchar la creación de un nuevo producto
  socket.on('createProduct', (product) => {
    console.log('Nuevo producto creado:', product);
    // Agregar el nuevo producto a la lista
    // Enviar la nueva lista de productos a todos los clientes conectados
    io.emit('products', []);
  });

  // Escuchar la eliminación de un producto
  socket.on('deleteProduct', (product) => {
    console.log('Producto eliminado:', product);
    // Eliminar el producto de la lista
    // Enviar la nueva lista de productos a todos los clientes conectados
    io.emit('products', []);
  });
});

// Iniciar el servidor
server.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
