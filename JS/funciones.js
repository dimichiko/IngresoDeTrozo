function CargarLista(result, objetolista) {



    if (objetolista == "empresa_dashboard" || objetolista == "empresa_abast" || objetolista == "empresa_ciclo" || objetolista == "empresa_ciclo_ht"
        || objetolista == "empresa_oper" || objetolista == "empresa_liqf" || objetolista == "empresa_rep" || objetolista == "empresa_inf_aserr"
        || objetolista == "empresa_imp" || objetolista == "empresa_rid" || objetolista == "empresa_cotejo" || objetolista == "empresa_af" || objetolista == "empresa_dep"
        || objetolista == "empresa_dist_doc" || objetolista == "empresa_usu_docs" || objetolista == "empresa_usu_docs_hist") {
        $.each(result, function (i, val) {
            $("#" + objetolista).append('<option value=' + val.cod_empresa + '>' + val.nom_empresa + '</option>');
            //$("#empresa_abast").append('<option value=' + val.cod_empresa + '>' + val.nom_empresa + '</option>');
            //console.log(val.cod_ano);
            //console.log(val.nom_ano);
        });
    }

    if (objetolista == "ano_dashboard" || objetolista == "ano_abast" || objetolista == "ano_ciclo" || objetolista == "ano_exportar" || objetolista == "ano_forestal"
        || objetolista == "ano_oper" || objetolista == "ano_contab" || objetolista == "ano_liqf" || objetolista == "ano_rep" || objetolista == "ano_consulta"
        || objetolista == "ano_cierre" || objetolista == "ano_control_ped" || objetolista == "ano_actualiza" || objetolista == "ano_imp" || objetolista == "ano_avcompra"
        || objetolista == "ano_dist_doc" || objetolista == "ano_usu_docs" || objetolista == "ano_usu_docs_hist") {
        $.each(result, function (i, val) {
            $("#" + objetolista).append('<option value=' + val.cod_ano + '>' + val.nom_ano + '</option>');
            //console.log(val.cod_ano);
            //console.log(val.nom_ano);
        });
    }

    if (objetolista == "mes_dashboard" || objetolista == "mes_abast" || objetolista == "mes_ciclo" || objetolista == "mes_exportar" || objetolista == "mes_forestal"
        || objetolista == "mes_oper" || objetolista == "mes_contab" || objetolista == "mes_liqf" || objetolista == "mes_rep" || objetolista == "mes_consulta"
        || objetolista == "mes_cierre" || objetolista == "mes_control_ped" || objetolista == "mes_actualiza" || objetolista == "mes_imp" || objetolista == "mes_avcompra"
        || objetolista == "mes_dist_doc" || objetolista == "mes_usu_docs" || objetolista == "mes_usu_docs_hist") {
        $.each(result, function (i, val) {
            $("#" + objetolista).append('<option value=' + val.cod_mes + '>' + val.nom_mes + '</option>');
            //console.log(val.cod_ano);
            //console.log(val.nom_ano);
        });
    }


   

}