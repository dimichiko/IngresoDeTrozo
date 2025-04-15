let contadorTotal = 0;
let volumenTotal = 0;
let modoResta = false;

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
    return (diametro * diametro * 3.2) / 10000;
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

    const btn1 = document.getElementById("Resta-1");
    const btn2 = document.getElementById("Resta-2");

    if (btn1) btn1.innerText = modoResta ? "Modo Resta Activado" : "Activar Modo Resta";
    if (btn2) btn2.innerText = modoResta ? "Modo Resta Activado" : "Activar Modo Resta";

    for (let i = 16; i <= 54; i += 2) {
        const b = document.getElementById(`btn-${i}`);
        if (b) b.classList.toggle("borde-rojo", modoResta);
    }
}

function desactivarModoResta() {
    modoResta = false;

    const btn1 = document.getElementById("Resta-1");
    const btn2 = document.getElementById("Resta-2");

    if (btn1) btn1.innerText = "Activar Modo Resta";
    if (btn2) btn2.innerText = "Activar Modo Resta";

    for (let i = 16; i <= 54; i += 2) {
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

    let total = 0;
    let volumen = 0;
    const contadores = {};

    document.querySelectorAll("button[id^='btn-']").forEach(btn => {
        const diametro = btn.id.replace("btn-", "");
        const cantidad = parseInt(btn.getAttribute("data-count")) || 0;

        if (cantidad > 0) {
            contadores[diametro] = cantidad;
            total += cantidad;
            volumen += calcularVolumen(parseInt(diametro)) * cantidad;
        }
    });

    const datosResumen = {
        total,
        volumen,
        contadores
    };

    localStorage.setItem("datosResumen", JSON.stringify(datosResumen));

    window.location.href = "resumen.aspx";
}

document.addEventListener("DOMContentLoaded", function () {
    const datosGuardados = JSON.parse(localStorage.getItem("datosResumen"));
    if (datosGuardados && datosGuardados.contadores) {
        Object.entries(datosGuardados.contadores).forEach(([diametro, cantidad]) => {
            const btn = document.getElementById(`btn-${diametro}`);
            if (btn) {
                btn.setAttribute("data-count", cantidad);
                btn.textContent = `Diámetro ${diametro} (${cantidad})`;
            }
        });

        const total = datosGuardados.total || 0;
        const volumen = datosGuardados.volumen || 0;

        document.getElementById("total-display-1").textContent = `Total: ${total}`;
        document.getElementById("total-display-2").textContent = `Total: ${total}`;
        document.getElementById("volumen-display-1").textContent = `Volumen Total: ${volumen.toFixed(2)}`;
        document.getElementById("volumen-display-2").textContent = `Volumen Total: ${volumen.toFixed(2)}`;
    }
});

function moverSlider(direccion) {
    const container = document.querySelector(".slider-container");
    const ancho = container.clientWidth;
    container.scrollLeft += direccion * ancho;
}