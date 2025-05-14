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

function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    $("#acordeon").accordion({
        heightStyle: "content",
        collapsible: true,
        active: false,
        animate: 200
    });

    const numericInputs = document.querySelectorAll('input[type="number"]');
    numericInputs.forEach(input => {
        input.setAttribute('inputmode', 'numeric');
        input.addEventListener('focus', function () {
            this.setAttribute('inputmode', 'numeric');
        });
    });

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
            });
        }
    });

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
            });
        }
    });

    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const anio = hoy.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;

    const campoFecha = document.getElementById("txtFechaRecepcion");
    if (campoFecha) campoFecha.value = fechaFormateada;                       

    const allInputs = document.querySelectorAll('input, select');
    allInputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', function () {
            validateField(this);
        });

        // Improve touch interaction feedback
        input.addEventListener('touchstart', function () {
            this.classList.add('touch-active');
        });

        input.addEventListener('touchend', function () {
            this.classList.remove('touch-active');
        });

        // Remove error state when user starts typing
        input.addEventListener('input', function () {
            this.classList.remove('input-error');
            const errorId = 'error' + this.id;
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
    });

    initializeRolField();
    initializeRutFields();

    loadSavedValues();

    configureSubmitButton();

    function agregarSoloGYG(idSelect) {
        const opcionGYG = {
            cod_empresa: "2",
            nom_empresa: "GYG"
        };

        const select = document.getElementById(idSelect);
        if (select) {
            select.innerHTML = "";

            const option = document.createElement("option");
            option.value = opcionGYG.cod_empresa;
            option.text = opcionGYG.nom_empresa;
            select.appendChild(option);

            select.value = opcionGYG.cod_empresa;
        }
    }
    agregarSoloGYG("txtDestino");

    var result = Obtener_Parametros("FSC");
    CargarLista(result, "txtFSC");

    var result = Obtener_Parametros("Empresa");
    var soloGYG = result.filter(item => item.cod_empresa === "2");
    const select = document.getElementById("txtDestino");
    if (select) {
        select.innerHTML = "";

        if (soloGYG.length > 0) {
            const gyg = soloGYG[0];
            const option = document.createElement("option");
            option.value = gyg.cod_empresa;
            option.text = gyg.nom_empresa;
            option.selected = true;
            select.appendChild(option);
        }
    }

    var result = Obtener_Parametros("LargoTrozos");
    CargarLista(result, "LargoTroncos");

});

function handleError(error, message) {
    console.error(error);
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#007BFF'
    });
}

function checkDependencies() {
    if (typeof Swal === 'undefined') {
        throw new Error('SweetAlert2 no está disponible');
    }
}

const StorageManager = {
    save: function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            handleError(error, 'Error al guardar datos');
        }
    },
    get: function (key) {
        try {
            return JSON.parse(localStorage.getItem(key) || sessionStorage.getItem(key));
        } catch (error) {
            handleError(error, 'Error al recuperar datos');
            return null;
        }
    }
};

function validateField(field) {
    if (field.hasAttribute('required') && field.value.trim() === '') {
        field.classList.add('input-error');
        return false;
    } else {
        field.classList.remove('input-error');
        return true;
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

function initializeRutFields() {
    ["txtRUTConductor", "txtRUTDespachador"].forEach(id => {
        const elemento = document.getElementById(id);

        if (!elemento) return;

        elemento.setAttribute('inputmode', 'numeric');
        elemento.setAttribute('aria-describedby', `error${id}`);

        elemento.addEventListener("input", function () {
            const inicio = this.selectionStart;
            const fin = this.selectionEnd;
            const longitudPrevia = this.value.length;

            let val = this.value.replace(/\./g, '').replace(/-/g, '');

            if (val.length > 9) val = val.slice(0, 9);

            this.value = formatearRutLive(val);

            const diferencia = this.value.length - longitudPrevia;

            if (inicio !== null && fin !== null) {
                this.setSelectionRange(inicio + diferencia, fin + diferencia);
            }
        });

        elemento.addEventListener("blur", function () {
            const errorElement = document.getElementById(`error${this.id}`);

            if (this.value && !validarRutMod11(this.value)) {
                this.classList.add("input-error");
                if (errorElement) {
                    errorElement.textContent = "RUT inválido";
                    errorElement.style.display = "block";
                }
                this.setAttribute('aria-invalid', 'true');
            } else {
                this.classList.remove("input-error");
                if (errorElement) {
                    errorElement.textContent = "";
                    errorElement.style.display = "none";
                }
                this.setAttribute('aria-invalid', 'false');
            }
        });
    });
}

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
                simulateRolLookup(this.value);
            }
        });
    }
}

