// Estado global para el manejo de datos
let tablaMovimientos = null;

async function cargarMovimientos() {
    const container = document.getElementById('movimientos-container');

    // Mostrar loading
    mostrarLoading(container);

    try {
        // Destruir tabla existente si existe
        if (tablaMovimientos) {
            tablaMovimientos.destroy();
            tablaMovimientos = null;
        }

        // Limpiar container
        container.innerHTML = "";

        // Crear estructura de tabla
        const tabla = crearEstructuraTabla();
        container.appendChild(tabla);

        // Obtener datos
        const correlativoSolicitado = 0;
        console.log("📥 Solicitando ingreso con correlativo:", correlativoSolicitado);
        const datos = Obtener_Ingreso_Trozo(correlativoSolicitado);
        const items = datos?.DS || [];

        if (items.length === 0) {
            mostrarMensajeSinDatos(container);
            return;
        }

        for (const item of items) {
            poblarTabla(item);
        }

        // Inicializar DataTable
        inicializarDataTable();

    } catch (error) {
        console.error('Error al cargar movimientos:', error);
        mostrarError('Error al cargar los datos. Por favor, intente nuevamente.');
    }
}

function mostrarLoading(container) {
    container.innerHTML = `
        <div class="loading-container" style="text-align: center; padding: 3rem;">
            <div class="loading-spinner"></div>
            <p style="margin-top: 1rem; color: #666;">Cargando movimientos...</p>
        </div>
    `;
}

