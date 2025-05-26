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

function handleError(error, message) {
    console.error(`Error: ${error.message || error}`);
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message || 'Ha ocurrido un error en la aplicación',
        confirmButtonColor: '#007BFF'
    });
}

function checkDependencies() {
    try {
        if (typeof Swal === 'undefined') {
            throw new Error('SweetAlert2 no está disponible');
        }

        const requiredFunctions = [
            'ObtenerProveedor',
            'Obtener_NC',
            'Obtener_NV',
            'ObtenerProducto',
            'Obtener_Parametros',
            'CargarLista'
        ];

        requiredFunctions.forEach(funcName => {
            if (typeof window[funcName] !== 'function') {
                console.warn(`Advertencia: Función ${funcName} no encontrada`);
            }
        });
    } catch (error) {
        handleError(error, 'Error al cargar dependencias necesarias');
    }
}

function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'block';
    }
}

const StorageManager = {
    save: function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            handleError(error, 'Error al guardar datos en almacenamiento local');
            return false;
        }
    },
    get: function (key) {
        try {
            const localData = localStorage.getItem(key);
            const sessionData = sessionStorage.getItem(key);
            return JSON.parse(localData || sessionData || null);
        } catch (error) {
            handleError(error, 'Error al recuperar datos del almacenamiento');
            return null;
        }
    },
    saveRaw: function (key, value) {
        try {
            localStorage.setItem(key, value);
            sessionStorage.setItem(key, value);
            return true;
        } catch (error) {
            handleError(error, 'Error al guardar datos en almacenamiento local');
            return false;
        }
    },
    getRaw: function (key) {
        return localStorage.getItem(key) || sessionStorage.getItem(key) || null;
    }
};

function validateField(field) {
    if (!field) return false;

    let isValid = true;

    // Validación por tipo de campo
    if (field.hasAttribute('required') && field.value.trim() === '') {
        field.classList.add('input-error');
        field.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        field.classList.remove('input-error');
        field.setAttribute('aria-invalid', 'false');
    }

    // Validaciones específicas por tipo de campo
    if (isValid && field.id.includes('RUT') && field.value.trim() !== '') {
        isValid = validarRutMod11(field.value);
        if (!isValid) {
            field.classList.add('input-error');
            field.setAttribute('aria-invalid', 'true');
            Swal.fire({
                icon: 'error',
                title: 'RUT inválido',
                text: 'Por favor ingresa un RUT válido.',
                confirmButtonText: 'Entendido',
                customClass: {
                    confirmButton: 'swal-confirm-button-mobile',
                    popup: 'swal-popup-mobile'
                }
            });
        }
    }

    return isValid;
}

// Funciones para manejo de RUT
function formatearRutLive(rut) {
    if (!rut || typeof rut !== 'string') return '';

    rut = rut.replace(/[^\dkK]/g, '').toUpperCase();

    if (rut.length <= 1) return rut;

    const dv = rut.slice(-1);
    const cuerpo = rut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return cuerpo + '-' + dv;
}

function validarRutMod11(rut) {
    if (!rut || typeof rut !== 'string') return false;

    rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    if (!/^(\d{7,8})([0-9K])$/.test(rut)) return false;

    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);
    if (parseInt(cuerpo, 10) < 1000000) return false;
    if (esRutObviamenteFalso(rut)) return false;

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplo;
        multiplo = multiplo >= 7 ? 2 : multiplo + 1;
    }

    const resto = suma % 11;
    const dvCalculado = resto === 0 ? '0' : resto === 1 ? 'K' : (11 - resto).toString();

    return dv === dvCalculado;
}

function esRutObviamenteFalso(rut) {
    const cuerpo = rut.replace(/\D/g, '').slice(0, -1);

    const falsos = [
        '00000000', '11111111', '22222222',
        '33333333', '44444444', '55555555',
        '66666666', '77777777', '88888888',
        '99999999', '12345678', '87654321'
    ];

    return falsos.includes(cuerpo);
}

