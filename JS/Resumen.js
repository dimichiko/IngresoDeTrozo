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

const diametrosDisponibles = Array.from({ length: (60 - 16) / 2 + 1 }, (_, i) => 16 + i * 2);

const STORAGE_KEYS = {
    DATOS_BANCOS: "datosBancos",
    BANCO_ACTUAL: "bancoActual",
    CANTIDAD_BANCOS: "cantidadBancos"
};

window.addEventListener('load', function () {
    try {
        const bancos = getBancosData();
        if (!bancos || !Array.isArray(bancos) || bancos.length === 0) {
            mostrarErrorYRedirigir();
            return;
        }

        renderizarResumen(bancos);
        mostrarResumenIngreso();

        recalcularTotalesGlobales();
    } catch (error) {
        console.error("Error al inicializar la página:", error);
        mostrarErrorYRedirigir("Error al cargar datos. Por favor intente nuevamente.");
    }
});

function getBancosData() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.DATOS_BANCOS);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error("Error al obtener datos de bancos:", e);
        return null;
    }
}

function mostrarErrorYRedirigir(mensaje = "No hay información para mostrar. Serás redirigido.") {
    Swal.fire({
        icon: 'error',
        title: 'Sin datos',
        text: mensaje,
        confirmButtonColor: '#007BFF'
    }).then(() => window.location.href = 'contartrozos.aspx');
}

