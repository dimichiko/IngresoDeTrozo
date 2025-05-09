function CargarLista(result, objetolista) {


    if (objetolista == "txtFSC") {
        $.each(result, function (i, val) {
            $("#" + objetolista).append('<option value=' + val.cod_fsc + '>' + val.nom_fsc + '</option>');

        });
    }

    if (objetolista == "txtDestino") {
        $.each(result, function (i, val) {
            $("#" + objetolista).append('<option value=' + val.cod_empresa + '>' + val.nom_empresa + '</option>');

        });
    }

    if (objetolista == "LargoTroncos") {
        $.each(result, function (i, val) {
            $("#" + objetolista).append('<option value=' + val.cod_lt + '>' + val.nom_lt + '</option>');

        });
    }

}