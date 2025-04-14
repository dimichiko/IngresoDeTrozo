$(document).ready(function () {
    var resultado = Obtener_Parametros("Empresa");

    $.each(resultado, function (i, val) {
        $("#select_prueba").append('<option value=' + val.cod_empresa + '>' + val.nom_empresa + '</option>');
    });
});