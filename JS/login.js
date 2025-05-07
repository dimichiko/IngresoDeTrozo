document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const btnLogin = document.getElementById("btnLogin");
    const usernameInput = document.getElementById("txtUsuario");
    const passwordInput = document.getElementById("txtClave");
    const notificationElement = document.getElementById("notification");

    // === Loader global ===
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingOverlay);

    window.showLoading = function () {
        loadingOverlay.classList.add('active');
    };

    window.hideLoading = function () {
        loadingOverlay.classList.remove('active');
    };

    // === Validaciones ===
    function validateForm() {
        let isValid = true;
        if (usernameInput.value.trim() === "") {
            setError(usernameInput, "Por favor ingresa tu nombre de usuario");
            isValid = false;
        } else {
            clearError(usernameInput);
        }
        if (passwordInput.value.trim() === "") {
            setError(passwordInput, "Por favor ingresa tu contraseña");
            isValid = false;
        } else {
            clearError(passwordInput);
        }
        return isValid;
    }

    function setError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        const errorElement = formGroup.querySelector('.error-message');
        errorElement.textContent = message;
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
    }

    function showNotification(message, type) {
        notificationElement.textContent = message;
        notificationElement.className = `notification ${type}`;
        notificationElement.style.display = 'block';
        setTimeout(() => {
            notificationElement.style.display = 'none';
        }, 5000);
    }

    // Simulación de autenticación
    async function authenticateUser(username, password) {
        return new Promise((resolve) => {
            setTimeout(() => {
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

    // === Envío del formulario ===
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        if (!validateForm()) return;

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        btnLogin.classList.add("loading");
        btnLogin.disabled = true;

        try {
            const isAuthenticated = await authenticateUser(username, password);

            if (isAuthenticated) {
                showNotification("¡Inicio de sesión exitoso! Redirigiendo...", "success");

                // Mostrar loader
                showLoading();

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
            btnLogin.classList.remove("loading");
            btnLogin.disabled = false;
          }

        //const username = usenameInput.valuer.trim();
        //const password = passwordInput.value.trim();


        //var result = ValidarUsuario(usename, password);

        //var r = result

    });

    // Accesibilidad
    passwordInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") btnLogin.click();
    });

    usernameInput.focus();
});

