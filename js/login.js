document.addEventListener("DOMContentLoaded", function () {
 
  const loginForm = document.getElementById("loginForm");
  // Obtengo el valor del desplegable
  const selectElement = document.querySelector('.form-select[name="perfil"]');
  selectElement.addEventListener("change", function () {
    const selectedValue = selectElement.value;
    sessionStorage.setItem("selectedPerfil", selectedValue);
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

     const usuario = document.getElementById("usuario").value;
    const pswd = document.getElementById("password").value;
 
    // Valida usuario y contraseña
    const todo = sessionStorage.getItem("datos");
    const TODO = JSON.parse(todo);
    const usuarioL = TODO.usuario;
    const pswdL = TODO.contraseña;
    const storedPerfil = sessionStorage.getItem("selectedPerfil");

          if (usuario == usuarioL && pswd == pswdL) {
            if (storedPerfil) {
            switch (storedPerfil) {
                case "1":
                window.location.href = "../pages/IndexAdministrador.html";
                break;
                case "2":
                Swal.fire({
                    icon: "success",
                    title: "Bienvenido",
                    text: "Repositor",
                    timer: 2000, // Duración en milisegundos (2 segundos)
                    showConfirmButton: false, // Oculta el botón de confirmación
                }).then((result) => {
                    // Este código se ejecutará después de que se cierre la alerta (opcional)
                    if (result.dismiss === Swal.DismissReason.timer) {
                    window.location.href = "../pages/IndexRepositor.html";
                    }
                });
                break;
                case "3":
                Swal.fire({
                    icon: "success",
                    title: "Bienvenido",
                    text: "Cliente",
                    timer: 2000, // Duración en milisegundos (2 segundos)
                    showConfirmButton: false, // Oculta el botón de confirmación
                }).then((result) => {
                    // Este código se ejecutará después de que se cierre la alerta (opcional)
                    if (result.dismiss === Swal.DismissReason.timer) {
                    window.location.href = "../pages/IndexCliente.html";
                    }
                });
                break;
                default:
                // No lo necesito porque traigo el dato controlado del formulario con un menú desplegable
            }
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Incorrecta",
                text: "Usuario o clave incorrectas",
                timer: 2000, // Duración en milisegundos (2 segundos)
                showConfirmButton: false, // Oculta el botón de confirmación
            }).then((result) => {
                // Este código se ejecutará después de que se cierre la alerta (opcional)
                if (result.dismiss === Swal.DismissReason.timer) {
                window.location.reload();
                }
            });
        }
  });
}); 


