function CargarLista(result, objetolista) {


    if (objetolista == "txtFSC") {
        $.each(result, function (i, val) {
            $("#" + objetolista).append('<option value=' + val.cod_fsc + '>' + val.nom_fsc + '</option>');

        });
    }

}