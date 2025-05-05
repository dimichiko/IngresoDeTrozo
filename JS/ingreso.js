document.addEventListener("DOMContentLoaded", function () {
    $("#acordeon").accordion({
        heightStyle: "content",
        collapsible: true
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

    ["txtRUTConductor", "txtRUTDespachador"].forEach(id => {
        const elemento = document.getElementById(id);

        if (!elemento) return;

        elemento.addEventListener("input", function () {
            const inicio = this.selectionStart;
            const fin = this.selectionEnd;
            const longitudPrevia = this.value.length;

            let val = this.value.replace(/\./g, '').replace(/-/g, '');

            if (val.length > 9) val = val.slice(0, 9);

            this.value = formatearRutLive(val);

            const diferencia = this.value.length - longitudPrevia;

            if (inicio && fin) {
                this.setSelectionRange(inicio + diferencia, fin + diferencia);
            }
        });

        elemento.addEventListener("blur", function () {
            if (this.value && !validarRutMod11(this.value)) {
                this.classList.add("rut-invalido");
            } else {
                this.classList.remove("rut-invalido");
            }
        });
    });
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

    document.getElementById("txtOC").addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 4);
    });

    document.getElementById("txtRol").addEventListener("input", function () {
        let val = this.value.replace(/[^0-9]/g, "").slice(0, 6);
        if (val.length > 3) {
            this.value = val.slice(0, 3) + "-" + val.slice(3);
        } else {
            this.value = val;
        }
    });

    ["txtCodProvPrefijo", "txtProducto", "txtContratoPrefijo", "txtVentaPrefijo", "txtOC"].forEach(id => {
        const elemento = document.getElementById(id);
        if (!elemento) return; 

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
        btn.addEventListener("click", function () {
            let incompletos = [];

            campos.forEach(id => {
                const input = document.getElementById(id);
                if (!input || input.value.trim() === "") {
                    incompletos.push(id);
                }
            });

            const rutConductorInput = document.getElementById("txtRUTConductor");
            const rutDespachadorInput = document.getElementById("txtRUTDespachador");

            if (rutConductorInput && !validarRutMod11(rutConductorInput.value.trim())) {
                Swal.fire({
                    icon: 'error',
                    title: 'RUT del Conductor inválido',
                    text: 'Por favor, verifica el RUT del conductor.'
                });
                return;
            }

            if (rutDespachadorInput && !validarRutMod11(rutDespachadorInput.value.trim())) {
                Swal.fire({
                    icon: 'error',
                    title: 'RUT del Despachador inválido',
                    text: 'Por favor, verifica el RUT del despachador.'
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

                const camposFaltantes = incompletos.map(id =>
                    `• ${nombresAmigables[id] || id}`).join('\n');

                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    html: `
                        <div style="text-align: left; font-size: 16px;">
                             <p>Por favor completa los siguientes campos:</p>
                             <ul style="padding-left: 20px; line-height: 1.8;">
                                 ${incompletos.map(id =>
                        `<li><b>${nombresAmigables[id] || id}</b></li>`).join('')}
                             </ul>
                        </div>
                    `
                });
                return;
            }

            const cantidadSelect = document.getElementById("selectBancos");
            const cantidad = cantidadSelect ? cantidadSelect.value : null;

            if (!cantidad) {
                Swal.fire("Debes seleccionar la cantidad de bancos");
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

            window.location.href = "contartrozos.aspx";
        });
    }
});