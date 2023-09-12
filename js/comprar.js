// import {productosSupermercado} from './productos.js'
import { descontarCantidadesCarrito } from "./cliente.js";
import { vaciarCarritoEnLocalStorage } from "./vaciar.js";

// Botón para comprar

function realizarCompra() {
  // Descuenta las cantidades de cada elemento del array de objetos productosSupermercado

  descontarCantidadesCarrito();

  // Vacía el carrito en localstorage
  //vaciarCarritoEnLocalStorage();
}

export { realizarCompra };
