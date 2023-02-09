import express from "express";
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
