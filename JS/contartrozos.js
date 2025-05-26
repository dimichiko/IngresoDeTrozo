(function () {
    // Validación de sesión
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

    // Estado de la aplicación
    const state = {
        contadorTotal: 0,
        volumenTotal: 0,
        modoResta: false,
        datosModificados: false,
        bancoActual: parseInt(localStorage.getItem("bancoActual") || 1),
        cantidadBancos: parseInt(localStorage.getItem("cantidadBancos") || 1),
        largoTroncos: sessionStorage.getItem("LargoTroncos") || "-"
    };

    console.log("Cargando largo en contartrozos:", sessionStorage.getItem("LargoTroncos"));

    // Cache de elementos DOM frecuentemente usados
    const domElements = {};

    // Funciones de utilidad
    const utils = {
        calcularVolumen: function (diametro) {
            return (diametro * diametro * 3.2) / 10000;
        },

        showLoader: function () {
            const loader = document.getElementById('loading-overlay');
            if (loader) loader.style.display = 'flex';
        },

        hideLoader: function () {
            const loader = document.getElementById('loading-overlay');
            if (loader) loader.style.display = 'none';
        },

        debounce: function (func, wait) {
            let timeout;
            return function (...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };

    // Controlador de eventos
    const eventHandlers = {
        manejarClick: function (id, event) {
            event.preventDefault();
            const btn = document.getElementById(id);
            if (!btn) return;

            const diametro = parseInt(id.split('-')[1]);
            if (!diametro) return;

            let count = parseInt(btn.dataset.count || 0);

            if (state.modoResta) {
                if (count > 0) {
                    count--;
                    state.contadorTotal--;
                    state.volumenTotal -= utils.calcularVolumen(diametro);
                    uiController.desactivarModoResta();
                } else {
                    Swal.fire("Correción", "El contador ya está en 0.", "question");
                }
            } else {
                count++;
                state.contadorTotal++;
                state.volumenTotal += utils.calcularVolumen(diametro);
            }

            btn.dataset.count = count;
            btn.textContent = `Diámetro ${diametro}${count > 0 ? ` | Contador: ${count}` : ''}`;

            uiController.actualizarTotales();
            state.datosModificados = true;

            // Usar debounce para guardar datos
            debouncedGuardarDatos();
        },

        toggleModoResta: function (event) {
            event.preventDefault();
            state.modoResta = !state.modoResta;
            uiController.actualizarModoResta();
        },

        resetearContadores: function (event) {
            event.preventDefault();
            state.contadorTotal = 0;
            state.volumenTotal = 0;

            document.querySelectorAll("button[id^='btn-']").forEach(btn => {
                const d = btn.id.split('-')[1];
                btn.dataset.count = 0;
                btn.textContent = `Diámetro ${d}`;
            });

            uiController.actualizarTotales();
            state.datosModificados = true;
            dataController.guardarDatosContartrozos();
        },

        irAlResumen: function (event) {
            event.preventDefault();

            if (state.datosModificados) {
                dataController.guardarDatosContartrozos();
            }

            utils.showLoader();
            setTimeout(() => {
                if (state.bancoActual < state.cantidadBancos) {
                    localStorage.setItem("bancoActual", state.bancoActual + 1);
                    window.location.href = "contartrozos.aspx";
                } else {
                    window.location.href = "resumen.aspx";
                }
            }, 300);
        },

        volverBoton: function (e) {
            e.preventDefault();

            if (state.datosModificados) {
                dataController.guardarDatosContartrozos();
            }

            utils.showLoader();
            setTimeout(() => {
                if (state.bancoActual === 1) {
                    window.location.href = "ingreso.aspx";
                } else {
                    localStorage.setItem("bancoActual", state.bancoActual - 1);
                    window.location.href = "contartrozos.aspx";
                }
            }, 300);
        }
    };

    // Controlador de la interfaz de usuario
    const uiController = {
        inicializar: function () {
            // Cachear elementos DOM frecuentemente usados
            domElements.totalDisplays = document.querySelectorAll('[id^="total-display"]');
            domElements.volumenDisplays = document.querySelectorAll('[id^="volumen-display"]');
            domElements.restaButtons = document.querySelectorAll('[id^="Resta-"]');
            domElements.btnVolver = document.querySelectorAll('.btnVolver');
            domElements.btnSiguiente = document.querySelectorAll('.btnSiguiente');
            domElements.largoTroncos = document.querySelectorAll('[id^="largo-troncos"]');
            domElements.bancoInfo = document.getElementById("banco-info");

            // Actualizar información inicial
            this.actualizarTextoBotones();
            this.actualizarTotales();
            this.actualizarInfoBanco();

            // Configurar eventos
            this.configurarEventos();
        },

        configurarEventos: function () {
            // Configurar botones de resta
            domElements.restaButtons.forEach(btn => {
                btn.addEventListener('click', eventHandlers.toggleModoResta);
            });

            // Configurar botones de volver
            domElements.btnVolver.forEach(btn => {
                btn.addEventListener('click', eventHandlers.volverBoton);
            });

            // Configurar botones de siguiente/resumen
            domElements.btnSiguiente.forEach(btn => {
                btn.addEventListener('click', eventHandlers.irAlResumen);
            });

            // Configurar botones de resetear
            document.querySelectorAll('[id^="resetearContador"]').forEach(btn => {
                btn.addEventListener('click', eventHandlers.resetearContadores);
            });

            // Configurar botones de diámetro mediante delegación
            document.querySelectorAll('.grid-container-1, .grid-container-2').forEach(container => {
                container.addEventListener('click', function (event) {
                    const target = event.target;
                    if (target.tagName === 'BUTTON' && target.id.startsWith('btn-')) {
                        eventHandlers.manejarClick(target.id, event);
                    }
                });
            });
        },

        actualizarTextoBotones: function () {
            // Actualizar texto de botones Volver
            domElements.btnVolver.forEach(btn => {
                btn.textContent = state.bancoActual === 1
                    ? "← Volver a ingreso"
                    : "← Volver al banco anterior";
            });

            // Actualizar texto de botones Siguiente
            domElements.btnSiguiente.forEach(btn => {
                btn.textContent = state.bancoActual < state.cantidadBancos
                    ? "Siguiente banco"
                    : "Ir a resumen";
            });
        },

        actualizarInfoBanco: function () {
            // Actualizar información del banco
            if (domElements.bancoInfo) {
                domElements.bancoInfo.textContent = `Banco ${state.bancoActual} de ${state.cantidadBancos}`;
            }

            // Actualizar información de largo de troncos
            domElements.largoTroncos.forEach(el => {
                const largo = parseFloat(state.largoTroncos);
                const largoCm = Math.round(largo * 10);
                el.textContent = `Largo de troncos: ${largoCm}`;
            });
        },

        actualizarTotales: function () {
            // Actualizar totales en todos los displays
            domElements.totalDisplays.forEach(el => {
                el.textContent = `Total: ${state.contadorTotal}`;
            });

            domElements.volumenDisplays.forEach(el => {
                el.textContent = `Volumen Total: ${state.volumenTotal.toFixed(2)} m³`;
            });
        },

        actualizarModoResta: function () {
            // Actualizar apariencia de botones de resta
            domElements.restaButtons.forEach(btn => {
                btn.textContent = state.modoResta ? "Modo Resta Activado" : "Activar Modo Resta";
            });

            // Actualizar apariencia de botones de diámetro
            document.querySelectorAll("button[id^='btn-']").forEach(btn => {
                if (state.modoResta) {
                    btn.classList.add("borde-rojo");
                } else {
                    btn.classList.remove("borde-rojo");
                }
            });
        },

        desactivarModoResta: function () {
            state.modoResta = false;
            this.actualizarModoResta();
        }
    };

    // Controlador de datos
    const dataController = {
        guardarDatosContartrozos: function () {
            const contadores = {};

            document.querySelectorAll("button[id^='btn-']").forEach(btn => {
                const diametro = btn.id.replace("btn-", "");
                const cantidad = parseInt(btn.getAttribute("data-count")) || 0;

                if (cantidad > 0) {
                    contadores[diametro] = cantidad;
                }
            });

            const datosActuales = {
                banco: state.bancoActual,
                total: state.contadorTotal,
                volumen: state.volumenTotal,
                contadores
            };

            let datosBancos = JSON.parse(localStorage.getItem("datosBancos") || "[]");
            datosBancos = datosBancos.filter(b => b.banco !== state.bancoActual);
            datosBancos.push(datosActuales);
            datosBancos.sort((a, b) => a.banco - b.banco);

            localStorage.setItem("datosBancos", JSON.stringify(datosBancos));
            state.datosModificados = false;
        },

        cargarDatosBanco: function () {
            const datosBancos = JSON.parse(localStorage.getItem("datosBancos") || "[]");
            const datos = datosBancos.find(d => d.banco === state.bancoActual);

            if (datos) {
                state.contadorTotal = datos.total || 0;
                state.volumenTotal = datos.volumen || 0;

                Object.entries(datos.contadores || {}).forEach(([diametro, cantidad]) => {
                    const btn = document.getElementById(`btn-${diametro}`);
                    if (btn) {
                        btn.setAttribute("data-count", cantidad);
                        btn.textContent = `Diámetro ${diametro}${cantidad > 0 ? ` | Contador: ${cantidad}` : ''}`;
                    }
                });

                uiController.actualizarTotales();
            }
        }
    };

    // Crear funciones con debounce
    const debouncedGuardarDatos = utils.debounce(() => {
        dataController.guardarDatosContartrozos();
    }, 500);

    // Función para generar los botones de diámetro dinámicamente
    function generarBotonesDiametro() {
        const gridContainer1 = document.querySelector('.grid-container-1');
        const gridContainer2 = document.querySelector('.grid-container-2');

        if (gridContainer1) {
            for (let i = 16; i <= 38; i += 2) {
                const btn = document.createElement('button');
                btn.id = `btn-${i}`;
                btn.dataset.count = '0';
                btn.textContent = `Diámetro ${i}`;
                gridContainer1.appendChild(btn);
            }
        }

        if (gridContainer2) {
            for (let i = 40; i <= 60; i += 2) {
                const btn = document.createElement('button');
                btn.id = `btn-${i}`;
                btn.dataset.count = '0';
                btn.textContent = `Diámetro ${i}`;
                gridContainer2.appendChild(btn);
            }
        }
    }

    // Función para cargar la versión
    function cargarVersion() {
        fetch('xml/version.xml')
            .then(response => {
                if (!response.ok) throw new Error('No se pudo cargar version.xml');
                return response.text();
            })
            .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
            .then(data => {
                const numero = data.querySelector('number')?.textContent || 'desconocida';
                const fecha = data.querySelector('fecha')?.textContent || '';
                const footerVersion = document.getElementById('footer-version');
                if (footerVersion) {
                    footerVersion.textContent = `Versión: ${numero} - ${fecha}`;
                }
            })
            .catch(err => {
                const footerVersion = document.getElementById('footer-version');
                if (footerVersion) {
                    footerVersion.textContent = 'Versión: desconocida';
                }
                console.error(err);
            });
    }

    // Inicialización cuando el DOM está cargado
    document.addEventListener("DOMContentLoaded", function () {
        // Si la página usa server-side generation para los botones, comentar la siguiente línea
        // generarBotonesDiametro();

        // Inicializar UI
        uiController.inicializar();

        // Cargar datos del banco actual
        dataController.cargarDatosBanco();

        // Cargar información de versión
        cargarVersion();

        // Ocultar loader si está visible
        utils.hideLoader();
    });

    // Exponer funciones necesarias globalmente (para compatibilidad con onclick en HTML)
    window.manejarClick = eventHandlers.manejarClick;
    window.toggleModoResta = eventHandlers.toggleModoResta;
    window.resetearContadores = eventHandlers.resetearContadores;
    window.irAlResumen = eventHandlers.irAlResumen;
})();