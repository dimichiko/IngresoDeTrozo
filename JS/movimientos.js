async function cargarMovimientos() {
    const container = document.getElementById('movimientos-container');
    const correlativos = [0]; // solo el correlativo 0
    container.innerHTML = "";

    const tabla = document.createElement('table');
    tabla.style.width = '100%';
    tabla.style.borderCollapse = 'collapse';
    tabla.innerHTML = `
        <thead>
            <tr style="background-color:#005a8d; color:white;">
                <th style="padding:8px; border:1px solid #ccc;">Correlativo</th>
                <th style="padding:8px; border:1px solid #ccc;">GDE</th>
                <th style="padding:8px; border:1px solid #ccc;">Fecha</th>
                <th style="padding:8px; border:1px solid #ccc;">Proveedor</th>
                <th style="padding:8px; border:1px solid #ccc;">Volumen (m³)</th>
                <th style="padding:8px; border:1px solid #ccc;">Acción</th>
            </tr>
        </thead>
        <tbody id="tbody-movimientos"></tbody>
    `;
    container.appendChild(tabla);

    const tbody = document.getElementById('tbody-movimientos');
    const datos = Obtener_Ingreso_Trozo(0);
    const item = datos?.DS?.[0];

    if (!item) {
        Swal.fire({
            icon: 'info',
            title: 'Sin datos',
            text: 'No se encontró información del ingreso.',
            confirmButtonColor: '#007BFF'
        });
        return;
    }

    const row = document.createElement('tr');
    row.innerHTML = `
        <td style="padding:8px; border:1px solid #ccc;">${item.Correlativo}</td>
        <td style="padding:8px; border:1px solid #ccc;">${item.GDE || '-'}</td>
        <td style="padding:8px; border:1px solid #ccc;">${item.FechaRecep?.split('T')[0] || '-'}</td>
        <td style="padding:8px; border:1px solid #ccc;">${item.CodProv || '-'}</td>
        <td style="padding:8px; border:1px solid #ccc;">${item.TotVolM3?.toFixed(3) || '-'}</td>
        <td style="padding:8px; border:1px solid #ccc;">
            <button style="background-color:green;color:white;padding:4px 8px;border:none;border-radius:4px;cursor:pointer;"
                onclick="verDetalle(${item.Correlativo})">
                Ver detalle
            </button>
        </td>
    `;
    tbody.appendChild(row);
}

// Expone verDetalle al ámbito global
window.verDetalle = function (correlativo) {
    try {
        const resultado = Obtener_Ingreso_Trozo_Det(correlativo);
        const detalle = resultado?.DS;

        if (!Array.isArray(detalle) || detalle.length === 0) {
            throw new Error("No se encontró información de detalle.");
        }

        let contenido = '<table style="width:100%; text-align:left; border-collapse: collapse;">';
        contenido += `
            <thead><tr style="background:#f0f0f0;">
                <th>Diámetro</th>
                <th>Cantidad</th>
                <th>Volumen (m³)</th>
            </tr></thead><tbody>`;

        for (const item of detalle) {
            contenido += `
                <tr>
                    <td>${item.Diametro}</td>
                    <td>${item.Cantidad}</td>
                    <td>${item.Volumen?.toFixed(3) || '0.000'}</td>
                </tr>`;
        }

        contenido += '</tbody></table>';

        Swal.fire({
            title: `Detalle del Ingreso #${correlativo}`,
            html: contenido,
            width: '600px',
            confirmButtonColor: '#007BFF'
        });
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error de carga',
            text: err.message || 'No se pudo obtener el detalle.',
            confirmButtonColor: '#d33'
        });
    }
};

document.addEventListener('DOMContentLoaded', cargarMovimientos);