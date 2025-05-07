document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const btnLogin = document.getElementById("btnLogin");
    const usernameInput = document.getElementById("txtUsuario");
    const passwordInput = document.getElementById("txtClave");
    const notificationElement = document.getElementById("notification");

    // Función para validar los campos
    function validateForm() {
        let isValid = true;

        // Validar usuario
        if (usernameInput.value.trim() === "") {
            setError(usernameInput, "Por favor ingresa tu nombre de usuario");
            isValid = false;
        } else {
            clearError(usernameInput);
        }

        // Validar contraseña
        if (passwordInput.value.trim() === "") {
            setError(passwordInput, "Por favor ingresa tu contraseña");
            isValid = false;
        } else {
            clearError(passwordInput);
        }

        return isValid;
    }

    // Función para mostrar error
    function setError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        const errorElement = formGroup.querySelector('.error-message');
        errorElement.textContent = message;
    }

    // Función para limpiar error
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
    }

    // Función para mostrar notificación
    function showNotification(message, type) {
        notificationElement.textContent = message;
        notificationElement.className = `notification ${type}`;
        notificationElement.style.display = 'block';

        // Ocultar la notificación después de 5 segundos
        setTimeout(() => {
            notificationElement.style.display = 'none';
        }, 5000);
    }

    // Función para simular la autenticación (En producción, esto debe ser reemplazado con una llamada al servidor)
    async function authenticateUser(username, password) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Esta lógica debe ser movida al servidor
                const usuarios = {
                    "admin": "1234",
                    "dimitris": "clave123",
                    "usuario1": "password1"
                };

                const isAuthenticated = usuarios[username] && usuarios[username] === password;
                resolve(isAuthenticated);
            }, 1000);
        });
    }

    // Manejo del evento de envío del formulario
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevenir el envío normal del formulario

        if (!validateForm()) {
            return;
        }

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Mostrar estado de carga
        btnLogin.classList.add("loading");
        btnLogin.disabled = true;

        try {
            const isAuthenticated = await authenticateUser(username, password);

            if (isAuthenticated) {
                showNotification("¡Inicio de sesión exitoso! Redirigiendo...", "success");

                // Redirigir después de un breve retraso
                setTimeout(() => {
                    window.location.href = "inicio.aspx";
                }, 1000);
            } else {
                showNotification("Usuario o contraseña incorrectos", "error");
            }
        } catch (error) {
            showNotification("Error al iniciar sesión. Por favor intenta de nuevo más tarde.", "error");
            console.error("Error de autenticación:", error);
        } finally {
            // Quitar estado de carga
            btnLogin.classList.remove("loading");
            btnLogin.disabled = false;
        }
    });

    // Mejora de accesibilidad: permitir envío con Enter en los campos
    passwordInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            btnLogin.click();
        }
    });

    // Enfoque automático en el campo de usuario cuando la página carga
    usernameInput.focus();
});