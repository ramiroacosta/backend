class ProductManager {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.getProducts =[]
        }
        addPruduct(){
            const product1 = {tittle:"iphone11", description:"celular nuevo", price:1000, thumbnail:"sin imagen", code:"ad684",stock: 10 }
            this.getProducts.push(product1)
            console.log(code.includes("ad684"))
            function incrementador(id=1){
                while(true){
                    yield id;
                    ++id;
                }
            }
            let generador = incrementador()
            console.log(generador.next())
        }
        get getProducts(){
            return this.getProducts
        }
}
