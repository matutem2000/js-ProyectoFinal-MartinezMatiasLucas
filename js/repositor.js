// Productos


document.addEventListener('DOMContentLoaded', function () {
const inputBusqueda = document.getElementById('busqueda');
const tablaProductos = document.getElementById('tablaProductos');
const botonOrdenarPorPrecioDs = document.getElementById('ordenarPorPrecioDs');
const botonOrdenarPorPrecioAs = document.getElementById('ordenarPorPrecioAs');

//let productosSupermercado = [];

fetch("../json/productos.json")
.then((response) => response.json()) // Obtén el contenido del archivo como JSON
.then((productosSupermercado) => {
  
  renderizarProductos(productosSupermercado);
  // Agregar controlador de evento para el botón "Guardar" en cada modal
  const botonesGuardar = document.querySelectorAll('[id^="botonModificar-"]');
  
  botonesGuardar.forEach(boton => {
  boton.addEventListener('click', function(event) {
    // Obtener el id del producto
    const idProducto = event.currentTarget.getAttribute('data-idproducto');
    
    // Obtener los nuevos valores de input
    const nuevoNombre = document.querySelector(`#nuevoNombre-${idProducto}`).value;
    const nuevaCategoria = document.querySelector(`#nuevaCategoria-${idProducto}`).value;
    const nuevoPrecio = document.querySelector(`#nuevoPrecio-${idProducto}`).value;
    const nuevaCantidad = document.querySelector(`#nuevaCantidad-${idProducto}`).value;
      
    
    // Actualizar los valores correspondientes en productosSupermercado
    for (let i = 0; i < productosSupermercado.length; i++) {
      if (productosSupermercado[i].idProducto == idProducto) {
        productosSupermercado[i].nombre = nuevoNombre;
        productosSupermercado[i].categoria = nuevaCategoria;
        productosSupermercado[i].precio = parseFloat(nuevoPrecio); // Convierte a número
        productosSupermercado[i].cantidadDisponible = parseInt(nuevaCantidad); // Convierte a número entero
        break; // Salir del bucle una vez que se haya actualizado el producto
      }
    }
    // Renderizar la tabla de productos nuevamente con los valores actualizados
    renderizarProductos(productosSupermercado);
  });
  });
  
  })
  .catch((error) => {
    console.error("Error al cargar los datos de productos:", error);
  });
  
  
  function renderizarProductos(productosSupermercado) {
    tablaProductos.innerHTML = '';
    productosSupermercado.forEach(({idProducto, nombre, categoria, precio, cantidadDisponible, marca}) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${idProducto}</td>
        <td>${nombre}</td>
        <td>${categoria}</td>
        <td>${precio}</td>
        <td>${cantidadDisponible}</td>
        <td>${marca}</td>
        <td><button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modificarProducto-${idProducto}">Modificar</button></td>
        <!-- Modal -->
          <div class="modal fade" id="modificarProducto-${idProducto}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modificar ${nombre}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="formularioModificar">
                <div class="modal-body">
                  <p>Nombre producto : <input type="text" id="nuevoNombre-${idProducto}" name="nombreProducto" value="${nombre}"></p>
                  <p>Categoria : <input type="text" id="nuevaCategoria-${idProducto}" name="categoriaProducto" value="${categoria}"></p>
                  <p>Precio : <input type="text" id="nuevoPrecio-${idProducto}" name="precioProducto" value="${precio}"></p>
                  <p>Cantidad disponible : <input type="text" id="nuevaCantidad-${idProducto}" name="cantidadDisponible" value="${cantidadDisponible}"></p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  <button type="button" class="btn btn-primary" id="botonModificar-${idProducto}" data-idproducto="${idProducto}"  data-nombre="${nombre}" data-categoria="${categoria}" data-precio="${precio}" data-cantidad="${cantidadDisponible}" data-bs-dismiss="modal"> Guardar</button>
                </div>
                </form>
              </div>
            </div>
          </div>
      `;
      tablaProductos.appendChild(fila);
    });
  }
  //Filtrar productos
  function filtrarProductos() {
    const terminoBusqueda = inputBusqueda.value.toLowerCase();
    const productosFiltrados = productosSupermercado.filter(producto =>
      producto.nombre.toLowerCase().includes(terminoBusqueda) || producto.categoria.toLowerCase().includes(terminoBusqueda)
    );
    renderizarProductos(productosFiltrados);
  }
  //Ordenar productos
  function ordenarProductosPorPrecioDescendente() {
      const productosOrdenados = productosSupermercado.sort((productoA, productoB) => productoB.precio - productoA.precio);
    renderizarProductos(productosOrdenados);
  }
  function ordenarProductosPorPrecioAscedente() {
    const productosOrdenados = productosSupermercado.sort((productoA, productoB) => productoA.precio - productoB.precio);
  renderizarProductos(productosOrdenados);
  }
  inputBusqueda.addEventListener('input', filtrarProductos);
  botonOrdenarPorPrecioDs.addEventListener('click', ordenarProductosPorPrecioDescendente);
  botonOrdenarPorPrecioAs.addEventListener('click', ordenarProductosPorPrecioAscedente);
})








