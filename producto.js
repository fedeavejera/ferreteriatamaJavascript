
// creando clase de producto

class Producto {
    constructor(id, nombre, marca, precio, stock, img){
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.stock = stock;
        this.img = img;
        this.cant = 1;

    }
}

// Array de productos

let productos = []