
// funcion para cargar productos cards en el carrito modal

function cargarProductosCarrito(productosCarrito) {
    modalCarrito.innerHTML = " ";
    productosCarrito.forEach((productoEnCarrito, indice) => {
      modalCarrito.innerHTML += `
              <div class="card border-primary mb-3" id ="productoCarrito${indice}" style="max-width: 540px;">
                  <div class="row g-0">
                      <div class="col-md-4">
                          <img src="./img/${
                            productoEnCarrito.img
                          }" class="img-fluid rounded-start" alt="...">
                  </div>
              <div class="col-md-8">
                  <div class="card-body">
                 
  
                  <h5 class="card-title">${productoEnCarrito.nombre}</h5>
                  <div class="row">
                      <p class="card-text">Cantidad: ${productoEnCarrito.cant}</p>
                      <button class= "btn btn-outline-secondary" id="sum${indice}"><i class="fas fa-plus"></i></button>
                      <button class= "btn btn-outline-secondary" id="rest${indice}"><i class="fas fa-minus"></i></button> 
                  </div>
                  <p class="card-text">$${new Intl.NumberFormat("de-DE").format(
                    productoEnCarrito.precio * productoEnCarrito.cant
                  )}</p> 
                  <button class= "btn btn-danger" id="botonEliminar${indice}"><i class="fas fa-trash-alt"></i></button>
              </div>
              </div>
              </div>
          </div>
      `;
    });
    totalCarrito(productosCarrito);
    cargarEventosCarrito(productosCarrito);
    
} 


botonCarrito.addEventListener("click", () => {
    let productosCarrito = JSON.parse(localStorage.getItem("carrito"));
    if(productosCarrito == null){
        productosCarrito = [];
    }

    
    
    cargarProductosCarrito(productosCarrito);
    
  });

// funcion para calcular total $ de productos carritos segun cantidad
  function totalCarrito(productosStorage) {
   let acumulador = 0;
    productosStorage.forEach((productoCarrito) => {
      acumulador += productoCarrito.precio * productoCarrito.cant;
    });
  
    if (acumulador == 0) {
      parrafoCarrito.innerHTML = "";
      modalCarrito.innerHTML = "<p>No hay productos agregados en el carrito </p>";
    } else {
      parrafoCarrito.innerHTML = `Importe total $${new Intl.NumberFormat(
        "de-DE"
      ).format(acumulador)}`;
    }
  }
// funcion eventos del carrito, boton eliminar y actualizando/parseando localstorage/ agregar o disminuir cant de producto
  function cargarEventosCarrito(productosStorage) {
    productosStorage.forEach((productoCarrito, indice) => {
      document
        .getElementById(`botonEliminar${indice}`)
        .addEventListener("click", () => {          
          document.getElementById(`productoCarrito${indice}`).remove();
          productos.splice(indice, 1);
          localStorage.setItem("carrito", JSON.stringify(productos));
          cargarProductosCarrito(JSON.parse(localStorage.getItem("carrito")));
        });
    });
  
    productosStorage.forEach((productoCarrito, indice) => {
      document.getElementById(`sum${indice}`).addEventListener("click", () => {
        
        if (productos[indice].cant < productos[indice].stock) {
          productos[indice].cant++;
          localStorage.setItem("carrito", JSON.stringify(productos));
          cargarProductosCarrito(JSON.parse(localStorage.getItem("carrito")));
        }
      });
    });
  
    productosStorage.forEach((productoCarrito, indice) => {
      document.getElementById(`rest${indice}`).addEventListener("click", () => {
        
        if (productos[indice].cant > 1) {
          productos[indice].cant--;
          localStorage.setItem("carrito", JSON.stringify(productos));
          cargarProductosCarrito(JSON.parse(localStorage.getItem("carrito")));
        }
      });
    });
  }
// evento click en finalizar compra + mensaje
  finalizarCompra.addEventListener("click", () => {
    localStorage.setItem("carrito", JSON.stringify([]));
    swal(
      "Compra realizada con exito!",
      "Gracias por confiar en Ferretería Tama, los productos seran enviados a la brevedad.",
      "success"
    );
  });
  