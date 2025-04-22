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
    actualizarTotales();
}

function calcularVolumen(diametro) {
    return (diametro * diametro * 3.2) / 10000;
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

    for (let i = 16; i <= 60; i += 2) {
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

    for (let i = 16; i <= 60; i += 2) {
        const b = document.getElementById(`btn-${i}`);
        if (b) b.classList.remove("borde-rojo");
    }
}

function resetearContadores(event) {
    event.preventDefault();
    contadorTotal = 0;
    volumenTotal = 0;

    document.querySelectorAll("button[id^='btn-']").forEach(btn => {
        const d = btn.id.split('-')[1];
        btn.dataset.count = 0;
        btn.innerText = `Diámetro ${d} | Contador: 0`;
    });

    actualizarTotales();
}

function irAlResumen(event) {
    event.preventDefault();

    const cantidadBancos = parseInt(localStorage.getItem("cantidadBancos") || 1);
    let bancoActual = parseInt(localStorage.getItem("bancoActual") || 1);

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

    const datosActuales = {
        banco: bancoActual,
        total,
        volumen,
        contadores
    };

    let datosBancos = JSON.parse(localStorage.getItem("datosBancos")) || [];
    datosBancos = datosBancos.filter(b => b.banco !== bancoActual);
    datosBancos.push(datosActuales);
    datosBancos.sort((a, b) => a.banco - b.banco);

    localStorage.setItem("datosBancos", JSON.stringify(datosBancos));

    if (bancoActual < cantidadBancos) {
        localStorage.setItem("bancoActual", bancoActual + 1);
        window.location.href = "contartrozos.aspx";
    } else {
        window.location.href = "resumen.aspx";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const bancoActual = parseInt(localStorage.getItem("bancoActual") || 1);
    const cantidadBancos = parseInt(localStorage.getItem("cantidadBancos") || 1);
    const bancoInfo = document.getElementById("banco-info");
    if (bancoInfo) {
        bancoInfo.innerText = `Banco ${bancoActual} de ${cantidadBancos}`;
    }

    const datosBancos = JSON.parse(localStorage.getItem("datosBancos") || "[]");
    const datos = datosBancos.find(d => d.banco === bancoActual);

    if (datos) {
        Object.entries(datos.contadores).forEach(([diametro, cantidad]) => {
            const btn = document.getElementById(`btn-${diametro}`);
            if (btn) {
                btn.setAttribute("data-count", cantidad);
                btn.textContent = `Diámetro ${diametro} | Contador: ${cantidad}`;
            }
        });

        contadorTotal = datos.total || 0;
        volumenTotal = datos.volumen || 0;
        actualizarTotales();
        actualizarTextoBotones();
    }
});

function actualizarTextoBotones() {
    const btnVolver = document.querySelector(".btnVolver");
    const btnSiguiente = document.getElementById("btnSiguiente");

    const bancoActual = parseInt(localStorage.getItem("bancoActual") || 1);
    const cantidadBancos = parseInt(localStorage.getItem("cantidadBancos") || 1);

    if (btnVolver) {
        btnVolver.textContent = bancoActual === 1 ? "← Volver a ingreso" : "← Volver al banco anterior";
        btnVolver.onclick = function () {
            if (bancoActual === 1) {
                window.location.href = "ingreso.aspx";
            } else {
                localStorage.setItem("bancoActual", bancoActual - 1);
                window.location.href = "contartrozos.aspx";
            }
        };
    }

    if (btnSiguiente) {
        btnSiguiente.textContent = bancoActual === cantidadBancos ? "Ir a resumen" : "Siguiente banco";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    actualizarTextoBotones();
});