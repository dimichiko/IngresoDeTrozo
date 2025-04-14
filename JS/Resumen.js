window.onload = function () {
    const datosResumen = JSON.parse(localStorage.getItem('datosResumen'));
    if (!datosResumen) {
        alert('No hay datos disponibles.');
        window.location.href = 'contartrozos.aspx';
        return;
    }

    window.totalOriginal = datosResumen.total;
    window.volumenOriginal = datosResumen.volumen;

    cargarTablaResumen(datosResumen.contadores);
    mostrarResumen(datosResumen);
    agregarInfoEdicion(datosResumen.total);
};

function cargarTablaResumen(contadores) {
    const tabla = document.getElementById('tabla-resumen');
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
    const info = document.createElement('div');
    info.id = 'edicion-info';
    info.style.display = 'none';
    info.innerHTML = `
        <p>Total actual: <span id="total-actual">${total}</span> / 
                         <span id="total-requerido">${total}</span></p>
        <p id="alerta-total"></p>`;
    document.body.appendChild(info);
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
        alert(`El total debe ser ${window.totalOriginal}. Actualmente suman ${totalEditado}.`);
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

    alert('Cambios guardados.');
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
            const path = window.location.pathname.replace(/\/[^\/]*$/, '/contartrozos.aspx');
            window.location.href = path;
        }
    });
}