// Inicialización de campos de RUT
function initializeRutFields() {
    ["txtRUTConductor", "txtRUTDespachador"].forEach(id => {
        const elemento = document.getElementById(id);

        if (!elemento) return;

        elemento.setAttribute('inputmode', 'numeric');
        elemento.setAttribute('aria-describedby', `error${id}`);

        // Crear elemento de error si no existe
        if (!document.getElementById(`error${id}`)) {
            const errorEl = document.createElement('div');
            errorEl.id = `error${id}`;
            errorEl.className = 'error-message';
            errorEl.style.display = 'none';
            errorEl.style.color = 'red';
            errorEl.style.fontSize = '0.8rem';
            errorEl.style.marginTop = '0.25rem';

            if (elemento.parentNode) {
                elemento.parentNode.insertBefore(errorEl, elemento.nextSibling);
            }
        }

        elemento.addEventListener("input", function () {
            const inicio = this.selectionStart;
            const fin = this.selectionEnd;
            const longitudPrevia = this.value.length;

            let val = this.value.replace(/\./g, '').replace(/-/g, '');

            if (val.length > 9) val = val.slice(0, 9);

            this.value = formatearRutLive(val);

            const diferencia = this.value.length - longitudPrevia;

            // Restaurar posición del cursor
            if (inicio !== null && fin !== null) {
                this.setSelectionRange(inicio + diferencia, fin + diferencia);
            }

            // Limpiar estado de error al comenzar a editar
            this.classList.remove("input-error");
            const errorElement = document.getElementById(`error${this.id}`);
            if (errorElement) {
                errorElement.style.display = "none";
            }
            this.setAttribute('aria-invalid', 'false');
        });

        elemento.addEventListener("blur", function () {
            const errorElement = document.getElementById(`error${this.id}`);

            if (this.value && !validarRutMod11(this.value)) {
                this.classList.add("input-error");
                this.setAttribute('aria-invalid', 'true');
                Swal.fire({
                    icon: 'error',
                    title: 'RUT inválido',
                    text: 'Por favor ingresa un RUT válido.',
                    confirmButtonText: 'Entendido',
                    customClass: {
                        confirmButton: 'swal-confirm-button-mobile',
                        popup: 'swal-popup-mobile'
                    }
                });
            } else {
                this.classList.remove("input-error");
                if (errorElement) {
                    errorElement.style.display = "none";
                }
                this.setAttribute('aria-invalid', 'false');
            }
        });
    });
}

function initializeRolField() {
    const rolElement = document.getElementById("txtRol");
    if (rolElement) {
        rolElement.addEventListener("input", function () {
            const selectionStart = this.selectionStart;
            const selectionEnd = this.selectionEnd;
            const prevLength = this.value.length;

            let val = this.value.replace(/[^0-9]/g, "").slice(0, 6);
            if (val.length > 3) {
                this.value = val.slice(0, 3) + "-" + val.slice(3);
            } else {
                this.value = val;
            }

            const cursorPos = selectionStart + (this.value.length - prevLength);
            this.setSelectionRange(cursorPos, cursorPos);
        });

        rolElement.addEventListener("blur", function () {
            if (this.value && this.value.length >= 5) {
                // Si existe la función, llamarla
                if (typeof simulateRolLookup === 'function') {
                    simulateRolLookup(this.value);
                }
            }
        });
    }
}

function initializeAutoPopulation(prefixFieldId, autoFieldId, prefix) {
    const prefixField = document.getElementById(prefixFieldId);
    const autoField = typeof autoFieldId === 'string' ? document.getElementById(autoFieldId) : autoFieldId;

    if (!prefixField || !autoField) return;

    prefixField.addEventListener("input", function () {
        const value = this.value.replace(/[^0-9]/g, '').slice(0, 4);
        this.value = value;

        if (value) {
            const currentYear = new Date().getFullYear().toString().slice(2);
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            autoField.value = `${prefix}-${value}-${currentYear}-${randomNum}`;
        } else {
            autoField.value = '';
        }
    });

    if (prefixField.value) {
        const event = new Event('input');
        prefixField.dispatchEvent(event);
    }
}

