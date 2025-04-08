window.onload = function () {
    const datosResumen = JSON.parse(localStorage.getItem('datosResumen'));
    if (!datosResumen) {
        alert('No hay datos disponibles.');
        window.location.href = 'contartrozos.aspx';
        return;
    }

    // Almacenar el total original para referencia
    window.totalOriginal = datosResumen.total;
    window.volumenOriginal = datosResumen.volumen;

    const tablaResumen = document.getElementById('tabla-resumen');
    for (const [diametro, contador] of Object.entries(datosResumen.contadores)) {
        if (contador > 0) {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${diametro}</td>
                <td>
                    <input type="number" class="contador-input" id="input-${diametro}" 
                           value="${contador}" min="0" data-diametro="${diametro}" 
                           data-valor-original="${contador}" disabled />
                </td>
            `;
            tablaResumen.appendChild(fila);
        }
    }

    // Añadir elementos para la visualización del total actual durante la edición
    const infoEdicion = document.createElement('div');
    infoEdicion.id = 'edicion-info';
    infoEdicion.style.display = 'none'; // Oculto por defecto
    infoEdicion.innerHTML = `
        <p>Total actual: <span id="total-actual">${datosResumen.total}</span> / 
                          <span id="total-requerido">${datosResumen.total}</span></p>
        <p id="alerta-total"></p>
    `;
    document.body.appendChild(infoEdicion);

    document.getElementById('total-troncos').innerText = `Total de Troncos: ${datosResumen.total}`;
    document.getElementById('volumen-total').innerText = `Volumen Total: ${datosResumen.volumen.toFixed(2)}`;
};

function habilitarEdicion() {
    const inputs = document.querySelectorAll('.contador-input');
    inputs.forEach(input => {
        input.disabled = false;
        // Agregar evento para validar en tiempo real
        input.addEventListener('input', validarTotal);
    });

    // Mostrar información de edición
    document.getElementById('edicion-info').style.display = 'block';

    // Mostrar mensaje informativo al usuario
    alert('Puede editar los contadores. Recuerde que el total de troncos debe mantenerse en ' + window.totalOriginal);
}

function validarTotal() {
    const inputs = document.querySelectorAll('.contador-input');
    let totalActual = 0;

    inputs.forEach(input => {
        const valor = parseInt(input.value) || 0;
        if (valor < 0) input.value = 0;
        totalActual += parseInt(input.value) || 0;
    });

    // Actualizar contador visual
    document.getElementById('total-actual').innerText = totalActual;

    // Mostrar visualmente si el total es correcto
    const diferencia = totalActual - window.totalOriginal;
    if (diferencia !== 0) {
        document.getElementById('alerta-total').innerText =
            `Diferencia: ${diferencia} (${diferencia > 0 ? 'sobran' : 'faltan'} troncos)`;
        document.getElementById('alerta-total').style.color = 'red';
    } else {
        document.getElementById('alerta-total').innerText = 'Total correcto';
        document.getElementById('alerta-total').style.color = 'green';
    }
}

function guardarCambios() {
    const datosResumen = JSON.parse(localStorage.getItem('datosResumen'));
    const inputs = document.querySelectorAll('.contador-input');
    let totalContadoresEditados = 0;
    const nuevosContadores = {};

    inputs.forEach(input => {
        const diametro = input.dataset.diametro;
        const nuevoValor = parseInt(input.value) || 0;

        if (nuevoValor < 0) {
            alert(`El contador para el diámetro ${diametro} no puede ser menor que 0.`);
            return;
        }

        totalContadoresEditados += nuevoValor;
        nuevosContadores[diametro] = nuevoValor;
    });

    // Verificar que el total no ha cambiado
    if (totalContadoresEditados !== window.totalOriginal) {
        alert(`Error: el total de troncos debe ser exactamente ${window.totalOriginal}. Actualmente suman ${totalContadoresEditados}.`);
        return;
    }

    // Guardar los nuevos contadores pero mantener el total original
    datosResumen.contadores = nuevosContadores;
    datosResumen.total = window.totalOriginal; // Asegurar que el total sigue siendo el mismo

    // Recalcular el volumen total
    let nuevoVolumen = 0;
    for (const [diametro, contador] of Object.entries(nuevosContadores)) {
        if (contador > 0) {
            // Usar la misma función de cálculo que en el contador original
            nuevoVolumen += calcularVolumen(parseInt(diametro)) * contador;
        }
    }

    // Actualizar el volumen en los datos
    datosResumen.volumen = nuevoVolumen;

    // Guardar en localStorage
    localStorage.setItem('datosResumen', JSON.stringify(datosResumen));

    // Actualizar la interfaz
    document.getElementById('total-troncos').innerText = `Total de Troncos: ${window.totalOriginal}`;
    document.getElementById('volumen-total').innerText = `Volumen Total: ${nuevoVolumen.toFixed(2)}`;

    // Ocultar la información de edición
    document.getElementById('edicion-info').style.display = 'none';

    // Deshabilitar la edición
    inputs.forEach(input => {
        input.disabled = true;
        input.removeEventListener('input', validarTotal);
    });

    alert('Cambios guardados correctamente.');
}

// Función para calcular el volumen de un tronco (igual que en contadosTroncos.js)
function calcularVolumen(diametro) {
    return Math.PI * Math.pow(diametro / 2, 2) * 1; // Volumen de un cilindro con altura 1
}

function volverAlFormulario() {
    // Intentar diferentes métodos de redirección
    try {
        window.location.href = 'contartrozos.aspx';
    } catch (e) {
        console.error("Error al redirigir usando href:", e);
        try {
            window.location = 'contartrozos.aspx';
        } catch (e2) {
            console.error("Error al redirigir usando location=:", e2);
            try {
                // Intentar con una ruta absoluta
                const baseUrl = window.location.origin;
                window.location.href = `${baseUrl}/contartrozos.aspx`;
            } catch (e3) {
                alert("Error al redirigir. Por favor, intente volver manualmente.");
            }
        }
    }
}