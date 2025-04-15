const btn = document.getElementById("btnIrContar");

btn.addEventListener("click", function () {
    const campos = [
        "txtCodigoProveedor", "txtNombreContrato", "txtNombreVenta", "txtOC", "txtFechaRecepcion",
        "txtProducto", "txtFSC", "txtDestino", "txtPila", "txtPredio", "txtRol", "txtComuna", "txtRodal",
        "txtDespachador", "txtTransportista", "txtRUTDespachador", "txtConductor",
        "txtRUTConductor", "txtPatenteCamion", "txtPatenteCarro"
    ];

    let incompletos = [];

    campos.forEach(id => {
        const valor = document.getElementById(id).value.trim();
        if (valor === "") incompletos.push(id);
    });

    if (incompletos.length > 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor completa todos los campos antes de continuar.'
        });
        return;
    }

    campos.forEach(id => {
        sessionStorage.setItem(id, document.getElementById(id).value);
    });

    window.location.href = "contartrozos.aspx";
});

$(function () {
    $("#acordeon").accordion({
        heightStyle: "content",
        collapsible: true
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const campos = [
        "txtCodigoProveedor", "txtNombreContrato", "txtNombreVenta", "txtOC", "txtFechaRecepcion",
        "txtProducto", "txtFSC", "txtDestino", "txtPila", "txtPredio", "txtRol", "txtComuna", "txtRodal",
        "txtDespachador", "txtTransportista", "txtRUTDespachador", "txtConductor",
        "txtRUTConductor", "txtPatenteCamion", "txtPatenteCarro"
    ];

    campos.forEach(id => {
        const valorGuardado = sessionStorage.getItem(id);
        if (valorGuardado) {
            const input = document.getElementById(id);
            if (input) input.value = valorGuardado;
        }
    });
});