function loadSavedValues() {
    const campos = [
        "txtCodProvAuto",
        "txtContratoAuto",
        "txtVentaAuto",
        "txtOC", "txtFechaRecepcion",
        "nomProducto", "txtFSC", "txtDestino", "txtRol",
        "txtDespachador", "txtTransportista", "txtRUTDespachador",
        "txtConductor", "txtRUTConductor", "LargoTroncos", "selectBancos"
    ];

    campos.forEach(id => {
        const valor = StorageManager.getRaw(id);
        const input = document.getElementById(id);
        if (valor && input) {
            input.value = valor;

            if (["txtCodProvAuto", "txtContratoAuto", "txtVentaAuto", "nomProducto"].includes(id)) {
                const event = new Event('input');
                input.dispatchEvent(event);
            }

            if (id === "txtRol" && valor.length >= 5) {
                const event = new Event('blur');
                input.dispatchEvent(event);
            }

            if (id === "LargoTroncos" && input.tagName === "SELECT") {
                for (let opt of input.options) {
                    const num = parseFloat(opt.textContent);
                    if (Math.round(num * 100) === parseInt(valor)) {
                        opt.selected = true;
                        break;
                    }
                }
            }
        }
    });

    // Recargar valores cuando se vuelve a la página
    window.addEventListener('pageshow', function (event) {
        if (event.persisted) {
            campos.forEach(id => {
                const valor = StorageManager.getRaw(id);
                const input = document.getElementById(id);
                if (valor && input) {
                    input.value = valor;

                    if (["txtCodProvAuto", "txtContratoAuto", "txtVentaAuto", "nomProducto"].includes(id)) {
                        const event = new Event('input');
                        input.dispatchEvent(event);
                    }
                }
            });
        }
    });

    ["txtCodProvPrefijo", "txtContratoPrefijo", "txtVentaPrefijo", "txtProducto"].forEach(id => {
        const valor = sessionStorage.getItem(id);
        const input = document.getElementById(id);
        if (valor && input) {
            input.value = valor;
            input.dispatchEvent(new Event("blur"));
        }
    });
}

