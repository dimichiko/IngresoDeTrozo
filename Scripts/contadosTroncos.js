// Inicializar variables globales
let contadorTotal = 0;
let volumenTotal = 0;
let modoResta = false; // Flag para determinar si el siguiente clic debe restar

// Recuperar datos de localStorage al cargar la página
const datosResumen = JSON.parse(localStorage.getItem('datosResumen')) || {
    total: 0,
    volumen: 0,
    contadores: {}
};

// Inicializar contadorTotal y volumenTotal con los datos de localStorage
contadorTotal = datosResumen.total;
volumenTotal = datosResumen.volumen;

// Función para manejar clics en los botones de diámetro
function manejarClick(id, event) {
    event.preventDefault();
    const btn = document.getElementById(id);
    let count = parseInt(btn.dataset.count || 0);
    const diametro = parseInt(id.split('-')[1]);

    if (!diametro) {
        console.error(`El ID del botón es inválido: ${id}`);
        return;
    }

    if (modoResta) {
        // Modo resta: disminuir el contador y actualizar totales
        if (count > 0) {
            count--;
            contadorTotal--;
            volumenTotal -= calcularVolumen(diametro);
        } else {
            alert(`El contador para el diámetro ${diametro} ya está en 0.`);
        }
        modoResta = false; // Desactivar el modo resta después de un uso
    } else {
        // Modo normal: incrementar el contador y actualizar totales
        count++;
        contadorTotal++;
        volumenTotal += calcularVolumen(diametro);
    }

    // Actualizar el botón
    btn.dataset.count = count;
    btn.innerText = `Diámetro ${diametro} | Contador: ${count}`;

    // Guardar los datos en localStorage
    guardarDatosEnLocalStorage();
    actualizarTotales();
}

// Función para calcular el volumen de un tronco
function calcularVolumen(diametro) {
    return Math.PI * Math.pow(diametro / 2, 2) * 1; // Volumen de un cilindro con altura 1
}

// Función para guardar los datos en localStorage
function guardarDatosEnLocalStorage() {
    const botones = document.querySelectorAll('.grid-container button');
    const datosResumen = {
        total: contadorTotal,
        volumen: volumenTotal,
        contadores: {}
    };

    // Guardar los contadores por diámetro
    botones.forEach((btn) => {
        const diametro = btn.id.split('-')[1];
        const count = parseInt(btn.dataset.count || 0);
        datosResumen.contadores[diametro] = count;
    });

    // Guardar el objeto completo en localStorage
    localStorage.setItem('datosResumen', JSON.stringify(datosResumen));
}

// Función para actualizar los totales en la interfaz
function actualizarTotales() {
    const totalDisplay = document.querySelectorAll('[id^="total-display"]');
    totalDisplay.forEach((display) => {
        display.innerText = `Total: ${contadorTotal}`;
    });

    const volumenDisplay = document.querySelectorAll('[id^="volumen-display"]');
    volumenDisplay.forEach((display) => {
        display.innerText = `Volumen Total: ${volumenTotal.toFixed(2)}`;
    });
}

// Función para activar el modo resta
function activarModoResta(event) {
    event.preventDefault();
    modoResta = true; // Activar el flag para restar en el siguiente clic
    alert('Modo resta activado. El siguiente botón presionado restará.');
}

// Función para resetear los contadores
function resetearContadores(event) {
    event.preventDefault();
    contadorTotal = 0;
    volumenTotal = 0;

    const botones = document.querySelectorAll('.grid-container button');
    botones.forEach((btn) => {
        btn.dataset.count = 0;
        const diametro = btn.id.split('-')[1];
        btn.innerText = `Diámetro ${diametro} | Contador: 0`;
    });

    guardarDatosEnLocalStorage();
    actualizarTotales();
}

// Función para redirigir al resumen
function irAlResumen(event) {
    event.preventDefault();
    window.location.href = 'Resumen.aspx';
}

// Inicializar la interfaz con los datos de localStorage
document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.grid-container button');

    // Cargar los valores de los botones desde localStorage
    botones.forEach((btn) => {
        const diametro = btn.id.split('-')[1];
        const count = datosResumen.contadores[diametro] || 0;
        btn.dataset.count = count;
        btn.innerText = `Diámetro ${diametro} | Contador: ${count}`;
    });

    // Actualizar los totales en la interfaz
    actualizarTotales();
});