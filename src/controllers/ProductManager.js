import fs from "fs";



class Producto {
    constructor(title, description, price, thumbnail, code, stock,status,category) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = status;
        this.category = category;
    }
}



const producto1 = new Producto("Iphone 14", 2000, [] , "aaaa", 23,true,"");
const producto2 = new Producto("Iphone 13", 1500, [] , "aaab", 256,true,"");
const producto3 = new Producto("Iphone 12", 1000, [] , "aaac", 56,true,"");
const producto4 = new Producto("Iphone 11", 900, [] , "aaad", 32,true,"");
const producto5 = new Producto("Iphone 10", 800, [] , "aaae", 22,true,"");

const producto6 = new Producto("Iphone 14 pro max", 2000, [] , "aaaf", 253,true,"");
const producto7 = new Producto("Iphone 13 pro max", 1500, [] , "aaag", 56,true,"");
const producto8 = new Producto("Iphone 12 pro max", 1000, [] , "aaah", 526,true,"");
const producto9 = new Producto("Iphone 11 pro max", 900, [] , "aaai", 32,true,"");
const producto10 = new Producto("Iphone 10 pro max", 800, [] , "aaaj", 22,true,"");

export class ProductManager {
    constructor(path) {
        this.path = path;
    }

    checkArchivo = ()=>{
        return fs.existsSync(this.path)       
    }
    crearArchivo = async () => {
        await fs.promises.writeFile(this.path, "[]")
    }
    addProduct = async (newProduct,pathImg) => {
        if (newProduct.status===true && newProduct.category.length>0 &&toString(newProduct.id).length > 0 && newProduct.title.length > 0 && newProduct.description.length > 0 && toString(newProduct.price).length > 0  && newProduct.code.length > 0 && toString(newProduct.stock).length > 0) {
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
                    newProduct.thumbnail=pathImg;
                    aux.push({ id: idAutoincremental, ...newProduct });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }
                else{
                    const idAutoincremental = 1;
                    newProduct.thumbnail=pathImg;
                    aux.push({ id: idAutoincremental, ...newProduct });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }

            }
        } else {
            console.error("Debe tener todos los campos completos para agregarlo")
        }
    }

    getAllProducts= async()=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        return aux;   
    }
    updateProduct = async({id, title, description, price, thumbnail, code, stock, status, category})  => {
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
            if (aux.some(prod => prod.code==code)){
                console.error("No puede poner un codigo que ya existe")
            }else if(code!=undefined){
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
            if (status!=undefined){
                if (status==false)
                {
                    aux[pos].status = false;
                }else{
                    aux[pos].status = true;
                }
            }
            if (category!=undefined){
                if (category.length>0)
                {
                    aux[pos].category = category;
                }
            }
            
            await fs.promises.writeFile(this.path, JSON.stringify(aux))
            console.log("Producto actualizado exitosamente");
        } else {
            console.log( "Producto no encontrado para actualizar")
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
            return null
        }        
    }

    deleteProductById= async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) 
        {
            const arraySinElIdSeleccionado = aux.filter(product => product.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(arraySinElIdSeleccionado))
            console.log("Producto eliminado exitosamente");           
        }else{
            console.error("No se encontró el producto que desea eliminar")
        }        
    }

}




