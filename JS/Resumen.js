const STORAGE_KEYS = {
    DATOS_BANCOS: "datosBancos",
    BANCO_ACTUAL: "bancoActual",
    CANTIDAD_BANCOS: "cantidadBancos"
};

// Controlador de datos - Maneja persistencia y lógica de negocio
const dataController = (() => {
    // Constantes
    const diametrosDisponibles = Array.from({ length: (60 - 16) / 2 + 1 }, (_, i) => 16 + i * 2);

    // Cálculos
    const calcularVolumen = (diametro) => (diametro * diametro * 3.2) / 10000;

    const calcularVolumenBanco = (contadores) => {
        if (!contadores || typeof contadores !== 'object') return 0;

        return Object.entries(contadores).reduce((volumen, [diametro, cantidad]) => {
            const d = parseInt(diametro) || 0;
            const c = parseInt(cantidad) || 0;
            return volumen + (calcularVolumen(d) * c);
        }, 0);
    };

    // Operaciones de datos
    const getBancos = () => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.DATOS_BANCOS);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Error al obtener datos de bancos:", e);
            return null;
        }
    };

    const guardarBancos = (bancos) => {
        try {
            localStorage.setItem(STORAGE_KEYS.DATOS_BANCOS, JSON.stringify(bancos));
            return true;
        } catch (error) {
            console.error("Error al guardar datos de bancos:", error);
            return false;
        }
    };

    const calcularTotalesGlobales = () => {
        const bancos = getBancos();
        if (!bancos || !Array.isArray(bancos)) return { total: 0, volumen: 0 };

        return bancos.reduce((acc, banco) => {
            if (banco) {
                acc.total += banco.total || 0;
                acc.volumen += banco.volumen || 0;
            }
            return acc;
        }, { total: 0, volumen: 0 });
    };

    const actualizarBanco = (index, nuevosContadores) => {
        const bancos = getBancos();
        if (!bancos || !bancos[index]) return false;

        const total = Object.values(nuevosContadores)
            .reduce((sum, val) => sum + parseInt(val || 0), 0);

        const volumen = calcularVolumenBanco(nuevosContadores);

        bancos[index].contadores = nuevosContadores;
        bancos[index].total = total;
        bancos[index].volumen = volumen;

        return guardarBancos(bancos) ? { total, volumen } : false;
    };

    const getDiametrosDisponibles = (index) => {
        const bancos = getBancos();
        if (!bancos || !bancos[index]) return [];

        const usados = Object.keys(bancos[index].contadores || {}).map(d => parseInt(d));
        return diametrosDisponibles.filter(d => !usados.includes(d));
    };

    const agregarDiametro = (index, diametro) => {
        const bancos = getBancos();
        if (!bancos || !bancos[index]) return false;

        if (!bancos[index].contadores) {
            bancos[index].contadores = {};
        }

        bancos[index].contadores[diametro] = 0;
        return guardarBancos(bancos);
    };

    const limpiarDatosTemporales = () => {
        localStorage.removeItem(STORAGE_KEYS.DATOS_BANCOS);
        localStorage.removeItem(STORAGE_KEYS.BANCO_ACTUAL);
        localStorage.removeItem(STORAGE_KEYS.CANTIDAD_BANCOS);
    };

    return {
        getBancos,
        guardarBancos,
        calcularVolumen,
        calcularVolumenBanco,
        calcularTotalesGlobales,
        actualizarBanco,
        getDiametrosDisponibles,
        agregarDiametro,
        limpiarDatosTemporales
    };
})();