function configureSubmitButton() {
    const btn = document.getElementById("btnIrContar");
    if (btn) {
        // Mejorar retroalimentación táctil
        btn.addEventListener('touchstart', function () {
            this.classList.add('button-active');
        });

        btn.addEventListener('touchend', function () {
            this.classList.remove('button-active');
        });

        btn.addEventListener("click", function () {
            const campos = [
                "txtCodProvPrefijo",
                "txtContratoPrefijo",
                "txtVentaPrefijo",
                "txtOC", "txtFechaRecepcion",
                "txtProducto", "txtFSC", "txtDestino", "txtRol",
                "txtDespachador", "txtTransportista", "txtRUTDespachador",
                "txtConductor", "txtRUTConductor", "LargoTroncos", "selectBancos"
            ];

            let incompletos = [];
            let isFormValid = true;

            // Validar todos los campos requeridos
            campos.forEach(id => {
                const input = document.getElementById(id);
                if (!input || input.value.trim() === "") {
                    incompletos.push(id);
                    if (input) input.classList.add('input-error');
                    isFormValid = false;
                }
            });

            // Validar campos de RUT específicamente
            const rutConductorInput = document.getElementById("txtRUTConductor");
            const rutDespachadorInput = document.getElementById("txtRUTDespachador");

            if (rutConductorInput && rutConductorInput.value.trim() !== "" && !validarRutMod11(rutConductorInput.value.trim())) {
                rutConductorInput.classList.add('input-error');
                const errorElement = document.getElementById('errorRUTConductor') || document.getElementById('errortxtRUTConductor');
                if (errorElement) {
                    errorElement.textContent = "RUT inválido";
                    errorElement.style.display = "block";
                }
                Swal.fire({
                    icon: 'error',
                    title: 'RUT del Conductor inválido',
                    text: 'Por favor, verifica el RUT del conductor.',
                    confirmButtonText: 'Entendido',
                    customClass: {
                        confirmButton: 'swal-confirm-button-mobile',
                        popup: 'swal-popup-mobile'
                    }
                });
                isFormValid = false;
                return;
            }

            if (rutDespachadorInput && rutDespachadorInput.value.trim() !== "" && !validarRutMod11(rutDespachadorInput.value.trim())) {
                rutDespachadorInput.classList.add('input-error');
                const errorElement = document.getElementById('errorRUTDespachador') || document.getElementById('errortxtRUTDespachador');
                if (errorElement) {
                    errorElement.textContent = "RUT inválido";
                    errorElement.style.display = "block";
                }
                Swal.fire({
                    icon: 'error',
                    title: 'RUT del Despachador inválido',
                    text: 'Por favor, verifica el RUT del despachador.',
                    confirmButtonText: 'Entendido',
                    customClass: {
                        confirmButton: 'swal-confirm-button-mobile',
                        popup: 'swal-popup-mobile'
                    }
                });
                isFormValid = false;
                return;
            }

            // Mostrar mensaje de campos incompletos
            if (incompletos.length > 0) {
                const nombresAmigables = {
                    txtCodProvPrefijo: "Código Proveedor",
                    txtContratoPrefijo: "Nota Compra",
                    txtVentaPrefijo: "Nota Venta",
                    txtOC: "GDE",
                    txtFechaRecepcion: "Fecha de Recepción",
                    txtProducto: "Producto",
                    txtFSC: "FSC",
                    txtDestino: "Destino",
                    txtRol: "Rol",
                    txtDespachador: "Despachador",
                    txtTransportista: "Transportista",
                    txtRUTDespachador: "RUT Despachador",
                    txtConductor: "Conductor",
                    txtRUTConductor: "RUT Conductor",
                    LargoTroncos: "Largo de Troncos",
                    selectBancos: "Cantidad de Bancos"
                };

                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    html: `
                        <div style="text-align: left; font-size: 16px; padding: 0 10px;">
                            <p>Por favor completa los siguientes campos:</p>
                            <ul style="padding-left: 15px; line-height: 1.8; margin-bottom: 10px;">
                                ${incompletos.map(id =>
                        `<li style="margin-bottom: 8px;"><b>${nombresAmigables[id] || id}</b></li>`
                    ).join('')}
                            </ul>
                        </div>
                    `,
                    confirmButtonText: 'Entendido',
                    customClass: {
                        confirmButton: 'swal-confirm-button-mobile',
                        popup: 'swal-popup-mobile'
                    }
                });
                return;
            }

            // Validar selección de bancos
            const cantidadSelect = document.getElementById("selectBancos");
            const cantidad = cantidadSelect ? cantidadSelect.value : null;

            if (!cantidad) {
                Swal.fire({
                    title: "Error",
                    text: "Debes seleccionar la cantidad de bancos",
                    icon: "warning",
                    confirmButtonText: 'Entendido',
                    customClass: {
                        confirmButton: 'swal-confirm-button-mobile'
                    }
                });
                return;
            }

            // Si todo es válido, guardar los datos y continuar
            if (isFormValid) {
                // Guardar todos los campos en sessionStorage
                campos.forEach(id => {
                    const el = document.getElementById(id);
                    if (el && el.value.trim() !== "") {
                        if (el.tagName === "SELECT") {
                            sessionStorage.setItem(id, el.value.trim());
                        } else {
                            sessionStorage.setItem(id, el.value.trim());
                        }
                    }
                });

                // Guardar información de bancos
                localStorage.setItem("cantidadBancos", cantidad);
                if (!localStorage.getItem("bancoActual")) {
                    localStorage.setItem("bancoActual", 1);
                }
                if (!localStorage.getItem("datosBancos")) {
                    localStorage.setItem("datosBancos", JSON.stringify([]));
                }



                // Navegar a la siguiente página
                showLoader();
                // Sobrescribir valores para mostrar los nombres en el resumen
                const fscSelect = document.getElementById("txtFSC");
                const destinoSelect = document.getElementById("txtDestino");
                const provAuto = document.getElementById("txtCodProvAuto");
                const nomProducto = document.getElementById("nomProducto");
                const largoRaw = document.getElementById("LargoTroncos")?.value || "";
                console.log("Guardando largo:", largoRaw); // <-- AGREGA ESTO
                sessionStorage.setItem("LargoTroncos", largoRaw.trim());

                if (fscSelect) {
                    sessionStorage.setItem("txtFSC", fscSelect.options[fscSelect.selectedIndex].text);
                }
                if (destinoSelect) {
                    sessionStorage.setItem("txtDestino", destinoSelect.options[destinoSelect.selectedIndex].text);
                }
                if (provAuto) {
                    sessionStorage.setItem("txtCodProvAuto", provAuto.value.trim());
                }
                if (nomProducto) {
                    sessionStorage.setItem("nomProducto", nomProducto.value.trim());
                }
                setTimeout(() => {

                    window.location.href = "contartrozos.aspx";
                }, 300);
            }
        });
    }
}

