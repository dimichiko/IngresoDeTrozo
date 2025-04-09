function Obtener_Parametros(tabla) {
    var params = new Object();
    var salida;
    var i = 0;
    //params = null;
    params = "{ strTabla: '" + tabla + "'}";
    $.ajax({
        type: "POST",                                              // tipo de request que estamos generando
        url: 'https://portal.altohorizonte.cl/WS/WS_Parametros_JSON.asmx/WS_Obtener_Parametros_JSON',                    // URL al que vamos a hacer el pedido

        data: params,                                                // data es un arreglo JSON que contiene los parámetros que
        // van a ser recibidos por la función del servidor
        contentType: "application/json; charset=utf-8",            // tipo de contenido
        dataType: "json",                                          // formato de transmición de datos
        async: false,                                               // si es asincrónico o no
        success: function (resultado, status) {                            // función que va a ejecutar si el pedido fue exitoso



            salida = JSON.parse(resultado.d);

            //var jsonData = salida.DS;

            //var categoria = [];
            //var data = [];


            //jsonData.forEach(function (e) {
            //    categoria.push(e.diametro);
            //    data.push(e.Cantidad);
            //});

            //var chart = c3.generate({
            //    bindto: grafico_tema, // id of chart wrapper
            //    data: {
            //        json: [data],
            //        keys: {
            //            value: proveedor,
            //        },
            //        type: 'pie',

            //    },

            //});



        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            alert(error.Message);
        }
    });

    return (salida);
}