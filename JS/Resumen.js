// Lista global de diámetros posibles
const diametrosDisponibles = Array.from({ length: (60 - 16) / 2 + 1 }, (_, i) => 16 + i * 2);

window.onload = function () {
    const bancos = JSON.parse(localStorage.getItem("datosBancos"));
    if (!bancos || !Array.isArray(bancos) || bancos.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Sin datos',
            text: 'No hay información para mostrar. Serás redirigido.'
        }).then(() => window.location.href = 'contartrozos.aspx');
        return;
    }

    renderizarResumen(bancos);
    mostrarResumenIngreso();
};

function renderizarResumen(bancos) {
    const contenedor = document.getElementById("bloques-bancos");
    contenedor.innerHTML = "";

    let totalGlobal = 0;
    let volumenGlobal = 0;

    bancos.forEach((bancoObj, index) => {
        const { banco, total, volumen, contadores } = bancoObj;
        totalGlobal += total;
        volumenGlobal += volumen;

        const bloque = document.createElement("div");
        bloque.className = "banco-bloque";

        const tabla = Object.entries(contadores)
            .map(([d, c]) => `
                <tr>
                    <td>${d}</td>
                    <td>
                        <input type="number" min="0" class="contador-input banco-${index}" data-diametro="${d}" value="${c}" disabled />
                    </td>
                </tr>
            `).join("");

        bloque.innerHTML = `
            <div class="banco-encabezado">
                <h3>Banco ${banco}</h3>
                <strong>Total:</strong> <span id="total-banco-${index}">${total}</span>
                <strong>Volumen:</strong> <span id="volumen-banco-${index}">${volumen.toFixed(2)} m³</span>
            </div>
            <table>
                <thead><tr><th>Diámetro</th><th>Contador</th></tr></thead>
                <tbody id="tabla-banco-${index}">${tabla}</tbody>
            </table>
            <button type="button" onclick="toggleEdicion(${index})" id="btn-editar-${index}">Editar monto</button>
            <button type="button" onclick="mostrarSelectorDiametro(${index})" id="btn-agregar-${index}" style="display:none;">➕ Agregar diámetro</button>
        `;

        contenedor.appendChild(bloque);
    });

    document.getElementById("total-troncos").textContent = `Total de Troncos: ${totalGlobal}`;
    document.getElementById("volumen-total").textContent = `Volumen Total: ${volumenGlobal.toFixed(2)} m³`;
}

function mostrarResumenIngreso() {
    const campos = {
        "res-proveedor": "txtCodigoProveedor",
        "res-contrato": "txtNombreContrato",
        "res-venta": "txtNombreVenta",
        "res-oc": "txtOC",
        "res-fecha": "txtFechaRecepcion",
        "res-producto": "txtProducto",
        "res-fsc": "txtFSC",
        "res-bancos": "selectBancos",
        "res-destino": "txtDestino",
        "res-largo": "LargoTroncos",
        "res-rol": "txtRol",
        "res-predio": "txtPredio",
        "res-comuna": "txtComuna",
        "res-rodal": "txtRodal",
        "res-coordenadas": "txtCoordenadas",
        "res-despachador": "txtDespachador",
        "res-transportista": "txtTransportista",
        "res-rutdespachador": "txtRUTDespachador",
        "res-conductor": "txtConductor",
        "res-rutconductor": "txtRUTConductor"
    };

    Object.entries(campos).forEach(([htmlId, sessionKey]) => {
        const el = document.getElementById(htmlId);
        if (el) el.textContent = sessionStorage.getItem(sessionKey) || "-";
    });
}

function mostrarSelectorDiametro(index) {
    const bancos = JSON.parse(localStorage.getItem("datosBancos"));
    if (!bancos || !bancos[index]) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontraron datos del banco.'
        });
        return;
    }

    const usados = Object.keys(bancos[index].contadores).map(d => parseInt(d));
    const disponibles = diametrosDisponibles.filter(d => !usados.includes(d));

    if (disponibles.length === 0) {
        Swal.fire("No hay más diámetros para agregar a este banco");
        return;
    }

    Swal.fire({
        title: 'Agregar nuevo diámetro',
        input: 'select',
        inputOptions: Object.fromEntries(disponibles.map(d => [d, `${d} cm`])),
        inputPlaceholder: 'Selecciona un diámetro',
        showCancelButton: true
    }).then(result => {
        if (result.isConfirmed && result.value) {
            const diametro = result.value;
            bancos[index].contadores[diametro] = 0;
            localStorage.setItem("datosBancos", JSON.stringify(bancos));
            renderizarResumen(bancos);
            setTimeout(() => toggleEdicion(index), 100);
        }
    });
}