function crearEstructuraTabla() {
    const esMovil = window.innerWidth <= 768;

    const headers = esMovil
        ? ['Corr.', 'GDE', 'Fec.', 'Prov.', 'Vol. (m³)', 'Acc.']
        : ['Correlativo', 'GDE', 'Fecha', 'Proveedor', 'Volumen (m³)', 'Acción'];

    const tabla = document.createElement('table');
    tabla.id = 'tabla-movimientos';
    tabla.style.width = '100%';
    tabla.style.borderCollapse = 'collapse';

    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    headers.forEach(titulo => {
        const th = document.createElement('th');
        th.textContent = titulo;
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    tabla.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.id = 'tbody-movimientos';
    tabla.appendChild(tbody);

    return tabla;
}

function poblarTabla(item) {
    const tbody = document.getElementById('tbody-movimientos');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${item.Correlativo || '-'}</td>
        <td>${item.GDE || '-'}</td>
        <td>${formatearFecha(item.FechaRecep)}</td>
        <td>${item.CodProv || '-'}</td>
        <td>${formatearVolumen(item.TotVolM3)}</td>
        <td>
            <button class="btn-detalle" onclick="verDetalle(event, ${item.Correlativo})"
                    title="Ver detalles del ingreso">
                <i class="fas fa-eye"></i>
            </button>
        </td>
    `;

    tbody.appendChild(row);
}

function inicializarDataTable() {
    tablaMovimientos = $('#tabla-movimientos').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'
        },
        pageLength: 10,
        lengthMenu: [5, 10, 25, 50, 100],
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        responsive: true,
        dom: 'lfrtip'
    });
}

function mostrarMensajeSinDatos(container) {
    container.innerHTML = `
        <div class="no-data-message">
            <i class="fas fa-inbox" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
            <p>No se encontraron movimientos para mostrar.</p>
            <button onclick="cargarMovimientos()" class="btn-detalle" style="margin-top: 1rem;">
                <i class="fas fa-refresh"></i> Intentar nuevamente
            </button>
        </div>
    `;
}

function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Entendido'
    });
}

// Funciones utilitarias
function formatearFecha(fecha) {
    if (!fecha) return '-';
    try {
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString('es-CL');
    } catch {
        return fecha.split('T')[0] || '-';
    }
}

function formatearVolumen(volumen) {
    if (volumen === null || volumen === undefined) return '-';
    return Number(volumen).toFixed(3);
}

// Función global para ver detalle
window.verDetalle = function (event, correlativo) {
    event.preventDefault();
    event.stopPropagation();

    if (!correlativo) {
        mostrarError('Correlativo no válido.');
        return;
    }

    const btn = event.target.closest('button');
    const textoOriginal = btn.innerHTML;
    btn.innerHTML = '<div class="loading-spinner"></div>';
    btn.disabled = true;

    try {
        const resultado = Obtener_Ingreso_Trozo_Det(correlativo);
        const detalle = resultado?.DS;

        console.log("🔎 Obteniendo detalle de correlativo:", correlativo);
        console.log("👉 Resultado de Obtener_Ingreso_Trozo_Det:", resultado);

        if (!Array.isArray(detalle) || detalle.length === 0) {
            throw new Error("No se encontró información de detalle para este ingreso.");
        }

        mostrarModalDetalle(correlativo, detalle);

    } catch (error) {
        console.error('Error al obtener detalle:', error);
        mostrarError(error.message || 'No se pudo obtener el detalle del ingreso.');
    } finally {
        btn.innerHTML = textoOriginal;
        btn.disabled = false;
    }
};

function mostrarModalDetalle(correlativo, detalle) {
    const largo = Number(sessionStorage.getItem("LargoTroncos")) || 3.2;
    const calcularVolumenUnitario = d => Math.PI * Math.pow(d / 200, 2) * largo;

    let totalVolumen = 0;
    let totalCantidad = 0;
    let rows = "";

    for (const item of detalle) {
        const cantidad = Number(item.NroTrozo || 0);
        const diametro = Number(item.Diametro || 0);
        const volumen = calcularVolumenUnitario(diametro) * cantidad;

        totalVolumen += volumen;
        totalCantidad += cantidad;

        rows += `
            <tr>
                <td>${diametro}</td>
                <td>${cantidad}</td>
                <td>${volumen.toFixed(3)}</td>
            </tr>`;
    }

    rows += `
        <tr class="total-row">
            <td><strong>TOTAL</strong></td>
            <td><strong>${totalCantidad}</strong></td>
            <td><strong>${totalVolumen.toFixed(3)}</strong></td>
        </tr>`;

    const tablaHTML = `
        <style>
            #detalleTabla {
                font-size: 13px;
                width: 100%;
                border-collapse: collapse;
            }
            #detalleTabla thead th {
                background-color: #f2f2f2;
                border-bottom: 2px solid #ccc;
                padding: 6px;
                text-align: center;
            }
            #detalleTabla td {
                padding: 5px;
                text-align: center;
                border-top: 1px solid #eee;
            }
            #detalleTabla tr:nth-child(even) {
                background-color: #fafafa;
            }
            .total-row td {
                background-color: #e9ecef;
                font-weight: bold;
            }
        </style>

        <table id="detalleTabla">
            <thead>
                <tr>
                    <th>Diámetro</th>
                    <th>Cantidad</th>
                    <th>Volumen (m³)</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>`;

    Swal.fire({
        title: `<i class="fas fa-list-alt"></i> Detalle del Ingreso #${correlativo}`,
        html: tablaHTML,
        width: '700px',
        confirmButtonColor: '#007BFF',
        confirmButtonText: 'Cerrar'
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    cargarMovimientos();

    // Configurar botón actualizar
    const btnActualizar = document.getElementById('btn-actualizar');
    if (btnActualizar) {
        btnActualizar.addEventListener('click', function () {
            const textoOriginal = this.innerHTML;
            this.innerHTML = '<div class="loading-spinner"></div> Actualizando...';
            this.disabled = true;

            setTimeout(() => {
                cargarMovimientos().finally(() => {
                    this.innerHTML = textoOriginal;
                    this.disabled = false;
                });
            }, 500);
        });
    }

    window.addEventListener('resize', () => {
        cargarMovimientos();
    });
});

// Manejo de errores global
window.addEventListener('error', function (event) {
    console.error('Error global:', event.error);
});

// Función para limpiar recursos al salir
window.addEventListener('beforeunload', function () {
    if (tablaMovimientos) {
        tablaMovimientos.destroy();
    }
});