let modoResta = false;
let contadorTotal = 0;
let volumenTotal = 0;

function activarModoResta(event) {
    event.preventDefault();
    modoResta = true;
}

function manejarClick(id, event) {
    event.preventDefault();
    const btn = document.getElementById(id);
    let count = parseInt(btn.dataset.count);
    const diametro = parseInt(id.split('-')[1]);

    if (modoResta) {
        if (count > 0) {
            count--;
            contadorTotal--;
            volumenTotal -= calcularVolumen(diametro);
        }
        modoResta = false;
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
    return Math.PI * Math.pow(diametro / 2, 2) * 1;
}

function actualizarTotales() {
    const totalDisplay = document.getElementById('total-display');
    if (totalDisplay) {
        totalDisplay.innerText = `Total: ${contadorTotal}`;
    }

    const volumenDisplay = document.getElementById('volumen-display');
    if (volumenDisplay) {
        volumenDisplay.innerText = `Volumen Total: ${volumenTotal.toFixed(2)}`;
    }
}