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
        const datos = Obtener_Ingreso_Trozo(0);
        const item = datos?.DS?.[0];

        if (!item) {
            mostrarMensajeSinDatos(container);
            return;
        }

        // Poblar tabla
        poblarTabla(item);

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
    const tabla = document.createElement('table');
    tabla.id = 'tabla-movimientos';
    tabla.style.width = '100%';
    tabla.style.borderCollapse = 'collapse';
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>Correlativo</th>
                <th>GDE</th>
                <th>Fecha</th>
                <th>Proveedor</th>
                <th>Volumen (m³)</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody id="tbody-movimientos"></tbody>
    `;
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
            <button class="btn-detalle" onclick="verDetalle(${item.Correlativo})" 
                    title="Ver detalles del ingreso">
                <i class="fas fa-eye"></i> Ver detalle
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
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        responsive: true,
        dom: 'frtip'
    });

    // Ocultar paginación si hay pocos registros
    if (tablaMovimientos.data().count() <= 10) {
        $('.dataTables_paginate').hide();
    }
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
window.verDetalle = function (correlativo) {
    if (!correlativo) {
        mostrarError('Correlativo no válido.');
        return;
    }

    // Mostrar loading en el botón
    const btn = event.target.closest('button');
    const textoOriginal = btn.innerHTML;
    btn.innerHTML = '<div class="loading-spinner"></div>';
    btn.disabled = true;

    try {
        const resultado = Obtener_Ingreso_Trozo_Det(correlativo);
        const detalle = resultado?.DS;

        if (!Array.isArray(detalle) || detalle.length === 0) {
            throw new Error("No se encontró información de detalle para este ingreso.");
        }

        mostrarModalDetalle(correlativo, detalle);

    } catch (error) {
        console.error('Error al obtener detalle:', error);
        mostrarError(error.message || 'No se pudo obtener el detalle del ingreso.');
    } finally {
        // Restaurar botón
        btn.innerHTML = textoOriginal;
        btn.disabled = false;
    }
};

function mostrarModalDetalle(correlativo, detalle) {
    let contenido = `
        <div style="overflow-x: auto;">
            <table style="width:100%; text-align:left; border-collapse: collapse; margin-top: 1rem;">
                <thead>
                    <tr style="background:#f8f9fa; border-bottom: 2px solid #dee2e6;">
                        <th style="padding: 12px; border: 1px solid #dee2e6;">Diámetro</th>
                        <th style="padding: 12px; border: 1px solid #dee2e6;">Cantidad</th>
                        <th style="padding: 12px; border: 1px solid #dee2e6;">Volumen (m³)</th>
                    </tr>
                </thead>
                <tbody>`;

    let totalVolumen = 0;
    let totalCantidad = 0;

    for (const item of detalle) {
        const volumen = Number(item.Volumen) || 0;
        const cantidad = Number(item.Cantidad) || 0;

        totalVolumen += volumen;
        totalCantidad += cantidad;

        contenido += `
            <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px; border: 1px solid #dee2e6;">${item.Diametro || '-'}</td>
                <td style="padding: 10px; border: 1px solid #dee2e6; text-align: center;">${cantidad}</td>
                <td style="padding: 10px; border: 1px solid #dee2e6; text-align: right;">${volumen.toFixed(3)}</td>
            </tr>`;
    }

    // Agregar fila de totales
    contenido += `
            <tr style="background:#e9ecef; font-weight: bold; border-top: 2px solid #dee2e6;">
                <td style="padding: 12px; border: 1px solid #dee2e6;">TOTAL</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">${totalCantidad}</td>
                <td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">${totalVolumen.toFixed(3)}</td>
            </tr>
        </tbody>
    </table>
    </div>`;

    Swal.fire({
        title: `<i class="fas fa-list-alt"></i> Detalle del Ingreso #${correlativo}`,
        html: contenido,
        width: '700px',
        confirmButtonColor: '#007BFF',
        confirmButtonText: 'Cerrar',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
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