function toggleEdicion(index) {
    const bancos = JSON.parse(localStorage.getItem("datosBancos"));
    if (!bancos || !bancos[index]) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontraron datos del banco.'
        });
        return;
    }

    const inputs = document.querySelectorAll(`.banco-${index}`);
    const btn = document.getElementById(`btn-editar-${index}`);
    const btnAgregar = document.getElementById(`btn-agregar-${index}`);
    const modoEdicion = btn.innerText === "Editar monto";

    inputs.forEach(input => {
        input.disabled = !modoEdicion;
    });

    btnAgregar.style.display = modoEdicion ? "inline-block" : "none";

    if (modoEdicion) {
        // Cambiando a modo edición
        btn.innerText = "Guardar edición";
    } else {
        // Guardando cambios
        const nuevos = {};
        let total = 0;

        inputs.forEach(i => {
            let val = Math.max(0, parseInt(i.value) || 0);
            i.value = val;
            nuevos[i.dataset.diametro] = val;
            total += val;
        });

        const original = bancos[index].total;

        if (total !== original) {
            Swal.fire({
                icon: 'error',
                title: 'Total incorrecto',
                text: `El total debe ser ${original}, pero suman ${total}.`
            });

            // Mantener en modo edición
            inputs.forEach(i => i.disabled = false);
            btn.innerText = "Guardar edición";
            btnAgregar.style.display = "inline-block";
            return;
        }

        // Actualizar los datos
        bancos[index].contadores = nuevos;
        bancos[index].volumen = calcularVolumenBanco(nuevos);
        localStorage.setItem("datosBancos", JSON.stringify(bancos));

        // Actualizar la visualización
        document.getElementById(`total-banco-${index}`).textContent = original;
        document.getElementById(`volumen-banco-${index}`).textContent = `${bancos[index].volumen.toFixed(2)} m³`;

        // Recalcular total global
        let volumenGlobal = 0;
        bancos.forEach(b => volumenGlobal += b.volumen);
        document.getElementById("volumen-total").textContent = `Volumen Total: ${volumenGlobal.toFixed(2)} m³`;

        // Cambiar estado de botones
        btn.innerText = "Editar monto";

        Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'Cambios aplicados correctamente.'
        });
    }
}

function calcularVolumenBanco(contadores) {
    let v = 0;
    Object.entries(contadores).forEach(([d, c]) => {
        v += (parseInt(d) * parseInt(d) * 3.2 / 10000) * c;
    });
    return v;
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
            localStorage.removeItem("datosBancos");
            localStorage.removeItem("bancoActual");
            localStorage.removeItem("cantidadBancos");

            Swal.fire({
                icon: 'success',
                title: 'Proceso finalizado',
                text: 'Los datos fueron consolidados correctamente.'
            }).then(() => {
                window.location.href = "inicio.aspx";
            });
        }
    });
}

function reiniciarProceso() {
    Swal.fire({
        title: '¿Reiniciar proceso?',
        text: "Esto borrará todos los datos ingresados.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, reiniciar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    }).then(result => {
        if (result.isConfirmed) {
            sessionStorage.clear();
            localStorage.removeItem("datosBancos");
            localStorage.removeItem("bancoActual");
            localStorage.removeItem("cantidadBancos");
            window.location.href = "ingreso.aspx";
        }
    });
}

function mostrarPantallaFinal() {
    document.getElementById("pantalla-bancos").style.display = "none";
    document.getElementById("pantalla-final").style.display = "block";

    mostrarResumenIngreso();

    document.getElementById("resumen-final-troncos").textContent = document.getElementById("total-troncos").textContent.replace("Total de Troncos: ", "");
    const volumenFinalTexto = document.getElementById("volumen-total").textContent.replace("Volumen Total: ", "");
    document.getElementById("resumen-final-volumen").textContent = volumenFinalTexto;

    const now = new Date();
    const fecha = now.toLocaleDateString();
    const hora = now.toLocaleTimeString();
    document.getElementById("fecha-impresion").textContent = `${fecha} ${hora}`;
}

function mostrarPantallaBancos() {
    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-bancos").style.display = "block";
}

function irAlInicio() {
    Swal.fire({
        title: '¿Volver al inicio?',
        text: "Se perderán los datos no guardados.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, volver',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = "inicio.aspx";
        }
    });
}