function renderizarResumen(bancos) {
    const contenedor = document.getElementById("bloques-bancos");
    contenedor.innerHTML = "";

    let totalGlobal = 0;
    let volumenGlobal = 0;

    bancos.forEach((bancoObj, index) => {
        const { banco, total, volumen, contadores } = bancoObj;

        totalGlobal += total;
        volumenGlobal += volumen;

        const detalles = document.createElement("details");
        detalles.className = "banco-bloque";
        detalles.open = true;

        const resumen = document.createElement("summary");
        resumen.textContent = `Banco ${banco}`;
        detalles.appendChild(resumen);

        const tabla = document.createElement("table");
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>Diámetro (cm)</th>
                    <th>Cantidad</th>
                    <th>Volumen (m³)</th>
                </tr>
            </thead>
            <tbody>
                ${Object.entries(contadores).map(([diametro, cantidad]) => {
            const volumenParcial = calcularVolumen(parseInt(diametro)) * cantidad;
            return `
                        <tr>
                            <td>${diametro}</td>
                            <td>
                                <input 
                                    type="number" 
                                    class="banco-${index}" 
                                    data-diametro="${diametro}" 
                                    value="${cantidad}" 
                                    disabled 
                                    style="width: 80px; text-align: center;"
                                />
                            </td>
                            <td>${volumenParcial.toFixed(2)}</td>
                        </tr>`;
        }).join("")}
            </tbody>
        `;
        detalles.appendChild(tabla);

        const resumenBanco = document.createElement("p");
        resumenBanco.innerHTML = `
            <strong>Total:</strong> <span id="total-banco-${index}">${total}</span> troncos<br>
            <strong>Volumen:</strong> <span id="volumen-banco-${index}">${volumen.toFixed(2)} m³</span>
        `;
        detalles.appendChild(resumenBanco);

        const botones = document.createElement("div");
        botones.className = "botones no-print";
        botones.innerHTML = `
           <button type="button" id="btn-editar-${index}" onclick="toggleEdicion(${index})">Editar monto</button>
           <button type="button" id="btn-agregar-${index}" onclick="mostrarSelectorDiametro(${index})" style="display: none;">+ Diámetro</button>
        `;
        detalles.appendChild(botones);

        contenedor.appendChild(detalles);
    });

    const totalElem = document.getElementById("total-troncos");
    const volumenElem = document.getElementById("volumen-total");

    if (totalElem) totalElem.textContent = `Total de Troncos: ${totalGlobal}`;
    if (volumenElem) volumenElem.textContent = `Volumen Total: ${volumenGlobal.toFixed(2)} m³`;
}

function calcularVolumen(diametro) {
    return (diametro * diametro * 3.2) / 10000;
}

function actualizarTotalesGlobales(totalGlobal, volumenGlobal) {
    const totalElement = document.getElementById("total-troncos");
    const volumenElement = document.getElementById("volumen-total");

    if (totalElement) totalElement.textContent = `Total de Troncos: ${totalGlobal}`;
    if (volumenElement) volumenElement.textContent = `Volumen Total: ${volumenGlobal.toFixed(2)} m³`;
}

function recalcularTotalesGlobales() {
    try {
        const bancos = getBancosData();
        if (!bancos || !Array.isArray(bancos)) return;

        let totalGlobal = 0;
        let volumenGlobal = 0;

        bancos.forEach(banco => {
            if (banco) {
                totalGlobal += banco.total || 0;
                volumenGlobal += banco.volumen || 0;
            }
        });

        actualizarTotalesGlobales(totalGlobal, volumenGlobal);
    } catch (error) {
        console.error("Error al recalcular totales globales:", error);
    }
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
        if (el) {
            const valor = sessionStorage.getItem(sessionKey) || "-";
            el.textContent = valor;
        }
    });
}

function mostrarSelectorDiametro(index) {
    try {
        const bancos = getBancosData();
        if (!bancos || !bancos[index]) {
            mostrarError("No se encontraron datos del banco.");
            return;
        }

        const usados = Object.keys(bancos[index].contadores || {}).map(d => parseInt(d));
        const disponibles = diametrosDisponibles.filter(d => !usados.includes(d));

        if (disponibles.length === 0) {
            Swal.fire({
                title: "No hay más diámetros disponibles",
                text: "Ya se han agregado todos los diámetros posibles a este banco.",
                icon: "info",
                confirmButtonColor: "#007BFF"
            });
            return;
        }

        Swal.fire({
            title: 'Agregar nuevo diámetro',
            input: 'select',
            inputOptions: Object.fromEntries(disponibles.map(d => [d, `${d} cm`])),
            inputPlaceholder: 'Selecciona un diámetro',
            showCancelButton: true,
            confirmButtonColor: '#007BFF',
            cancelButtonColor: '#6c757d'
        }).then(result => {
            if (result.isConfirmed && result.value) {
                const diametro = result.value;
                if (!bancos[index].contadores) {
                    bancos[index].contadores = {};
                }
                bancos[index].contadores[diametro] = 0;
                guardarBancos(bancos);
                renderizarResumen(bancos);
                setTimeout(() => toggleEdicion(index), 100);
            }
        });
    } catch (error) {
        console.error("Error al mostrar selector de diámetro:", error);
        mostrarError("Error al mostrar los diámetros disponibles.");
    }
}

function guardarBancos(bancos) {
    try {
        localStorage.setItem(STORAGE_KEYS.DATOS_BANCOS, JSON.stringify(bancos));
    } catch (error) {
        console.error("Error al guardar datos de bancos:", error);
        mostrarError("Error al guardar datos. Por favor intente nuevamente.");
    }
}

function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
        confirmButtonColor: '#007BFF'
    });
}

function toggleEdicion(index) {
    const bancos = getBancosData();
    if (!bancos || !bancos[index]) return mostrarError("No se encontraron datos del banco.");

    const inputs = document.querySelectorAll(`.banco-${index}`);
    const btn = document.getElementById(`btn-editar-${index}`);
    const btnAgregar = document.getElementById(`btn-agregar-${index}`);

    if (!btn || !btnAgregar || inputs.length === 0) return;

    const modoEdicion = btn.innerText === "Editar monto";

    inputs.forEach(input => {
        input.disabled = !modoEdicion;
        input.classList.toggle('modo-edicion', modoEdicion);
    });

    btnAgregar.style.display = modoEdicion ? "inline-block" : "none";

    if (modoEdicion) {
        btn.innerText = "Guardar edición";
        btn.classList.add('btn-guardar');
    } else {
        const nuevos = {};
        let total = 0;

        inputs.forEach(i => {
            const val = Math.max(0, parseInt(i.value) || 0);
            i.value = val;
            nuevos[i.dataset.diametro] = val;
            total += val;
        });

        const original = bancos[index].total;

        if (total !== original) {
            const diferencia = total - original;
            const mensaje = diferencia > 0
                ? `Has agregado ${diferencia} troncos más de lo contado originalmente.`
                : `Has quitado ${Math.abs(diferencia)} troncos del total original.`;

            Swal.fire({
                icon: 'info',
                title: 'Total modificado',
                text: mensaje,
                confirmButtonColor: '#007BFF'
            });
        }

        bancos[index].contadores = nuevos;
        bancos[index].total = total;
        bancos[index].volumen = calcularVolumenBanco(nuevos);
        guardarBancos(bancos);

        const totalElement = document.getElementById(`total-banco-${index}`);
        const volumenElement = document.getElementById(`volumen-banco-${index}`);

        if (totalElement) totalElement.textContent = total;
        if (volumenElement) volumenElement.textContent = `${bancos[index].volumen.toFixed(2)} m³`;

        recalcularTotalesGlobales();
        mostrarResumenIngreso();

        btn.innerText = "Editar monto";
        btn.classList.remove('btn-guardar');
        btnAgregar.style.display = "none";

        inputs.forEach(input => {
            input.disabled = true;
            input.classList.remove('modo-edicion');
        });

        Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'Cambios aplicados correctamente.',
            confirmButtonColor: '#007BFF',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false
        });
    }
}

function calcularVolumenBanco(contadores) {
    try {
        if (!contadores || typeof contadores !== 'object') return 0;

        let volumen = 0;
        Object.entries(contadores).forEach(([diametro, cantidad]) => {
            const d = parseInt(diametro) || 0;
            const c = parseInt(cantidad) || 0;
            volumen += calcularVolumen(d) * c;
        });
        return volumen;
    } catch (error) {
        console.error("Error al calcular volumen:", error);
        return 0;
    }
}

function volverAContarTrozos() {
    showLoader();
    window.location.href = "contartrozos.aspx";
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
            limpiarDatosTemporales();

            Swal.fire({
                icon: 'success',
                title: 'Proceso finalizado',
                text: 'Los datos fueron consolidados correctamente.',
                confirmButtonColor: '#007BFF'
            }).then(() => {
                sessionStorage.clear();
                localStorage.clear();
                window.location.href = "login.aspx";
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
            limpiarDatosTemporales();
            showLoader();
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = "login.aspx";
        }
    });
}

function limpiarDatosTemporales() {
    localStorage.removeItem(STORAGE_KEYS.DATOS_BANCOS);
    localStorage.removeItem(STORAGE_KEYS.BANCO_ACTUAL);
    localStorage.removeItem(STORAGE_KEYS.CANTIDAD_BANCOS);
}

function mostrarPantallaFinal() {
    const pantallaBancos = document.getElementById("pantalla-bancos");
    const pantallaFinal = document.getElementById("pantalla-final");

    if (!pantallaBancos || !pantallaFinal) return;

    pantallaBancos.style.display = "none";
    pantallaFinal.style.display = "block";

    mostrarResumenIngreso();

    const totalTroncosElement = document.getElementById("total-troncos");
    const volumenTotalElement = document.getElementById("volumen-total");
    const resumenFinalTroncosElement = document.getElementById("resumen-final-troncos");
    const resumenFinalVolumenElement = document.getElementById("resumen-final-volumen");

    if (totalTroncosElement && resumenFinalTroncosElement) {
        resumenFinalTroncosElement.textContent = totalTroncosElement.textContent.replace("Total de Troncos: ", "");
    }

    if (volumenTotalElement && resumenFinalVolumenElement) {
        resumenFinalVolumenElement.textContent = volumenTotalElement.textContent.replace("Volumen Total: ", "");
    }

    const fechaElement = document.getElementById("fecha-impresion");
    if (fechaElement) {
        const now = new Date();
        const opciones = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        fechaElement.textContent = now.toLocaleString('es-ES', opciones);
    }
}

function mostrarPantallaBancos() {
    const pantallaFinal = document.getElementById("pantalla-final");
    const pantallaBancos = document.getElementById("pantalla-bancos");

    if (!pantallaFinal || !pantallaBancos) return;

    pantallaFinal.style.display = "none";
    pantallaBancos.style.display = "block";
}

function irAlInicio() {
    Swal.fire({
        title: '¿Volver al inicio?',
        text: "Esto eliminará todos los datos ingresados.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, volver al login',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.clear();
            limpiarDatosTemporales();
            showLoader();
            window.location.href = "login.aspx";
        }
    });
}