<%@ Page Language="VB" AutoEventWireup="true" CodeBehind="movimientos.aspx.vb" Inherits="Ingresodetrozo.movimientos" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head runat="server">
    <title>Últimos Movimientos</title>
    <meta charset="utf-8" />
    <link href="CSS/movimientos.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

</head>
<body>
    <form id="form1" runat="server">
        <div class="contenedor-movimientos">
            <header class="header-movimientos">
                <img src="Content/LOGO_ALTO_HORIZONTE-SIN-FONDO.png" alt="Logo Alto Horizonte" class="logo-movimientos" />

                <h1 class="titulo-movimientos">Últimos movimientos</h1>

                <div class="boton-volver">
                    <button type="button" onclick="window.location.href='inicio.aspx'">
                        <i class="fas fa-arrow-left"></i>Volver
       
                    </button>
                </div>
            </header>
        </div>
        <div style="text-align: center; margin-bottom: 1rem;">
            <button id="btn-actualizar" class="btn-volver" type="button">
                🔄 Actualizar
   
            </button>
        </div>
        <div id="movimientos-container"></div>
    </form>
    <div id="version-info" class="version-info"></div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://portal.altohorizonte.cl/js/comun_prod.js"></script>
    <script src="JS/version-utils.js"></script>
    <script src="JS/movimientos.js"></script>
</body>
</html>
