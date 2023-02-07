// class product {
//     constructor(title, description, price, thumbnail, code, stock) {
//         this.title = title
//         this.description = description
//         this.price = price
//         this.thumbnail = thumbnail
//         this.code = code
//         this.stock = stock
//     }
// }
// class ProductManager {
//     constructor() {
//         this.product = []
//     }
//     addProduct(newProduct) {
//         if (toString(newProduct.id).length>0 && newProduct.title.length>0 && newProduct.description.length>0 && toString(newProduct.price).length>0 && newProduct.thumbnail.length>0 && newProduct.code.length>0 && toString(newProduct.stock).length>0){
//             if(this.product.filter(product=> product.code==newProduct.code).length > 0){
//                 console.log("El producto ya existe")
//             }else{
//                 const id = ProductManager.idauto()
//                 this.product.push({id: id, ...newProduct})
//             }
//         }else{
//             console.log("Para agregar el producto debe cumplir con todos los requisitos")
//         }
//     }
//     getProducts() {
//         return this.product;
//     }
//     getProductsById(id){
//         if(this.product.find(product => product.id == id)!=undefined){
//             return this.product.find(product => product.id == id)
//         }else{
//             return "no existe el producto"
//         }
//     }
//     //clase stactic para el id automatico
//     static idauto() {
//         if(!this.idAnterior) {
//             this.idAnterior = 1
//         }else{
//             this.idAnterior++
//         }
//         return this.idAnterior
//     }
// }
// //creo todos los productos(van sin imagen)
// const producto1=new product("Iphone 14","celular nuevo",1500,"sin imagen","#ghy123",30);
// const producto2=new product("Iphone 13","celular nuevo",1400,"sin imagen","#ghy128",25);
// const producto3=new product("Iphone 12","celular nuevo",1300,"sin imagen","#ghy126",17);
// const producto4=new product("Iphone 11 pro","celular nuevo",1200,"sin imagen","#ghy124",14);
// const producto5=new product("Iphone 11","celular nuevo",1000,"sin imagen","#ghy127",10);

// productMaganer=new ProductManager()

// //muestro array vacio
// console.log(productMaganer.getProducts())

// //Agrego los productos al product manager
// productMaganer.addProduct(producto1);
// productMaganer.addProduct(producto2);
// productMaganer.addProduct(producto3);
// productMaganer.addProduct(producto4);
// productMaganer.addProduct(producto5);

// //muestro los productos
// console.log(productMaganer.getProducts())
// //muestro producto by id
// console.log(productMaganer.getProductsById(3))