// Controlador de UI - Maneja manipulaciones del DOM
const uiController = (() => {
    // Referencias DOM cacheadas
    const getDOMElements = () => ({
        loader: document.getElementById('loader'),
        bloqueBancos: document.getElementById("bloques-bancos"),
        totalTroncos: document.getElementById("total-troncos"),
        volumenTotal: document.getElementById("volumen-total"),
        pantallaBancos: document.getElementById("pantalla-bancos"),
        pantallaFinal: document.getElementById("pantalla-final"),
        resumenFinalTroncos: document.getElementById("resumen-final-troncos"),
        resumenFinalVolumen: document.getElementById("resumen-final-volumen"),
        fechaImpresion: document.getElementById("fecha-impresion")
    });

    // Funciones de renderizado
    const showLoader = () => {
        const { loader } = getDOMElements();
        if (loader) loader.style.display = 'block';
    };

    const hideLoader = () => {
        const { loader } = getDOMElements();
        if (loader) loader.style.display = 'none';
    };

    const renderizarResumen = (bancos) => {
        const { bloqueBancos, totalTroncos, volumenTotal } = getDOMElements();
        if (!bloqueBancos) return;

        bloqueBancos.innerHTML = "";

        const { total: totalGlobal, volumen: volumenGlobal } = dataController.calcularTotalesGlobales();

        bancos.forEach((bancoObj, index) => {
            const { banco, total, volumen, contadores } = bancoObj;

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
                const volumenParcial = dataController.calcularVolumen(parseInt(diametro)) * cantidad;
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
               <button type="button" id="btn-editar-${index}" data-index="${index}" class="btn-edicion">Editar monto</button>
               <button type="button" id="btn-agregar-${index}" data-index="${index}" class="btn-agregar" style="display: none;">+ Diámetro</button>
            `;
            detalles.appendChild(botones);

            bloqueBancos.appendChild(detalles);
        });

        actualizarTotalesGlobales(totalGlobal, volumenGlobal);
    };

    const actualizarTotalesGlobales = (totalGlobal, volumenGlobal) => {
        const { totalTroncos, volumenTotal } = getDOMElements();

        if (totalTroncos) totalTroncos.textContent = `Total de Troncos: ${totalGlobal}`;
        if (volumenTotal) volumenTotal.textContent = `Volumen Total: ${volumenGlobal.toFixed(2)} m³`;
    };

    const mostrarResumenIngreso = () => {
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
    };

    const toggleEdicionBanco = (index, activar) => {
        const inputs = document.querySelectorAll(`.banco-${index}`);
        const btn = document.getElementById(`btn-editar-${index}`);
        const btnAgregar = document.getElementById(`btn-agregar-${index}`);

        if (!btn || !btnAgregar || inputs.length === 0) return;

        inputs.forEach(input => {
            input.disabled = !activar;
            input.classList.toggle('modo-edicion', activar);
        });

        btnAgregar.style.display = activar ? "inline-block" : "none";

        if (activar) {
            btn.innerText = "Guardar edición";
            btn.classList.add('btn-guardar');
        } else {
            btn.innerText = "Editar monto";
            btn.classList.remove('btn-guardar');
        }
    };

    const actualizarResumenBanco = (index, total, volumen) => {
        const totalElement = document.getElementById(`total-banco-${index}`);
        const volumenElement = document.getElementById(`volumen-banco-${index}`);

        if (totalElement) totalElement.textContent = total;
        if (volumenElement) volumenElement.textContent = `${volumen.toFixed(2)} m³`;
    };

    const mostrarPantallaFinal = () => {
        const { pantallaBancos, pantallaFinal, totalTroncos, volumenTotal,
            resumenFinalTroncos, resumenFinalVolumen, fechaImpresion } = getDOMElements();

        if (!pantallaBancos || !pantallaFinal) return;

        pantallaBancos.style.display = "none";
        pantallaFinal.style.display = "block";

        mostrarResumenIngreso();

        if (totalTroncos && resumenFinalTroncos) {
            resumenFinalTroncos.textContent = totalTroncos.textContent.replace("Total de Troncos: ", "");
        }

        if (volumenTotal && resumenFinalVolumen) {
            resumenFinalVolumen.textContent = volumenTotal.textContent.replace("Volumen Total: ", "");
        }

        if (fechaImpresion) {
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
            fechaImpresion.textContent = now.toLocaleString('es-ES', opciones);
        }
    };

    const mostrarPantallaBancos = () => {
        const { pantallaFinal, pantallaBancos } = getDOMElements();

        if (!pantallaFinal || !pantallaBancos) return;

        pantallaFinal.style.display = "none";
        pantallaBancos.style.display = "block";
    };

    return {
        showLoader,
        hideLoader,
        renderizarResumen,
        actualizarTotalesGlobales,
        mostrarResumenIngreso,
        toggleEdicionBanco,
        actualizarResumenBanco,
        mostrarPantallaFinal,
        mostrarPantallaBancos
    };
})();

// Manejadores de eventos - Procesamiento de interacciones
const eventHandlers = (() => {
    // Funciones de utilidad para alertas
    const mostrarError = (mensaje) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: mensaje,
            confirmButtonColor: '#007BFF'
        });
    };

    const mostrarExito = (titulo, mensaje, timer = 1500) => {
        return Swal.fire({
            icon: 'success',
            title: titulo,
            text: mensaje,
            confirmButtonColor: '#007BFF',
            timer: timer,
            timerProgressBar: true,
            showConfirmButton: timer > 0 ? false : true
        });
    };

    const confirmarAccion = (titulo, mensaje, tipo = 'warning') => {
        return Swal.fire({
            title: titulo,
            text: mensaje,
            icon: tipo,
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        });
    };

    // Manejadores
    const validarSesion = () => {
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
            return false;
        }
        return true;
    };

    const handleToggleEdicion = (index) => {
        const bancos = dataController.getBancos();
        if (!bancos || !bancos[index]) {
            return mostrarError("No se encontraron datos del banco.");
        }

        const btn = document.getElementById(`btn-editar-${index}`);
        const modoEdicion = btn && btn.innerText === "Editar monto";

        if (modoEdicion) {
            // Activar edición
            uiController.toggleEdicionBanco(index, true);
        } else {
            // Guardar cambios
            const inputs = document.querySelectorAll(`.banco-${index}`);
            const nuevosContadores = {};
            let total = 0;

            inputs.forEach(input => {
                const val = Math.max(0, parseInt(input.value) || 0);
                input.value = val;
                nuevosContadores[input.dataset.diametro] = val;
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

            const resultado = dataController.actualizarBanco(index, nuevosContadores);
            if (resultado) {
                uiController.actualizarResumenBanco(index, resultado.total, resultado.volumen);

                const totalesGlobales = dataController.calcularTotalesGlobales();
                uiController.actualizarTotalesGlobales(totalesGlobales.total, totalesGlobales.volumen);

                mostrarExito('Guardado', 'Cambios aplicados correctamente.');
            } else {
                mostrarError("Error al guardar los cambios.");
            }

            uiController.toggleEdicionBanco(index, false);
        }
    };

    const handleNuevoDiametro = (index) => {
        const disponibles = dataController.getDiametrosDisponibles(index);

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
                if (dataController.agregarDiametro(index, diametro)) {
                    const bancos = dataController.getBancos();
                    uiController.renderizarResumen(bancos);
                    setTimeout(() => handleToggleEdicion(index), 100);
                } else {
                    mostrarError("Error al agregar el diámetro.");
                }
            }
        });
    };

    const volverAContarTrozos = () => {
        uiController.showLoader();
        window.location.href = "contartrozos.aspx";
    };

    const terminarProceso = () => {
        confirmarAccion(
            '¿Finalizar proceso?',
            "Esto enviará los datos y no podrá modificarlos después.",
            'warning'
        ).then(result => {
            if (result.isConfirmed) {
                dataController.limpiarDatosTemporales();

                mostrarExito(
                    'Proceso finalizado',
                    'Los datos fueron consolidados correctamente.',
                    0
                ).then(() => {
                    sessionStorage.clear();
                    localStorage.clear();
                    window.location.href = "login.aspx";
                });
            }
        });
    };

    const reiniciarProceso = () => {
        confirmarAccion(
            '¿Reiniciar proceso?',
            "Esto borrará todos los datos ingresados.",
            'warning'
        ).then(result => {
            if (result.isConfirmed) {
                dataController.limpiarDatosTemporales();
                sessionStorage.clear();
                localStorage.clear();
                uiController.showLoader();
                window.location.href = "login.aspx";
            }
        });
    };

    const irAlInicio = () => {
        confirmarAccion(
            '¿Volver al inicio?',
            "Esto eliminará todos los datos ingresados.",
            'warning'
        ).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.clear();
                dataController.limpiarDatosTemporales();
                uiController.showLoader();
                window.location.href = "login.aspx";
            }
        });
    };

    const mostrarErrorYRedirigir = (mensaje = "No hay información para mostrar. Serás redirigido.") => {
        Swal.fire({
            icon: 'error',
            title: 'Sin datos',
            text: mensaje,
            confirmButtonColor: '#007BFF'
        }).then(() => window.location.href = 'contartrozos.aspx');
    };

    return {
        validarSesion,
        handleToggleEdicion,
        handleNuevoDiametro,
        volverAContarTrozos,
        terminarProceso,
        reiniciarProceso,
        irAlInicio,
        mostrarErrorYRedirigir
    };
})();

// Exponer funciones al scope global para onclick del HTML
window.volverAContarTrozos = eventHandlers.volverAContarTrozos;
window.mostrarPantallaFinal = uiController.mostrarPantallaFinal;
window.mostrarPantallaBancos = uiController.mostrarPantallaBancos;
window.irAlInicio = eventHandlers.irAlInicio;

// Inicialización y configuración de eventos
const appController = (() => {
    const setupEventListeners = () => {
        // Delegación de eventos para botones dinámicos
        document.addEventListener('click', (e) => {
            // Botones de edición
            if (e.target.classList.contains('btn-edicion') || e.target.id.startsWith('btn-editar-')) {
                const index = parseInt(e.target.dataset.index || e.target.id.replace('btn-editar-', ''));
                if (!isNaN(index)) {
                    eventHandlers.handleToggleEdicion(index);
                }
            }

            // Botones de agregar diámetro
            if (e.target.classList.contains('btn-agregar') || e.target.id.startsWith('btn-agregar-')) {
                const index = parseInt(e.target.dataset.index || e.target.id.replace('btn-agregar-', ''));
                if (!isNaN(index)) {
                    eventHandlers.handleNuevoDiametro(index);
                }
            }

            // Botones específicos con ID
            if (e.target.id === 'btn-volver-contar') {
                eventHandlers.volverAContarTrozos();
            }

            if (e.target.id === 'btn-terminar') {
                eventHandlers.terminarProceso();
            }

            if (e.target.id === 'btn-reiniciar') {
                eventHandlers.reiniciarProceso();
            }

            if (e.target.id === 'btn-ir-inicio') {
                eventHandlers.irAlInicio();
            }

            if (e.target.id === 'btn-imprimir') {
                window.print();
            }

            if (e.target.id === 'btn-mostrar-final') {
                uiController.mostrarPantallaFinal();
            }

            if (e.target.id === 'btn-mostrar-bancos') {
                uiController.mostrarPantallaBancos();
            }
        });

        // Mantener la asignación directa como respaldo
        // Botones de navegación
        const btnVolverContar = document.getElementById('btn-volver-contar');
        if (btnVolverContar) {
            btnVolverContar.addEventListener('click', eventHandlers.volverAContarTrozos);
        }

        const btnTerminar = document.getElementById('btn-terminar');
        if (btnTerminar) {
            btnTerminar.addEventListener('click', eventHandlers.terminarProceso);
        }

        const btnReiniciar = document.getElementById('btn-reiniciar');
        if (btnReiniciar) {
            btnReiniciar.addEventListener('click', eventHandlers.reiniciarProceso);
        }

        const btnIrInicio = document.getElementById('btn-ir-inicio');
        if (btnIrInicio) {
            btnIrInicio.addEventListener('click', eventHandlers.irAlInicio);
        }

        const btnImprimir = document.getElementById('btn-imprimir');
        if (btnImprimir) {
            btnImprimir.addEventListener('click', () => window.print());
        }

        const btnMostrarFinal = document.getElementById('btn-mostrar-final');
        if (btnMostrarFinal) {
            btnMostrarFinal.addEventListener('click', uiController.mostrarPantallaFinal);
        }

        const btnMostrarBancos = document.getElementById('btn-mostrar-bancos');
        if (btnMostrarBancos) {
            btnMostrarBancos.addEventListener('click', uiController.mostrarPantallaBancos);
        }
    };

    const init = () => {
        try {
            if (!eventHandlers.validarSesion()) return;

            const bancos = dataController.getBancos();
            if (!bancos || !Array.isArray(bancos) || bancos.length === 0) {
                eventHandlers.mostrarErrorYRedirigir();
                return;
            }

            uiController.renderizarResumen(bancos);
            uiController.mostrarResumenIngreso();

            const totalesGlobales = dataController.calcularTotalesGlobales();
            uiController.actualizarTotalesGlobales(totalesGlobales.total, totalesGlobales.volumen);

            setupEventListeners();
            uiController.hideLoader();
        } catch (error) {
            console.error("Error al inicializar la aplicación:", error);
            eventHandlers.mostrarErrorYRedirigir("Error al cargar datos. Por favor intente nuevamente.");
        }
    };

    return {
        init
    };
})();

// Auto-inicio cuando el DOM está listo
window.addEventListener('load', appController.init);

async function guardarDatos() {
    const datos = {
        NC: sessionStorage.getItem("txtContratoAuto") || "0",
        NV: sessionStorage.getItem("txtVentaAuto") || "0",
        GDE: sessionStorage.getItem("txtOC") || "",
        codProv: sessionStorage.getItem("txtCodProvAuto") || "0",
        CodFSC: sessionStorage.getItem("txtFSC") || "",
        Pila: "-",
        LargoTrozo: sessionStorage.getItem("LargoTroncos") || "",
        CodEmp: sessionStorage.getItem("id_usuario") || "",
        TotUnidades: 0,
        TotVolM3: 0,
        strObs: "-",
        RutTrans: sessionStorage.getItem("txtRUTTransportista") || "0",
        NomTrans: sessionStorage.getItem("txtTransportista") || "",
        RutDesp: sessionStorage.getItem("txtRUTDespachador") || "",
        NomDesp: sessionStorage.getItem("txtDespachador") || "",
        RutCond: sessionStorage.getItem("txtRUTConductor") || "",
        NomCond: sessionStorage.getItem("txtConductor") || "",
        PatenteCam: "-",
        PatenteCar: "-",
        Rol: sessionStorage.getItem("txtRol") || "",
        Destino: sessionStorage.getItem("txtDestino") || "",
        EstadoCod: "1",
        CodUsuario: sessionStorage.getItem("id_usuario") || ""
    };

    const bancos = dataController.getBancos();
    if (!bancos || bancos.length === 0) {
        Swal.fire("Error", "No hay bancos registrados para guardar.", "error");
        return;
    }

    bancos.forEach(b => {
        datos.TotUnidades += b.total;
        datos.TotVolM3 += b.volumen;
    });

    // === Guardar archivo JSON local ===
    const resumenGlobal = {};
    for (let d = 16; d <= 60; d += 2) resumenGlobal[d] = 0;
    bancos.forEach(b => {
        for (let d = 16; d <= 60; d += 2) {
            resumenGlobal[d] += b.contadores?.[d] || 0;
        }
    });

    const totalTroncos = Object.values(resumenGlobal).reduce((a, b) => a + b, 0);
    const fechaObj = new Date();
    const fechaHora = fechaObj.toLocaleString('es-CL');
    const yyyy = fechaObj.getFullYear();
    const mm = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const dd = String(fechaObj.getDate()).padStart(2, '0');
    const hh = String(fechaObj.getHours()).padStart(2, '0');
    const min = String(fechaObj.getMinutes()).padStart(2, '0');
    const ss = String(fechaObj.getSeconds()).padStart(2, '0');
    const nombreUsuario = (sessionStorage.getItem("nombre_usuario") || "usuario")
        .replace(/\s+/g, '')
        .replace(/[^a-zA-Z0-9]/g, '');
    const nombreArchivo = `resumen_${nombreUsuario}_${yyyy}-${mm}-${dd}_${hh}-${min}-${ss}.json`;

    const ingreso = {
        Proveedor: datos.codProv,
        NotaCompra: datos.NC,
        NotaVenta: datos.NV,
        OC: datos.GDE,
        Fecha: sessionStorage.getItem("txtFechaRecepcion") || "-",
        Producto: datos.CodProd,
        FSC: datos.CodFSC,
        Bancos: sessionStorage.getItem("selectBancos") || "-",
        Destino: datos.Destino,
        Largo: datos.LargoTrozo,
        Rol: datos.Rol,
        Despachador: datos.NomDesp,
        Transportista: datos.NomTrans,
        RUT_Despachador: datos.RutDesp,
        Conductor: datos.NomCond,
        RUT_Conductor: datos.RutCond
    };

    const datosFinales = {
        generado_por: sessionStorage.getItem("nombre_usuario") || "Desconocido",
        fecha_hora: fechaHora,
        ingreso: ingreso,
        resumen_global: resumenGlobal,
        total_troncos: totalTroncos
    };

    const blob = new Blob([JSON.stringify(datosFinales, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("Datos enviados a IngresarTrozos:", datos);

    const resultado = await IngresarTrozos(
        datos.codProv, datos.NC, datos.NV, datos.GDE, datos.CodProd, datos.CodFSC,
        datos.Pila, datos.LargoTrozo, datos.TotUnidades, datos.TotVolM3,
        datos.CodEmp, datos.strObs, datos.RutTrans, datos.NomTrans,
        datos.RutDesp, datos.NomDesp, datos.RutCond, datos.NomCond,
        datos.PatenteCam, datos.PatenteCar, datos.Rol, datos.Destino, datos.EstadoCod,
        datos.CodUsuario
    );

    console.log("Resultado de IngresarTrozos:", resultado);

    // === Enviar al servidor ===
    //const resultado = IngresarTrozos(
    //    10, 10, 10, 10, 10, 1,
    //    4, 330, 20, 36.1,
    //    10, "holi", "1-1", "n1",
    //    "2-2", "n2", "3-3", "n3",
    //    "AABBCC", "CCDDFF", "147-8", 1, 10,
    //    10
    //);

    if (!resultado || !resultado.GDE) {
        Swal.fire("Error", "Falló el ingreso general de trozos.", "error");
        return;
    }

    for (const b of bancos) {
        const contadores = b.contadores || {};
        for (const diam in contadores) {
            const cantidad = contadores[diam];
            if (cantidad > 0) {
                await IngresarTrozosDet(resultado.GDE, parseInt(diam), cantidad);
            }
        }
    }

    // === Confirmar y preguntar por impresión ===
    Swal.fire({
        title: "Datos guardados",
        text: "¿Deseas imprimir el resumen ahora?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Sí, imprimir",
        cancelButtonText: "No, más tarde",
        confirmButtonColor: "#007BFF",
        cancelButtonColor: "#6c757d"
    }).then(result => {
        if (result.isConfirmed) {
            imprimirResumenComoPDF();
        }
    });
}

function imprimirResumenComoPDF() {
    const generado_por = sessionStorage.getItem("nombre_usuario") || "Desconocido";
    const planta = sessionStorage.getItem("txtDestino") || "Planta";

    const fecha_impresion = (() => {
        const now = new Date();
        const pad = n => String(n).padStart(2, '0');
        const dd = pad(now.getDate());
        const mm = pad(now.getMonth() + 1);
        const yyyy = now.getFullYear();
        const hh = pad(now.getHours());
        const min = pad(now.getMinutes());
        const ss = pad(now.getSeconds());
        return `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`;
    })();

    const fecha_documento = (() => {
        const fechaRaw = sessionStorage.getItem("txtFechaRecepcion") || "-";
        if (!fechaRaw.includes("/")) return fechaRaw;
        const [dd, mm, yyyy] = fechaRaw.split("/");
        return `${dd}-${mm}-${yyyy}`;
    })();

    const ingresoP1 = {
        Proveedor: sessionStorage.getItem("txtCodProvAuto"),
        "Nota Compra": sessionStorage.getItem("txtContratoAuto"),
        "Nota Venta": sessionStorage.getItem("txtVentaAuto"),
        Producto: sessionStorage.getItem("txtProducto"),
        FSC: sessionStorage.getItem("txtFSC"),
        Bancos: sessionStorage.getItem("selectBancos")
    };

    const ingresoP2 = {
        Rol: sessionStorage.getItem("txtRol") || "-",
        Comuna: sessionStorage.getItem("txtComuna") || "-",
        Predio: sessionStorage.getItem("txtPredio") || "-",
        OC: sessionStorage.getItem("txtOC") || "-",
        Coordenadas: sessionStorage.getItem("txtCoordenadas") || "-",
        Rodal: sessionStorage.getItem("txtRodal") || "-",
        Largo: sessionStorage.getItem("LargoTroncos") || "-"
    };

    const datosFinales = {
        Conductor: sessionStorage.getItem("txtConductor"),
        "RUT Conductor": sessionStorage.getItem("txtRUTConductor"),
        Despachador: sessionStorage.getItem("txtDespachador"),
        "RUT Despachador": sessionStorage.getItem("txtRUTDespachador"),
        Transportista: sessionStorage.getItem("txtTransportista")
    };

    const logoURL = "Content/LOGO_ALTO_HORIZONTE-SIN-FONDO.png";

    const resumen = (() => {
        const r = {};
        for (let d = 16; d <= 60; d += 2) r[d] = 0;
        try {
            const bancos = JSON.parse(localStorage.getItem("datosBancos")) || [];
            bancos.forEach(b => {
                for (let d = 16; d <= 60; d += 2) {
                    r[d] += b.contadores?.[d] || 0;
                }
            });
        } catch (error) {
            console.error("Error al procesar datos de bancos:", error);
        }
        return r;
    })();

    const calcularVol = d => (d * d * 3.2) / 10000;
    const totalVolumen = Object.entries(resumen).reduce((sum, [d, c]) =>
        sum + calcularVol(+d) * c, 0).toFixed(2);
    const totalTroncos = Object.values(resumen).reduce((a, b) => a + b, 0);

    let html = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Resumen Final</title>
    <style>
        @media print {
            @page { size: A4 portrait; margin: 0.5cm; }
            body { margin: 0; padding: 0; }
            table { page-break-inside: avoid; }
        }
        body {
            font-family: Arial, sans-serif;
            font-size: 11pt;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        .logo { height: 50px; }
        .metadata {
            font-size: 10pt;
            text-align: right;
        }
        .titulo {
            text-align: center;
            font-size: 16pt;
            font-weight: bold;
            margin: 10px 0 0 0;
        }
        .planta {
            text-align: center;
            font-size: 12pt;
            margin: 0 0 10px 0;
        }
        .info-generado {
            font-size: 10pt;
            text-align: right;
        }
        .pagina {
            font-size: 10pt;
            text-align: right;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }
        td, th {
            padding: 4px 5px;
            font-size: 10pt;
        }
        .summary-table {
            width: 90%;
            margin: 0 auto 15px auto;
            border: 1px solid #000;
        }
        .summary-table th, .summary-table td {
            border: 1px solid #000;
            text-align: center;
        }
        .total-row td {
            font-weight: bold;
            text-align: right;
        }
        .info-titles {
            font-weight: bold;
            margin-top: 20px;
        }
        .separator {
            border-top: 1px solid #999;
            margin: 6px 0;
        }
        .section-table th {
            width: 20%;
            text-align: left;
        }
        .section-table td {
            width: 30%;
        }
        .footer {
            position: fixed;
            bottom: 40px;
            width: 100%;
            display: flex;
            justify-content: space-around;
            font-size: 10pt;
            text-align: center;
        }
    </style>
    </head>
    <body>

    <div class="header">
        <img src="${logoURL}" class="logo" />
        <div class="info-generado">
            <div><strong>Generado por:</strong> ${generado_por}</div>
            <div><strong>Fecha impreso:</strong> ${fecha_impresion}</div>
            <div><strong>Fecha doc:</strong> ${fecha_documento}</div>
            <div class="pagina"><strong>Página:</strong> 1 de 1</div>
        </div>
    </div>

    <div class="titulo">Resumen de Recepción de Troncos</div>
    <div class="planta">Planta: ${planta}</div>

    <h3>Datos de Ingreso</h3>
    <table class="section-table">`;

    const keysP1 = Object.keys(ingresoP1);
    for (let i = 0; i < keysP1.length; i += 2) {
        html += '<tr>';
        for (let j = 0; j < 2; j++) {
            const idx = i + j;
            if (idx < keysP1.length) {
                const key = keysP1[idx];
                html += `<th>${key}:</th><td>${ingresoP1[key] || "-"}</td>`;
            } else {
                html += '<th></th><td></td>';
            }
        }
        html += '</tr>';
    }

    html += `</table>
    <div class="info-titles">Información Origen</div>
    <div class="separator"></div>
    <table class="section-table">`;

    const grid = [
        ["Rol", "Comuna"],
        ["Predio", "OC"],
        ["Coordenadas", "Rodal"],
        ["Largo", ""]
    ];

    grid.forEach(row => {
        html += '<tr>';
        row.forEach(key => {
            if (key) {
                html += `<th>${key}:</th><td>${ingresoP2[key] || "-"}</td>`;
            } else {
                html += '<th></th><td></td>';
            }
        });
        html += '</tr>';
    });

    html += `
    </table>

    <h3>Resumen Global</h3>
    <table class="summary-table">
        <thead>
            <tr>
                <th>Diám.</th><th>Cant.</th><th>Diám.</th><th>Cant.</th>
            </tr>
        </thead>
        <tbody>`;

    const izquierda = [];
    const derecha = [];

    for (let d = 16; d <= 60; d += 2) {
        if (d <= 38) izquierda.push(d);
        else derecha.push(d);
    }

    const maxFilas = Math.max(izquierda.length, derecha.length);

    for (let i = 0; i < maxFilas; i++) {
        const d1 = izquierda[i] ?? "";
        const c1 = d1 ? resumen[d1] || 0 : "";
        const d2 = derecha[i] ?? "";
        const c2 = d2 ? resumen[d2] || 0 : "";

        html += `
        <tr>
            <td>${d1}</td><td>${c1}</td>
            <td>${d2}</td><td>${c2}</td>
        </tr>`;
    }

    html += `
            <tr class="total-row">
                <td colspan="4" style="text-align: right;">
                    Total Troncos: ${totalTroncos} &nbsp;&nbsp;&nbsp;&nbsp;
                    Total Volumen: ${totalVolumen} m³
                </td>
            </tr>
        </tbody>
    </table>

    <div class="info-titles">Información Transportista</div>
    <div class="separator"></div>
    <table class="section-table">`;

    const keysFinal = Object.keys(datosFinales);
    for (let i = 0; i < keysFinal.length; i += 2) {
        html += '<tr>';
        for (let j = 0; j < 2; j++) {
            const idx = i + j;
            if (idx < keysFinal.length) {
                const key = keysFinal[idx];
                html += `<th>${key}:</th><td>${datosFinales[key] || "-"}</td>`;
            } else {
                html += '<th></th><td></td>';
            }
        }
        html += '</tr>';
    }

    html += `</table>

    <div class="footer">
        <div>_____________________________<br>Firma Encargado</div>
        <div>_____________________________<br>Firma Receptor</div>
    </div>

    <script>
        window.onload = () => setTimeout(() => window.print(), 300);
    </script>
    </body>
    </html>`;

    const ventana = window.open('', '_blank');
    if (!ventana) {
        alert('Por favor habilita ventanas emergentes para imprimir.');
        return;
    }
    ventana.document.write(html);
    ventana.document.close();
    ventana.focus();
}