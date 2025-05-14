(function validarSesion() {
    const id = sessionStorage.getItem("id_usuario");
    const token = sessionStorage.getItem("token");
    const expiraEn = sessionStorage.getItem("expira_en");

    const ahora = Date.now();
    const expiraMs = parseInt(expiraEn, 10);

    if (!id || !token || !expiraEn || token.length < 10 || ahora > expiraMs) {
        sessionStorage.clear();
        Swal.fire({
            icon: 'error',
            title: 'Sesión expirada o inválida',
            text: 'Por favor, inicia sesión nuevamente.',
            confirmButtonText: 'Volver al login'
        }).then(() => {
            window.location.href = "login.aspx";
        });
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header-inicio');
    const buttons = document.querySelectorAll('.btn-nav');

    if (header) {
        header.classList.add('animate-fade-in');
    }

    if (buttons.length) {
        buttons.forEach((button, index) => {
            setTimeout(() => {
                button.classList.add('animate-fade-in');
            }, 200 + (index * 100));
        });
    }

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

    window.navigateTo = function (url) {
        showLoading();
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    };

    window.limpiarCacheYRedirigir = function (pagina) {
        showLoading();

        // Respaldar sesión de login
        const id = sessionStorage.getItem("id_usuario");
        const token = sessionStorage.getItem("token");
        const expira = sessionStorage.getItem("expira_en");
        const nombre = sessionStorage.getItem("nombre_usuario");

        // Limpiar todo excepto los datos de login
        sessionStorage.clear();
        localStorage.removeItem('lastPage');

        if (id) sessionStorage.setItem("id_usuario", id);
        if (token) sessionStorage.setItem("token", token);
        if (expira) sessionStorage.setItem("expira_en", expira);
        if (nombre) sessionStorage.setItem("nombre_usuario", nombre);

        setTimeout(() => {
            window.location.href = pagina;
        }, 300);
    };

    localStorage.setItem('lastPage', 'inicio.aspx');

    if (!sessionStorage.getItem('welcomed')) {
        const username = sessionStorage.getItem('username') || 'Usuario';
        showWelcomeMessage(username);
        sessionStorage.setItem('welcomed', 'true');
    }

    setupEventListeners();
});

function showWelcomeMessage(username) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = '#005a8d';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '4px';
    toast.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    toast.style.zIndex = '1000';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';

    toast.innerHTML = `<div>Bienvenido, ${username}!</div>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }, 500);
}

function setupEventListeners() {
    const navButtons = document.querySelectorAll('.btn-nav');
    navButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const url = this.dataset.url || this.getAttribute('onclick').match(/['"]([^'"]*)['"]/)[1];

            if (this.classList.contains('clear-cache')) {
                window.limpiarCacheYRedirigir(url);
            } else {
                window.navigateTo(url);
            }
        });
    });

    const exitButton = document.querySelector('.boton-salida button');
    if (exitButton) {
        exitButton.addEventListener('click', function (e) {
            e.preventDefault();
            sessionStorage.clear();
            localStorage.clear();
            showLoading();
            setTimeout(() => {
                window.location.href = "login.aspx";
            }, 300);
        });
    }
}