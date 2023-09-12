// Productos
//import { productosSupermercado } from "./productos.js";
import { vaciarCarritoEnLocalStorage } from "./vaciar.js";
import { realizarCompra } from "./comprar.js";

let productosSupermercado = [];

fetch("../json/productos.json")
  .then((response) => response.json()) // Obtén el contenido del archivo como JSON
  .then((data) => {
    productosSupermercado = data; // Asigna los datos obtenidos a la variable productosSupermercado
    renderizarProductos(productosSupermercado);
  })
  .catch((error) => {
    console.error("Error al cargar los datos de productos:", error);
  });

// Iniciar la tabla con todos los productos al cargar la página

//Renderizar productos a la tabla
function renderizarProductos(productosSupermercado) {
  tablaProductos.innerHTML = "";
  productosSupermercado.forEach(
    ({ idProducto, nombre, categoria, precio, cantidadDisponible, marca }) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
            <td>${idProducto}</td>
            <td>${nombre}</td>
            <td>${categoria}</td>
            <td>${precio}</td>
            <td>${cantidadDisponible}</td>
            <td>${marca}</td>
            <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modificarProducto-${idProducto}">Seleccionar</button></td>
            <!-- Modal -->
              <div class="modal fade" id="modificarProducto-${idProducto}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Seleccionar ${nombre}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                    <div class="modal-body">
                      
                      <p>Precio por unidad ${precio}</p>
                      <p>Cantidad que desea: <input type="number" name="cantidadDisponible" min="1" max="${cantidadDisponible}"></p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-primary" id="botonSelectProduct" data-idproducto="${idProducto}"  data-nombre="${nombre}" data-categoria="${categoria}" data-precio="${precio}" data-cantidad="${cantidadDisponible}" data-bs-dismiss="modal">Guardar</button>
                    </div>
                    </form>
                  </div>
                </div>
              </div>
          `;
      tablaProductos.appendChild(fila);
    }
  );
}

// Define la variable carrito
let carrito = [];

const inputBusqueda = document.getElementById("busqueda");
const tablaProductos = document.getElementById("tablaProductos");
const botonOrdenarPorPrecioDs = document.getElementById("ordenarPorPrecioDs");
const botonOrdenarPorPrecioAs = document.getElementById("ordenarPorPrecioAs");

//Filtrar productos
function filtrarProductos() {
  const terminoBusqueda = inputBusqueda.value.toLowerCase();
  const productosFiltrados = productosSupermercado.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(terminoBusqueda) ||
      producto.categoria.toLowerCase().includes(terminoBusqueda)
  );
  renderizarProductos(productosFiltrados);
}
//Ordenar productos
function ordenarProductosPorPrecioDescendente() {
  const productosOrdenados = productosSupermercado.sort(
    (productoA, productoB) => productoB.precio - productoA.precio
  );
  renderizarProductos(productosOrdenados);
}
function ordenarProductosPorPrecioAscedente() {
  const productosOrdenados = productosSupermercado.sort(
    (productoA, productoB) => productoA.precio - productoB.precio
  );
  renderizarProductos(productosOrdenados);
}

// Guardar producto seleccionado en carrito

tablaProductos.addEventListener("click", function (event) {
  if (event.target.id === "botonSelectProduct") {
    const idProducto = event.target.getAttribute("data-idproducto");
    const nombreProducto = event.target.getAttribute("data-nombre");
    const precioProducto = parseFloat(event.target.getAttribute("data-precio"));
    const cantidadDisponible = parseFloat(
      event.target.getAttribute("data-cantidad")
    );

    // Obtener los elementos de input del formulario en el modal
    const cantidadInput = document.querySelector(
      `#modificarProducto-${idProducto} input[name="cantidadDisponible"]`
    );

    // Obtener el valor del campo de cantidad
    const cantidadSeleccionada = parseInt(cantidadInput.value);

    // Verificar si la cantidad seleccionada es válida
    if (
      isNaN(cantidadSeleccionada) ||
      cantidadSeleccionada < 1 ||
      cantidadSeleccionada > cantidadDisponible
    ) {
      alert("Por favor, ingresa una cantidad válida.");
      return;
    }

    // Verifica si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(
      (producto) => producto.idProducto === parseInt(idProducto)
    );

    if (productoEnCarrito) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      productoEnCarrito.cantidad += cantidadSeleccionada;
    } else {
      // Si el producto no está en el carrito, agrégalo
      carrito.push({
        idProducto,
        nombre: nombreProducto,
        precio: precioProducto,
        cantidad: cantidadSeleccionada,
      });
    }

    // Guardar el carrito actualizado en el localStorage
    guardarCarritoEnLocalStorage();

    // Actualiza el contenido del carrito en el HTML
    actualizarCarrito();
  }
});

