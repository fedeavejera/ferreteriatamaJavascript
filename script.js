

// declaracion de variables

localStorage.setItem("carrito", JSON.stringify([]));
let divProductos = document.getElementById("divProductos");
let botonCarrito = document.getElementById("btnCarrito");
let categoriasFiltro = document.getElementById("filtro");
let modalCarrito = document.getElementById("modal-body");
let parrafoCarrito = document.getElementById("precioTotal");
let finalizarCompra = document.getElementById("btnFinalizarCompra");
// fetch llamando al archivo JSON local de productos - metodo para crear cards en html
function mostrarProductos(categoria) {
  fetch("productos.json")
    .then((response) => response.json())
    .then((dataProductos) => {
      let categorias = [];
      divProductos.innerHTML = ``;
      dataProductos.forEach((productoEnArray, indice) => {
        //Solo muestro producto de la categoria que me pasaron
        if (productoEnArray.categoria == categoria || categoria == "TODAS") {
          divProductos.innerHTML += `
                    <div class="card border-dark mb-3" id="producto${indice}" style="max-width: 20rem; margin:8px; background-color:#E97F08">
                        <div class="card-header" style="font-weight: bold">${productoEnArray.nombre}</div>
                        <img src="./img/${productoEnArray.img}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h4 class="card-title">${productoEnArray.marca}</h4>                
                            <p class="card-text" style="color:#ffc107">$${productoEnArray.precio}</p>
                            <p class="card-text">Stock:${productoEnArray.stock}</p>
                            <button id="boton${indice}" class="btn btn-dark"><i class="fas fa-cart-plus fa-1x"></i></button>
                        </div>
                    </div>
                   `;
        }

        if (!categorias.includes(productoEnArray.categoria)) {
          categorias.push(productoEnArray.categoria);
        }
      });
      
//    metodo para filtrar y cargar cantidades de productos en localStorage
      dataProductos.forEach((productoEnArray, indice) => {
        let element = document.getElementById(`boton${indice}`);
        if (element){
            element.addEventListener("click", () => {
                if (
                  productos.find(
                    (producto) => producto.nombre == productoEnArray.nombre
                  )
                ) {
                  let index = productos.findIndex(
                    (producto) => producto.nombre == productoEnArray.nombre
                  );
                  productos[index].cant++;
                  localStorage.setItem("carrito", JSON.stringify(productos));
                } else {
                  let nuevoProducto = new Producto(
                    productoEnArray.id,
                    productoEnArray.nombre,
                    productoEnArray.marca,
                    productoEnArray.precio,
                    productoEnArray.stock,
                    productoEnArray.img
                  );
                  productos.push(nuevoProducto);
                  localStorage.setItem("carrito", JSON.stringify(productos));
              }
              })

        }
        
          
      });

      //   cargo boton de filtrado con categorias sin duplicar
      categoriasFiltro.innerHTML = `<li><a class="dropdown-item" href="#">TODAS</a></li>`;
      categorias.forEach((categoria, indice) => {
        categoriasFiltro.innerHTML += `
                <li><a class="dropdown-item" href="#">${categoria}</a></li>          
                `;
      });

      // Jquery para actualizar filtro y productos html
      $("#filtro li a").click(function () {
        $(this).parents(".dropdown").find(".btn").text($(this).text());
        $(this).parents(".dropdown").find(".btn").val($(this).text());
        mostrarProductos($(this).text());
      });
    });
}

// Evento de animacion JQuery

$("#body").animate().fadeOut(10).delay(300).fadeIn(2500);

mostrarProductos("TODAS");
