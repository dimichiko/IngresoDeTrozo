window.onload = function () {
    const datosResumen = JSON.parse(localStorage.getItem('datosResumen'));
    if (!datosResumen) {
        Swal.fire({
            icon: 'error',
            title: 'Sin datos',
            text: 'No hay información para mostrar. Serás redirigido.'
        }).then(() => window.location.href = 'contartrozos.aspx');
        return;
    }

    window.totalOriginal = datosResumen.total;
    window.volumenOriginal = datosResumen.volumen;

    cargarTablaResumen(datosResumen.contadores);
    mostrarResumen(datosResumen);
    agregarInfoEdicion(datosResumen.total);

    const inputEditar = document.getElementById("editarTroncos");
    if (inputEditar) inputEditar.value = datosResumen.total;
};

document.addEventListener("DOMContentLoaded", function () {
    const btnEditarMonto = document.getElementById("btnEditarMonto");
    const btnGuardarEdicion = document.getElementById("btnGuardarEdicion");

    if (btnEditarMonto) {
        btnEditarMonto.addEventListener("click", function () {
            habilitarEdicion();
            btnGuardarEdicion.style.display = "inline-block";
        });
    }

    if (btnGuardarEdicion) {
        btnGuardarEdicion.addEventListener("click", guardarCambios);
    }
});

function cargarTablaResumen(contadores) {
    const tabla = document.getElementById('tabla-resumen');
    tabla.innerHTML = "";

    Object.entries(contadores).forEach(([diametro, contador]) => {
        if (contador > 0) {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td data-label="Diámetro">${diametro}</td>
                <td data-label="Contador">
                    <input type="number" class="contador-input" id="input-${diametro}" 
                           value="${contador}" min="0" data-diametro="${diametro}" 
                           data-valor-original="${contador}" disabled />
                </td>`;
            tabla.appendChild(fila);
        }
    });
}

function mostrarResumen(datos) {
    document.getElementById('total-troncos').innerText = `Total de Troncos: ${datos.total}`;
    document.getElementById('volumen-total').innerText = `Volumen Total: ${datos.volumen.toFixed(2)}`;
}

function agregarInfoEdicion(total) {
    const info = document.getElementById('edicion-info');
    document.getElementById('total-actual').innerText = total;
    document.getElementById('total-requerido').innerText = total;
    info.style.display = 'block';
}

function obtenerInputsContadores() {
    return document.querySelectorAll('.contador-input');
}

function habilitarEdicion() {
    obtenerInputsContadores().forEach(input => {
        input.disabled = false;
        input.addEventListener('input', validarTotal);
    });

    document.getElementById('edicion-info').style.display = 'block';

    const guardarBtn = document.getElementById("btnGuardarEdicion");
    if (guardarBtn) guardarBtn.style.display = "inline-block";

    const editarBtn = document.getElementById("btnEditarMonto");
    if (editarBtn) editarBtn.style.display = "none";
}

function validarTotal() {
    let total = 0;
    obtenerInputsContadores().forEach(input => {
        const valor = Math.max(0, parseInt(input.value) || 0);
        input.value = valor;
        total += valor;
    });

    document.getElementById('total-actual').innerText = total;
    const diferencia = total - window.totalOriginal;
    const alerta = document.getElementById('alerta-total');

    if (diferencia !== 0) {
        alerta.innerText = `Diferencia: ${diferencia} (${diferencia > 0 ? 'sobran' : 'faltan'} troncos)`;
        alerta.style.color = 'red';
    } else {
        alerta.innerText = 'Total correcto';
        alerta.style.color = 'green';
    }
}

function guardarCambios() {
    const datosResumen = JSON.parse(localStorage.getItem('datosResumen'));
    const inputs = obtenerInputsContadores();
    let totalEditado = 0;
    const nuevos = {};

    inputs.forEach(input => {
        const d = input.dataset.diametro;
        const v = Math.max(0, parseInt(input.value) || 0);
        totalEditado += v;
        nuevos[d] = v;
    });

    if (totalEditado !== window.totalOriginal) {
        Swal.fire({
            icon: 'error',
            title: 'Total incorrecto',
            text: `El total debe ser ${window.totalOriginal}. Actualmente suman ${totalEditado}.`
        });
        return;
    }

    datosResumen.contadores = nuevos;
    datosResumen.total = window.totalOriginal;
    datosResumen.volumen = Object.entries(nuevos).reduce((sum, [d, c]) =>
        sum + calcularVolumen(parseInt(d)) * c, 0);

    localStorage.setItem('datosResumen', JSON.stringify(datosResumen));
    mostrarResumen(datosResumen);

    document.getElementById('edicion-info').style.display = 'none';
    inputs.forEach(i => {
        i.disabled = true;
        i.removeEventListener('input', validarTotal);
    });

    Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'Cambios guardados correctamente.'
    });

    const guardarBtn = document.getElementById("btnGuardarEdicion");
    if (guardarBtn) guardarBtn.style.display = "none";

    const editarBtn = document.getElementById("btnEditarMonto");
    if (editarBtn) editarBtn.style.display = "inline-block";
}

function calcularVolumen(diametro) {
    return (diametro * diametro) * 3.2 / 10000;
}

function volverAlFormulario() {
    window.location.href = 'contartrozos.aspx';
}

function terminarProceso() {
    Swal.fire({
        title: '¿Finalizar proceso?',
        text: "Esto enviará los datos y no podrá modificarlos después.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, finalizar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    }).then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem('datosResumen');

            const elementos = [
                "btnEditarMonto",
                "btnGuardarEdicion",
                "edicion-info",
                "tabla-resumen",
                "edicionTroncos"
            ];

            elementos.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = "none";
            });

            const resumen = document.getElementById("resumenCompleto");
            if (resumen) {
                const ids = {
                    proveedor: "txtCodigoProveedor",
                    contrato: "txtNombreContrato",
                    venta: "txtNombreVenta",
                    oc: "txtOC",
                    fecha: "txtFechaRecepcion",
                    producto: "txtProducto",
                    fsc: "txtFSC",
                    destino: "txtDestino",
                    pila: "txtPila",
                    predio: "txtPredio",
                    rol: "txtRol",
                    comuna: "txtComuna",
                    rodal: "txtRodal",
                    despachador: "txtDespachador",
                    transportista: "txtTransportista",
                    rutDespachador: "txtRUTDespachador",
                    conductor: "txtConductor",
                    rutConductor: "txtRUTConductor",
                    patenteCamion: "txtPatenteCamion",
                    patenteCarro: "txtPatenteCarro"
                };

                Object.entries(ids).forEach(([htmlId, storageKey]) => {
                    const el = document.getElementById(htmlId);
                    if (el) el.textContent = sessionStorage.getItem(storageKey) || "-";
                });

                resumen.style.display = "block";
            }

            Swal.fire({
                icon: 'success',
                title: 'Proceso finalizado',
                text: 'La información se ha consolidado correctamente.'
            });
        }
    });
}

function reiniciarProceso() {
    sessionStorage.clear();
    localStorage.removeItem("datosResumen");
    window.location.href = "ingreso.aspx";
}