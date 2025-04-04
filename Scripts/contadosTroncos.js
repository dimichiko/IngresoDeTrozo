let modoResta = false;

function activarModoResta(event) {
    event.preventDefault();
    modoResta = true;
}

function manejarClick(id, event) {
    event.preventDefault();
    const btn = document.getElementById(id);
    let count = parseInt(btn.dataset.count);

    if (modoResta) {
        if (count > 0) count--;
        modoResta = false;
    } else {
        count++;
    }

    btn.dataset.count = count;
    const diametro = id.split('-')[1];
    btn.innerText = `Diámetro ${diametro} | Contador: ${count}`;
    localStorage.setItem(id, count);
}