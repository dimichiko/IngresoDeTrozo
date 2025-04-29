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
    if (!contenedor) return;

    contenedor.innerHTML = "";

    let totalGlobal = 0;
    let volumenGlobal = 0;

    bancos.forEach((bancoObj, index) => {
        if (!bancoObj) return;

        const { banco, total, volumen, contadores } = bancoObj;
        totalGlobal += total || 0;
        volumenGlobal += volumen || 0;

        const bloque = document.createElement("details");
        bloque.className = "banco-bloque";
        if (index === 0) bloque.setAttribute("open", "open");
        bloque.setAttribute("data-banco-id", index);

        let tablaHTML = '';
        if (contadores && typeof contadores === 'object') {
            tablaHTML = Object.entries(contadores)
                .map(([d, c]) => `
                    <tr>
                        <td>${d}</td>
                        <td>
                            <input type="number" min="0" class="contador-input banco-${index}" 
                                data-diametro="${d}" value="${c}" disabled 
                                aria-label="Contador para diámetro ${d}" />
                        </td>
                    </tr>
                `).join("");
        }

        const titulo = `<summary style="font-weight: bold; font-size: 1rem; margin-bottom: 10px;">Banco ${banco}</summary>`;

        bloque.innerHTML = titulo + `
         <div class="bloque-banco-horizontal">
           <span class="banco-total">Total: <span id="total-banco-${index}">${total || 0}</span></span>
           <span class="banco-volumen">Volumen: <span id="volumen-banco-${index}">${(volumen || 0).toFixed(2)} m³</span></span>
           <span class="banco-largo">Largo: ${sessionStorage.getItem("LargoTroncos") || "-"}</span>
         </div>
         <table aria-label="Diámetros banco ${banco}">
           <thead><tr><th>Diámetro</th><th>Contador</th></tr></thead>
           <tbody id="tabla-banco-${index}">${tablaHTML}</tbody>
         </table>
         <div class="botones-banco">
           <button type="button" onclick="toggleEdicion(${index})" id="btn-editar-${index}" class="btn-accion">Editar monto</button>
           <button type="button" onclick="mostrarSelectorDiametro(${index})" id="btn-agregar-${index}" class="btn-accion" style="display:none;">➕ Agregar diámetro</button>
         </div>
`;

        contenedor.appendChild(bloque);
    });

    actualizarTotalesGlobales(totalGlobal, volumenGlobal);
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
    try {
        const bancos = getBancosData();
        if (!bancos || !bancos[index]) {
            mostrarError("No se encontraron datos del banco.");
            return;
        }

        const inputs = document.querySelectorAll(`.banco-${index}`);
        const btn = document.getElementById(`btn-editar-${index}`);
        const btnAgregar = document.getElementById(`btn-agregar-${index}`);

        if (!btn || !btnAgregar) return;

        const modoEdicion = btn.innerText === "Editar monto";

        inputs.forEach(input => {
            input.disabled = !modoEdicion;
            if (modoEdicion) {
                input.classList.add('modo-edicion');
            } else {
                input.classList.remove('modo-edicion');
            }
        });

        btnAgregar.style.display = modoEdicion ? "inline-block" : "none";

        if (modoEdicion) {
            btn.innerText = "Guardar edición";
            btn.classList.add('btn-guardar');
        } else {
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
                    text: `El total debe ser ${original}, pero suman ${total}.`,
                    confirmButtonColor: '#007BFF'
                });

                inputs.forEach(i => {
                    i.disabled = false;
                    i.classList.add('modo-edicion');
                });
                btn.innerText = "Guardar edición";
                btn.classList.add('btn-guardar');
                btnAgregar.style.display = "inline-block";
                return;
            }

            bancos[index].contadores = nuevos;
            bancos[index].volumen = calcularVolumenBanco(nuevos);
            guardarBancos(bancos);

            const totalElement = document.getElementById(`total-banco-${index}`);
            const volumenElement = document.getElementById(`volumen-banco-${index}`);

            if (totalElement) totalElement.textContent = original;
            if (volumenElement) volumenElement.textContent = `${bancos[index].volumen.toFixed(2)} m³`;

            recalcularTotalesGlobales();

            btn.innerText = "Editar monto";
            btn.classList.remove('btn-guardar');

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
    } catch (error) {
        console.error("Error al alternar modo edición:", error);
        mostrarError("Error al procesar los datos. Por favor intente nuevamente.");
    }
}

function calcularVolumenBanco(contadores) {
    try {
        if (!contadores || typeof contadores !== 'object') return 0;

        let volumen = 0;
        Object.entries(contadores).forEach(([diametro, cantidad]) => {
            const d = parseInt(diametro) || 0;
            const c = parseInt(cantidad) || 0;
            volumen += (d * d * 3.2 / 10000) * c;
        });
        return volumen;
    } catch (error) {
        console.error("Error al calcular volumen:", error);
        return 0;
    }
}

function volverAContarTrozos() {
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
            limpiarDatosTemporales();

            Swal.fire({
                icon: 'success',
                title: 'Proceso finalizado',
                text: 'Los datos fueron consolidados correctamente.',
                confirmButtonColor: '#007BFF'
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
            limpiarDatosTemporales();
            window.location.href = "ingreso.aspx";
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

function volverAContarTrozos() {
    window.location.href = "contartrozos.aspx";
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
        confirmButtonText: 'Sí, volver al inicio',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.clear();
            limpiarDatosTemporales();
            window.location.href = "inicio.aspx";
        }
    });
}