function loadSavedValues() {
    const campos = [
        "txtCodProvPrefijo",
        "txtContratoPrefijo",
        "txtVentaPrefijo",
        "txtOC", "txtFechaRecepcion",
        "txtProducto", "txtFSC", "txtDestino", "txtRol",
        "txtDespachador", "txtTransportista", "txtRUTDespachador",
        "txtConductor", "txtRUTConductor", "LargoTroncos", "selectBancos"
    ];

    campos.forEach(id => {
        const valor = localStorage.getItem(id) || sessionStorage.getItem(id);
        const input = document.getElementById(id);
        if (valor && input) {
            input.value = valor;

            if (["txtCodProvPrefijo", "txtContratoPrefijo", "txtVentaPrefijo", "txtProducto"].includes(id)) {
                const event = new Event('input');
                input.dispatchEvent(event);
            }

            if (id === "txtRol" && valor.length >= 5) {
                const event = new Event('blur');
                input.dispatchEvent(event);
            }
        }
    });

    window.addEventListener('pageshow', function (event) {
        if (event.persisted) {
            campos.forEach(id => {
                const valor = localStorage.getItem(id) || sessionStorage.getItem(id);
                const input = document.getElementById(id);
                if (valor && input) {
                    input.value = valor;

                    if (["txtCodProvPrefijo", "txtContratoPrefijo", "txtVentaPrefijo", "txtProducto"].includes(id)) {
                        const event = new Event('input');
                        input.dispatchEvent(event);
                    }
                }
            });
        }
    });
}

async function obtenerDatosAPI(endpoint, id) {
    try {
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

function checkExternalFunctions() {
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
            console.error(`Función requerida no encontrada: ${funcName}`);
        }
    });
}


$("#txtCodProvPrefijo").blur(function () {
    //alert($("#idProv").val());
    var esNumero = true;
   
    idProv = $("#txtCodProvPrefijo").val();
    /*        esNumero = isNaN(idProv);*/

    if (idProv != "" || (isNaN(idProv))) {
        var resultado = ObtenerProveedor(idProv);
        var prov = resultado[0].mcl_nombre.trim();
        $("#txtCodProvAuto").val(prov);
    }


});

$("#txtContratoPrefijo").blur(function () {
    //alert($("#idProv").val());
    var esNumero = true;

    idContr = $("#txtContratoPrefijo").val();
    /*        esNumero = isNaN(idContr);*/

    if (idContr != "" || (isNaN(idContr))) {
        var resultado = Obtener_NC(idContr);
        //var Contr = resultado[0].mcl_nombre.trim();
        //$("#txtContratoAuto").val(Contr);
    }


});

$("#txtVentaPrefijo").blur(function () {
    //alert($("#idVenta").val());
    var esNumero = true;

    idVenta = $("#txtVentaPrefijo").val();
    /*        esNumero = isNaN(idVenta);*/

    if (idVenta != "" || (isNaN(idVenta))) {
        var resultado = Obtener_NV(idVenta);
        //var Venta = resultado[0].nombre.trim();
        //$("#txtVentaAuto").val(Venta);
    }


});

$("#txtProducto").blur(function () {
    //alert($("#idProd").val());
    var esNumero = true;

    idProd = $("#txtProducto").val();
    /*        esNumero = isNaN(idProv);*/

    if (idProd != "" || (isNaN(idProd))) {
        var resultado = ObtenerProducto(idProd);
        var Prod = resultado[0].nombre.trim();
        $("#nomProducto").val(Prod);
    }


});

function configureSubmitButton() {
    const btn = document.getElementById("btnIrContar");
    if (btn) {
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

            campos.forEach(id => {
                const input = document.getElementById(id);
                if (!input || input.value.trim() === "") {
                    incompletos.push(id);
                    if (input) input.classList.add('input-error');
                }
            });

            const rutConductorInput = document.getElementById("txtRUTConductor");
            const rutDespachadorInput = document.getElementById("txtRUTDespachador");

            if (rutConductorInput && !validarRutMod11(rutConductorInput.value.trim())) {
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
                return;
            }

            if (rutDespachadorInput && !validarRutMod11(rutDespachadorInput.value.trim())) {
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
                return;
            }

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

            campos.forEach(id => {
                const el = document.getElementById(id);
                if (el && el.value.trim() !== "") {
                    sessionStorage.setItem(id, el.value.trim());
                }
            });

            localStorage.setItem("cantidadBancos", cantidad);
            if (!localStorage.getItem("bancoActual")) {
                localStorage.setItem("bancoActual", 1);
            }
            if (!localStorage.getItem("datosBancos")) {
                localStorage.setItem("datosBancos", JSON.stringify([]));
            }

            showLoader();
            setTimeout(() => {
                window.location.href = "contartrozos.aspx";
            }, 300);
        });
    }
}

