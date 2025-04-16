document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("btnLogin");

    const usuarios = {
        "admin": "1234",
        "dimitris": "clave123",
        "usuario1": "password1"
    };

    btn.addEventListener("click", function () {
        const usuario = document.getElementById("txtUsuario").value.trim();
        const clave = document.getElementById("txtClave").value.trim();

        if (usuario === "" || clave === "") {
            alert("Por favor ingresa usuario y contraseña.");
            return;
        }

        if (usuarios[usuario] && usuarios[usuario] === clave) {
            window.location.href = "inicio.aspx";
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    });
});