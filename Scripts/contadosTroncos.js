let contadorTotal = 0;
let volumenTotal = 0;
let modoResta = false;

const datosResumen = JSON.parse(localStorage.getItem('datosResumen')) || {
    total: 0,
    volumen: 0,
    contadores: {}
};

contadorTotal = datosResumen.total;
volumenTotal = datosResumen.volumen;

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
      
        if (count > 0) {
            count--;
            contadorTotal--;
            volumenTotal -= calcularVolumen(diametro);
        } else {
            alert(`El contador para el diámetro ${diametro} ya está en 0.`);
        }
        modoResta = false;
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
    return (diametro * diametro)* 3.2 / 10000;
}

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

function activarModoResta(event) {
    event.preventDefault();
    modoResta = true;
}

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

function irAlResumen(event) {
    event.preventDefault();
    window.location.href = 'Resumen.aspx';
}

document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.grid-container button');

    botones.forEach((btn) => {
        const diametro = btn.id.split('-')[1];
        const count = datosResumen.contadores[diametro] || 0;
        btn.dataset.count = count;
        btn.innerText = `Diámetro ${diametro} | Contador: ${count}`;
    });

    actualizarTotales();
});