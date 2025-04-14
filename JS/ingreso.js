document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("txtCodigoProveedor").value = sessionStorage.getItem("codigoProveedor") || "";
    document.getElementById("txtNombreContrato").value = sessionStorage.getItem("nombreContrato") || "";
    document.getElementById("txtNombreVenta").value = sessionStorage.getItem("nombreVenta") || "";
    document.getElementById("txtOC").value = sessionStorage.getItem("oc") || "";
    document.getElementById("txtFechaRecepcion").value = sessionStorage.getItem("fecha") || "";
    document.getElementById("txtProducto").value = sessionStorage.getItem("producto") || "";
    document.getElementById("txtFSC").value = sessionStorage.getItem("fsc") || "";
    document.getElementById("txtDestino").value = sessionStorage.getItem("destino") || "";
    document.getElementById("txtPila").value = sessionStorage.getItem("pila") || "";
    document.getElementById("txtPredio").value = sessionStorage.getItem("predio") || "";
    document.getElementById("txtRol").value = sessionStorage.getItem("rol") || "";
    document.getElementById("txtComuna").value = sessionStorage.getItem("comuna") || "";
    document.getElementById("txtRodal").value = sessionStorage.getItem("rodal") || "";

    sessionStorage.removeItem("totalTroncos");

    const btn = document.getElementById("btnIrContar");
    btn.addEventListener("click", function () {
        const campos = [
            "txtCodigoProveedor",
            "txtNombreContrato",
            "txtNombreVenta",
            "txtOC",
            "txtFechaRecepcion",
            "txtProducto",
            "txtFSC",
            "txtDestino",
            "txtPila",
            "txtPredio",
            "txtRol",
            "txtComuna",
            "txtRodal"
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

        sessionStorage.setItem("codigoProveedor", document.getElementById("txtCodigoProveedor").value);
        sessionStorage.setItem("nombreContrato", document.getElementById("txtNombreContrato").value);
        sessionStorage.setItem("nombreVenta", document.getElementById("txtNombreVenta").value);
        sessionStorage.setItem("oc", document.getElementById("txtOC").value);
        sessionStorage.setItem("fecha", document.getElementById("txtFechaRecepcion").value);
        sessionStorage.setItem("producto", document.getElementById("txtProducto").value);
        sessionStorage.setItem("fsc", document.getElementById("txtFSC").value);
        sessionStorage.setItem("destino", document.getElementById("txtDestino").value);
        sessionStorage.setItem("pila", document.getElementById("txtPila").value);
        sessionStorage.setItem("predio", document.getElementById("txtPredio").value);
        sessionStorage.setItem("rol", document.getElementById("txtRol").value);
        sessionStorage.setItem("comuna", document.getElementById("txtComuna").value);
        sessionStorage.setItem("rodal", document.getElementById("txtRodal").value);

        window.location.href = "contartrozos.aspx";
    });
});