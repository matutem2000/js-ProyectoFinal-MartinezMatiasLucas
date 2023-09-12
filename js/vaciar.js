// Función para vaciar el carrito en localStorage
function vaciarCarritoEnLocalStorage() {
    localStorage.removeItem('carrito');
    window.location.reload();

  }

  export {vaciarCarritoEnLocalStorage};