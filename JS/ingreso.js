document.addEventListener("DOMContentLoaded", function () {
    $("#acordeon").accordion({
        heightStyle: "content",
        collapsible: true,
        active: false  
    });

    const numericInputs = document.querySelectorAll('input[type="number"]');
    numericInputs.forEach(input => {
        input.setAttribute('inputmode', 'numeric');
        input.addEventListener('focus', function () {
            this.setAttribute('inputmode', 'numeric');
        });
    });

    const allInputs = document.querySelectorAll('input, select');
    allInputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.hasAttribute('required') && this.value.trim() === '') {
                this.classList.add('input-error');
            } else {
                this.classList.remove('input-error');
            }
        });

        input.addEventListener('touchstart', function () {
            this.classList.add('touch-active');
        });

        input.addEventListener('touchend', function () {
            this.classList.remove('touch-active');
        });
    });

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
        const valor = sessionStorage.getItem(id);
        const input = document.getElementById(id);
        if (valor && input) input.value = valor;
    });

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

    ["txtRUTConductor", "txtRUTDespachador"].forEach(id => {
        const elemento = document.getElementById(id);

        if (!elemento) return;

        elemento.setAttribute('inputmode', 'numeric');

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
            } else {
                this.classList.remove("input-error");
                if (errorElement) {
                    errorElement.textContent = "";
                    errorElement.style.display = "none";
                }
            }
        });
    });

    const ocElement = document.getElementById("txtOC");
    if (ocElement) {
        ocElement.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 4);
        });
    }

    const rolElement = document.getElementById("txtRol");
    if (rolElement) {
        rolElement.addEventListener("input", function () {
            let val = this.value.replace(/[^0-9]/g, "").slice(0, 6);
            if (val.length > 3) {
                this.value = val.slice(0, 3) + "-" + val.slice(3);
            } else {
                this.value = val;
            }
        });
    }

    ["txtCodProvPrefijo", "txtProducto", "txtContratoPrefijo", "txtVentaPrefijo", "txtOC"].forEach(id => {
        const elemento = document.getElementById(id);
        if (!elemento) return;

        elemento.setAttribute('inputmode', 'numeric');

        elemento.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 4);
        });
    });

    ["txtDespachador", "txtConductor"].forEach(id => {
        const elemento = document.getElementById(id);
        if (!elemento) return;

        elemento.addEventListener("input", function () {
            this.value = this.value
                .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "")
                .replace(/\s{2,}/g, " ")
                .trimStart();

            const partes = this.value.split(" ");
            if (partes.length > 2) {
                this.value = partes.slice(0, 2).join(" ");
            }

            this.value = this.value
                .split(" ")
                .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
                .join(" ");
        });
    });

    const btn = document.getElementById("btnIrContar");
    if (btn) {
        btn.addEventListener('touchstart', function () {
            this.classList.add('button-active');
        });

        btn.addEventListener('touchend', function () {
            this.classList.remove('button-active');
        });

        btn.addEventListener("click", function () {
            let incompletos = [];

            campos.forEach(id => {
                const input = document.getElementById(id);
                if (!input || input.value.trim() === "") {
                    incompletos.push(id);

                    if (input) {
                        input.classList.add('input-error');
                    }
                }
            });

            const rutConductorInput = document.getElementById("txtRUTConductor");
            const rutDespachadorInput = document.getElementById("txtRUTDespachador");

            if (rutConductorInput && !validarRutMod11(rutConductorInput.value.trim())) {
                rutConductorInput.classList.add('input-error');
                const errorElement = document.getElementById('errorRUTConductor');
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
                        confirmButton: 'swal-confirm-button-mobile'
                    }
                });
                return;
            }

            if (rutDespachadorInput && !validarRutMod11(rutDespachadorInput.value.trim())) {
                rutDespachadorInput.classList.add('input-error');
                const errorElement = document.getElementById('errorRUTDespachador');
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
                        confirmButton: 'swal-confirm-button-mobile'
                    }
                });
                return;
            }

            if (incompletos.length > 0) {
                const nombresAmigables = {
                    txtCodProvPrefijo: "Código Proveedor",
                    txtCodProvAuto: "Código Proveedor (Autocompletado)",
                    txtContratoPrefijo: "Nota Compra",
                    txtContratoAuto: "Nota Compra (Autocompletado)",
                    txtVentaPrefijo: "Nota Venta",
                    txtVentaAuto: "Nota Venta (Autocompletado)",
                    txtOC: "Orden de Compra",
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

                // Mobile-optimized alert with better readability
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    html: `
                        <div style="text-align: left; font-size: 16px; padding: 0 10px;">
                             <p>Por favor completa los siguientes campos:</p>
                             <ul style="padding-left: 15px; line-height: 1.8; margin-bottom: 10px;">
                                 ${incompletos.map(id =>
                        `<li style="margin-bottom: 8px;"><b>${nombresAmigables[id] || id}</b></li>`).join('')}
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
                const elemento = document.getElementById(id);
                if (elemento) {
                    sessionStorage.setItem(id, elemento.value);
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

    const style = document.createElement('style');
    style.textContent = `
        .swal-confirm-button-mobile {
            padding: 15px 25px !important;
            font-size: 16px !important;
            min-width: 120px;
        }
        
        .swal-popup-mobile {
            width: auto !important;
            max-width: 90vw !important;
            font-size: 16px !important;
        }
        
        @media (max-width: 480px) {
            .swal2-popup {
                padding: 15px 10px !important;
            }
            
            .swal2-title {
                font-size: 1.4em !important;
            }
            
            .swal2-content {
                font-size: 0.95em !important;
            }
        }
        
        .touch-active {
            background-color: #f0f9ff !important;
        }
        
        .button-active {
            transform: translateY(2px) !important;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('pageshow', function (event) {
        if (event.persisted) {
            campos.forEach(id => {
                const valor = sessionStorage.getItem(id);
                const input = document.getElementById(id);
                if (valor && input) input.value = valor;
            });
        }
    });

    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
        if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
        }
    }

    if ('ontouchstart' in window) {
        document.addEventListener('DOMContentLoaded', function () {
            Array.from(document.querySelectorAll('button, input, select')).forEach(el => {
                el.style.cursor = 'pointer';
            });
        });
    }
});