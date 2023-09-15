

// Escuchar el evento click del botón
document.getElementById("crearUsuario").addEventListener("click", function() {
  const usuarioNuevo = document.getElementById("usuarioNuevo").value;
  const passwordNuevo = document.getElementById("passwordNuevo").value;
 
  // Crear un nuevo objeto
  const datos = {
    usuario: usuarioNuevo,
    contraseña: passwordNuevo
  };

    // Guardar el array en localStorage
  sessionStorage.setItem("datos", JSON.stringify(datos));
  window.location.href = "./pages/login.html";
});
 