async function obtenerDatosAPI(endpoint, id) {
    try {
        if (!endpoint || typeof endpoint !== 'function') {
            throw new Error('Endpoint no válido');
        }

        const resultado = await endpoint(id);
        if (!resultado || !resultado.length) {
            throw new Error('No se encontraron datos');
        }
        return resultado[0];
    } catch (error) {
        handleError(error, `Error al obtener datos: ${error.message}`);
        return null;
    }
}

// Función para configurar selects con una sola opción
function agregarSoloGYG(idSelect) {
    const opcionGYG = {
        cod_empresa: "2",          // <- Este es el número que se enviará
        nom_empresa: "GYG"         // <- Este es lo que se muestra al usuario
    };

    const select = document.getElementById(idSelect);
    if (select) {
        select.innerHTML = "";

        const option = document.createElement("option");
        option.value = opcionGYG.cod_empresa;     // <-- VALOR REAL
        option.text = opcionGYG.nom_empresa;      // <-- TEXTO VISIBLE
        select.appendChild(option);

        select.value = opcionGYG.cod_empresa;     // <-- Establece seleccionado
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Verificar dependencias al inicio
    checkDependencies();

    // Inicialización de jQuery UI Accordion
    if (typeof $ !== 'undefined' && $("#acordeon").length > 0) {
        $("#acordeon").accordion({
            heightStyle: "content",
            collapsible: true,
            active: false,
            animate: 200
        });
    }

    // Configurar inputs numéricos para mejor experiencia móvil
    const numericInputs = document.querySelectorAll('input[type="number"]');
    numericInputs.forEach(input => {
        input.setAttribute('inputmode', 'numeric');
        input.addEventListener('focus', function () {
            this.setAttribute('inputmode', 'numeric');
        });
    });

    // Configurar validaciones para campos numéricos
    const soloNumericos = [
        "txtCodProvPrefijo",
        "txtContratoPrefijo",
        "txtVentaPrefijo",
        "txtOC",
        "txtProducto"
    ];

    soloNumericos.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("input", function () {
                this.value = this.value.replace(/[^0-9]/g, "").slice(0, 4);

                // Eliminamos estado de error cuando el usuario comienza a editar
                this.classList.remove('input-error');
                const errorId = 'error' + this.id;
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            });
        }
    });

    // Configurar validaciones para campos de texto
    const soloTexto = [
        "txtDespachador",
        "txtTransportista",
        "txtConductor"
    ];

    soloTexto.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("input", function () {
                this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");

                // Eliminamos estado de error cuando el usuario comienza a editar
                this.classList.remove('input-error');
                const errorId = 'error' + this.id;
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            });
        }
    });

    // Establecer fecha actual en el campo correspondiente
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const anio = hoy.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;

    const campoFecha = document.getElementById("txtFechaRecepcion");
    if (campoFecha) campoFecha.value = fechaFormateada;

    // Configurar todos los inputs con mejores validaciones
    const allInputs = document.querySelectorAll('input, select');
    allInputs.forEach(input => {
        // Validar al perder foco
        input.addEventListener('blur', function () {
            validateField(this);
        });

        // Mejorar retroalimentación táctil
        input.addEventListener('touchstart', function () {
            this.classList.add('touch-active');
        });

        input.addEventListener('touchend', function () {
            this.classList.remove('touch-active');
        });

        // Quitar error cuando el usuario comienza a editar
        input.addEventListener('input', function () {
            this.classList.remove('input-error');
            const errorId = 'error' + this.id;
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
    });

    // Inicializar campos especiales
    initializeRolField();
    initializeRutFields();

    // Cargar valores guardados previamente
    loadSavedValues();

    // Configurar botón de envío
    configureSubmitButton();

    // Configurar destino con GYG
    agregarSoloGYG("txtDestino");

    // Cargar listas desde parámetros - con verificación previa
    if (typeof Obtener_Parametros === 'function' && typeof CargarLista === 'function') {
        try {
            // Cargar FSC
            var resultFSC = Obtener_Parametros("FSC");
            if (resultFSC) {
                CargarLista(resultFSC, "txtFSC");
            }

            // Cargar empresa GYG en destino
            var resultEmpresas = Obtener_Parametros("Empresa");
            if (resultEmpresas) {
                var soloGYG = resultEmpresas.filter(item => item.cod_empresa === "2");
                const select = document.getElementById("txtDestino");
                if (select && soloGYG.length > 0) {
                    select.innerHTML = "";
                    const gyg = soloGYG[0];
                    const option = document.createElement("option");
                    option.value = gyg.cod_empresa;
                    option.text = gyg.nom_empresa;
                    option.selected = true;
                    select.appendChild(option);
                }
            }

            // Cargar LargoTrozos
            var resultLargos = Obtener_Parametros("LargoTrozos");
            if (resultLargos) {
                CargarLista(resultLargos, "LargoTroncos");
            }
        } catch (error) {
            handleError(error, "Error al cargar parámetros del sistema");
        }
    }
});