// Función para guardar el carrito en el localStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para cargar el carrito desde el localStorage y actualizar el HTML
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carritoGuardado;

  const carritoContainer = document.querySelector("#carritoContainer");
  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
  } else {
    const carritoHTML = carrito
      .map(
        (item) => `
      <p>${item.nombre} - Cantidad: ${item.cantidad} - Precio: ${
          item.precio * item.cantidad
        }</p>
    `
      )
      .join("");

    carritoContainer.innerHTML = carritoHTML;
    actualizarCarrito();
  }
}

// Función para actualizar el contenido del carrito en el HTML
function actualizarCarrito() {
  // Obtiene el contenedor del carrito
  const carritoContainer = document.querySelector(
    "#collapseOne .accordion-body"
  );

  // Vacía el carrito
  carritoContainer.innerHTML = "";

  // Agrega los productos del carrito
  if (carrito.length > 0) {
    const carritoList = document.createElement("ul");
    carrito.forEach((producto) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <p>
          Nombre: ${producto.nombre}
          Cantidad: ${producto.cantidad}
          Precio: ${producto.precio * producto.cantidad}
        </p>
      `;
      carritoList.appendChild(li);
    });
    carritoContainer.appendChild(carritoList);
  }

  // Agrega los botones
  const botonComprar = document.createElement("button");
  botonComprar.setAttribute("type", "button");
  botonComprar.setAttribute("class", "btn btn-primary");
  botonComprar.setAttribute("id", "botonComprar");
  botonComprar.setAttribute("data-bs-dismiss", "modal");
  botonComprar.innerHTML = "Comprar";

  const botonVaciar = document.createElement("button");
  botonVaciar.setAttribute("type", "button");
  botonVaciar.setAttribute("class", "btn btn-danger");
  botonVaciar.setAttribute("id", "botonVaciar");
  botonVaciar.setAttribute("data-bs-dismiss", "modal");
  botonVaciar.innerHTML = "Vaciar";

  carritoContainer.appendChild(botonComprar);
  carritoContainer.appendChild(botonVaciar);
  // Botón para vaciar
  const vaciarCarrito = document.getElementById("botonVaciar");
  vaciarCarrito.addEventListener("click", vaciarCarritoEnLocalStorage);
  // Botón para comprar
  const botonRealizarCompra = document.getElementById("botonComprar");
  botonRealizarCompra.addEventListener("click", realizarCompra);
}
// Carga el carrito desde el localStorage al cargar la página
cargarCarritoDesdeLocalStorage();

let actualizaProductosSuper = [];
// Función para descontar las cantidades de cada elemento del array de objetos productosSupermercado
function descontarCantidadesCarrito() {
  const valorLocalStorage = JSON.parse(localStorage.getItem("carrito"));

  // Recorremos el array de productos del supermercado
  productosSupermercado.forEach((prod, i) => {
    // Recorremos el array de productos del carrito
    valorLocalStorage.forEach((carritoItem) => {
      // Si el id del producto coincide, restamos la cantidad del producto del carrito de la cantidad disponible del producto del supermercado
      if (prod.idProducto == carritoItem.idProducto) {
        // Actualizamos la cantidad disponible del producto del supermercado
        productosSupermercado[i].cantidadDisponible =
          prod.cantidadDisponible - carritoItem.cantidad;

        renderizarProductos(productosSupermercado);
      }
    });
  });
}

inputBusqueda.addEventListener("input", filtrarProductos);
//Boton ordenar precios en forma descendente
botonOrdenarPorPrecioDs.addEventListener(
  "click",
  ordenarProductosPorPrecioDescendente
);
//Boton ordenar precios en forma ascendente
botonOrdenarPorPrecioAs.addEventListener(
  "click",
  ordenarProductosPorPrecioAscedente
);

// Iniciar la tabla con todos los productos al cargar la página
renderizarProductos(productosSupermercado);

export { descontarCantidadesCarrito };
