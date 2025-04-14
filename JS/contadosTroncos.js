let contadorTotal = 0;
let volumenTotal = 0;
let modoResta = false;

const datosGuardados = JSON.parse(localStorage.getItem('datosResumen')) || {
    total: 0,
    volumen: 0,
    contadores: {}
};

contadorTotal = datosGuardados.total;
volumenTotal = datosGuardados.volumen;

function manejarClick(id, event) {
    event.preventDefault();
    const btn = document.getElementById(id);
    const diametro = parseInt(id.split('-')[1]);
    let count = parseInt(btn.dataset.count || 0);
    if (!diametro) return;

    if (modoResta) {
        if (count > 0) {
            count--;
            contadorTotal--;
            volumenTotal -= calcularVolumen(diametro);
            desactivarModoResta();
        } else {
            Swal.fire("Correción", "El contador ya está en 0.", "question");
        }
    } else {
        count++;
        contadorTotal++;
        volumenTotal += calcularVolumen(diametro);
    }

    btn.dataset.count = count;
    btn.innerText = `Diámetro ${diametro} | Contador: ${count}`;

    guardarDatosEnLocalStorage();
    actualizarTotales();
}

function calcularVolumen(diametro) {
    return (diametro * diametro) * 3.2 / 10000;
}

function guardarDatosEnLocalStorage() {
    const datos = {
        total: contadorTotal,
        volumen: volumenTotal,
        contadores: {}
    };

    document.querySelectorAll('.grid-container-1 button, .grid-container-2 button')
        .forEach(btn => {
            const d = btn.id.split('-')[1];
            datos.contadores[d] = parseInt(btn.dataset.count || 0);
        });

    localStorage.setItem('datosResumen', JSON.stringify(datos));
}

function actualizarTotales() {
    document.querySelectorAll('[id^="total-display"]').forEach(el =>
        el.innerText = `Total: ${contadorTotal}`);
    document.querySelectorAll('[id^="volumen-display"]').forEach(el =>
        el.innerText = `Volumen Total: ${volumenTotal.toFixed(2)}`);
}

function toggleModoResta(event) {
    event.preventDefault();
    modoResta = !modoResta;
    document.getElementById("Resta-1").innerText = modoResta ? "Modo Resta Activado" : "Activar Modo Resta";

    for (let i = 16; i <= 48; i += 2) {
        const b = document.getElementById(`btn-${i}`);
        if (b) b.classList.toggle("borde-rojo", modoResta);
    }
}

function desactivarModoResta() {
    modoResta = false;
    document.getElementById("Resta-1").innerText = "Activar Modo Resta";
    for (let i = 16; i <= 48; i += 2) {
        const b = document.getElementById(`btn-${i}`);
        if (b) b.classList.remove("borde-rojo");
    }
}

function resetearContadores(event) {
    event.preventDefault();
    contadorTotal = 0;
    volumenTotal = 0;

    document.querySelectorAll('.grid-container-1 button, .grid-container-2 button')
        .forEach(btn => {
            const d = btn.id.split('-')[1];
            btn.dataset.count = 0;
            btn.innerText = `Diámetro ${d} | Contador: 0`;
        });

    guardarDatosEnLocalStorage();
    actualizarTotales();
}

function irAlResumen(event) {
    event.preventDefault();
    window.location.href = 'Resumen.aspx';
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.grid-container-1 button, .grid-container-2 button')
        .forEach(btn => {
            const d = btn.id.split('-')[1];
            const c = datosGuardados.contadores[d] || 0;
            btn.dataset.count = c;
            btn.innerText = `Diámetro ${d} | Contador: ${c}`;
        });

    actualizarTotales();
});