// Manejadores de eventos para autocompletado de campos desde servicios
$("#txtCodProvPrefijo").blur(function () {
    try {
        const idProv = $("#txtCodProvPrefijo").val().trim();

        if (idProv && typeof ObtenerProveedor === 'function') {
            const resultado = ObtenerProveedor(idProv);
            if (resultado && resultado.length > 0) {
                const prov = resultado[0];
                $("#txtCodProvAuto").val(prov.mcl_nombre || "-"); // mostrar nombre
                sessionStorage.setItem("txtCodProvAuto", idProv); // ← GUARDA con nombre correcto
            } else {
                $("#txtCodProvAuto").val("");
                $("#txtCodProvPrefijo").addClass("input-error");
            }
        }
    } catch (error) {
        handleError(error, "Error al obtener datos del proveedor");
    }
});

$("#txtContratoPrefijo").blur(function () {
    try {
        const idContr = $("#txtContratoPrefijo").val().trim();

        if (idContr && typeof Obtener_NC === 'function') {
            const resultado = Obtener_NC(idContr);
            if (resultado && resultado.length > 0) {
                const Contr = resultado[0];
                $("#txtContratoAuto").val(Contr.mcl_codigo);
            } else {
                $("#txtContratoAuto").val("");
                $("#txtContratoPrefijo").addClass("input-error");
            }
        }
    } catch (error) {
        handleError(error, "Error al obtener datos del contrato");
    }
});

$("#txtVentaPrefijo").blur(function () {
    try {
        const idVenta = $("#txtVentaPrefijo").val().trim();

        if (idVenta && typeof Obtener_NV === 'function') {
            const resultado = Obtener_NV(idVenta);
            if (resultado && resultado.length > 0) {
                const Venta = resultado[0];
                $("#txtVentaAuto").val(Venta.mcl_codigo);
            } else {
                $("#txtVentaAuto").val("");
                $("#txtVentaPrefijo").addClass("input-error");
            }
        }
    } catch (error) {
        handleError(error, "Error al obtener datos de la venta");
    }
});

$("#txtProducto").blur(function () {
    try {
        const idProd = $("#txtProducto").val().trim();

        if (idProd && typeof ObtenerProducto === 'function') {
            const resultado = ObtenerProducto(idProd);
            if (resultado && resultado.length > 0) {
                const Prod = resultado[0];
                $("#nomProducto").val(Prod.tpt_nombre);
                $("#txtProducto").val(Prod.tpt_codigo);
            } else {
                $("#nomProducto").val("");
                $("#txtProducto").addClass("input-error");
            }
        }
    } catch (error) {
        handleError(error, "Error al obtener datos del producto");
    }
});

