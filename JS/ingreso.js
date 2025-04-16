
document.addEventListener("DOMContentLoaded", function () {
    $("#acordeon").accordion({
        heightStyle: "content",
        collapsible: true
    });

    const campos = [
        "txtCodigoProveedor", "txtNombreContrato", "txtNombreVenta", "txtOC", "txtFechaRecepcion",
        "txtProducto", "txtFSC", "txtDestino", "txtRol", "txtDespachador", "txtTransportista", "txtRUTDespachador", "txtConductor",
        "txtRUTConductor"
    ];

    campos.forEach(id => {
        const valor = sessionStorage.getItem(id);
        const input = document.getElementById(id);
        if (valor && input) input.value = valor;
    });

    function formatearRutLive(rut) {
        rut = rut.replace(/[^\dkK]/gi, '').toUpperCase();
        if (rut.length < 2) return rut;

        let cuerpo = rut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        let dv = rut.slice(-1);
        return cuerpo + '-' + dv;
    }

    ["txtRUTConductor", "txtRUTDespachador"].forEach(id => {
        document.getElementById(id).addEventListener("input", function () {
            let val = this.value.replace(/\./g, '').replace(/-/g, '');
            if (val.length > 9) val = val.slice(0, 9);
            this.value = formatearRutLive(val);
        });
    });

    function validarRutMod11(rut) {
        rut = rut.replace(/\./g, '').replace('-', '').toUpperCase();
        if (!/^\d{7,8}[0-9K]$/.test(rut)) return false;

        const cuerpo = rut.slice(0, -1);
        const dv = rut.slice(-1);

        let suma = 0, multiplo = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * multiplo;
            multiplo = multiplo === 7 ? 2 : multiplo + 1;
        }

        let resto = 11 - (suma % 11);
        let dvEsperado = resto === 11 ? '0' : resto === 10 ? 'K' : resto.toString();
        return dv === dvEsperado;
    }

    const btn = document.getElementById("btnIrContar");
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

        const rutConductor = rutConductorInput.value.trim();
        const rutDespachador = rutDespachadorInput.value.trim();

        const errorRUTConductor = document.getElementById("errorRUTConductor");
        const errorRUTDespachador = document.getElementById("errorRUTDespachador");

        let rutValido = true;

        if (!validarRutMod11(rutConductor)) {
            errorRUTConductor.textContent = "RUT inválido";
            rutConductorInput.classList.add("input-error");
            rutValido = false;
        } else {
            errorRUTConductor.textContent = "";
            rutConductorInput.classList.remove("input-error");
        }

        if (!validarRutMod11(rutDespachador)) {
            errorRUTDespachador.textContent = "RUT inválido";
            rutDespachadorInput.classList.add("input-error");
            rutValido = false;
        } else {
            errorRUTDespachador.textContent = "";
            rutDespachadorInput.classList.remove("input-error");
        }

        if (!rutValido) return;

        if (incompletos.length > 0) {
            console.log("Campos incompletos:", incompletos); // 👈 Esto muestra los campos vacíos
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos antes de continuar.'
            });
            return;
        }

        campos.forEach(id => {
            sessionStorage.setItem(id, document.getElementById(id).value);
        });

        window.location.href = "contartrozos.aspx";
    });
});