const fs = require('fs');
const ruta = "./desafio2Archivo.json";
const crearArchivo = async (ruta) => {
    if (!fs.existsSync(ruta)){
        await fs.promises.writeFile(ruta, "[]")
    }else if ((await fs.promises.readFile(ruta,"utf-8")).length==0){
        await fs.promises.writeFile(ruta, "[]")
    }
}
class product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
class ProductManager {
    constructor() {
        this.path = ruta;
    }
    addProduct = async (newProduct) => {
        if (toString(newProduct.id).length > 0 && newProduct.title.length > 0 && newProduct.description.length > 0 && toString(newProduct.price).length > 0 && newProduct.thumbnail.length > 0 && newProduct.code.length > 0 && toString(newProduct.stock).length > 0) {
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            let arrayProductos = JSON.parse(contenido);
            if (arrayProductos.filter(product => product.code == newProduct.code).length > 0) {
                console.error("Ya existe el producto");
            }
            else 
            {
                let contenido = await fs.promises.readFile(this.path, "utf-8");
                let aux = JSON.parse(contenido);
                console.log()
                if (aux.length>0){
                    const idAutoincremental = aux[aux.length-1].id+1; 
                    aux.push({ id: idAutoincremental, ...newProduct });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }
                else{
                    const idAutoincremental = 1;
                    aux.push({ id: idAutoincremental, ...newProduct });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }

            }
        } else {
            console.error("Debe tener todos los campos completos")
        }
    }

    getAllProducts= async()=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        return aux;   
    }
    // actualizo productos
    updateProduct = async({id, title, description, price, thumbnail, code, stock})  => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) {
            let pos = aux.findIndex(product => product.id === id)
            if (title!=undefined){
                if (title.length>0)
                {
                    aux[pos].title = title;
                }
            }
            if (description!=undefined){
                if (description.length>0)
                {
                    aux[pos].description = description;
                }
            }
            if (price!=undefined){
                if (price.length>0)
                {
                    aux[pos].price = parseFloat(price);
                }
            }
            if (thumbnail!=undefined){
                if (thumbnail.length>0)
                {
                    aux[pos].thumbnail = thumbnail;
                }
            }
            if (code!=undefined){
                if (code.length>0)
                {
                    aux[pos].code = code;
                }
            }
            if (stock!=undefined){
                if (stock.length>0)
                {
                    aux[pos].stock = parseInt(stock);
                }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(aux))
            console.log("Producto actualizado");
        } else {
            console.log( "Producto no encontrado")
        }
    
    }
    getProductById= async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) 
        {
            let pos = aux.findIndex(product => product.id === id)
            return aux[pos];
        }else{
            return "No se encontró el producto"
        }        
    }
    // borro productos
    deleteProductById= async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) 
        {
            const arraySinElIdSeleccionado = aux.filter(product => product.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(arraySinElIdSeleccionado))
            console.log("Producto eliminado");           
        }else{
            console.error("No se encontró el producto")
        }        
    }


}
// agrego los productos
const producto1=new product("Iphone 14","celular nuevo",1500,"sin imagen","#ghy123",30);
const producto2=new product("Iphone 13","celular nuevo",1400,"sin imagen","#ghy128",25);
const producto3=new product("Iphone 12","celular nuevo",1300,"sin imagen","#ghy126",17);
const producto4=new product("Iphone 11 pro","celular nuevo",1200,"sin imagen","#ghy124",14);
const producto5=new product("Iphone 11","celular nuevo",1000,"sin imagen","#ghy127",10);
const productoPrueba = new product("producto prueba", "Este es un producto prueba", 200, "sin Imagen", "#ghy129", 25);


//Creo un product manager
productManager = new ProductManager()
// pruebas
const prueba = async () => {
    
    await crearArchivo(ruta)
    console.log(await productManager.getAllProducts())
    await productManager.addProduct(productoPrueba)
    console.log(await productManager.getAllProducts())
    console.log(await productManager.getProductById(1))
    await productManager.updateProduct({id: 1, title:"Prueba ", description:"Exito"}) 
    console.log(await productManager.getProductById(1))
    await productManager.deleteProductById(1)
    console.log(await productManager.getAllProducts())
    await productManager.addProduct(producto1)
    await productManager.addProduct(producto2)
    await productManager.addProduct(producto3)
    await productManager.addProduct(producto4)
    await productManager.addProduct(producto5)
    await productManager.deleteProductById(4)
    await productManager.updateProduct({id: 7, title: "Nuevo iphone", description:"anteriormente era el 4", price:"1900", thumbnail:"sin foto",code:"#545dsaf",stock:"4"})
    console.log(await productManager.getAllProducts())
}
prueba()