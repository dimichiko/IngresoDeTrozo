<%@ Page Language="VB" AutoEventWireup="false" CodeFile="inicio.aspx.vb" Inherits="inicio" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Inicio</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="CSS/inicio.css" rel="stylesheet" type="text/css" />
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="contenedor-inicio">
            <div class="header-inicio">
    <img src="Content/LOGO_ALTO_HORIZONTE-SIN-FONDO.png" alt="Logo Empresa" />
    <div class="boton-salida">
        <button type="button" onclick="window.location.href='login.aspx'">Salir</button>
    </div>
</div>

            <div class="botones-inicio">
                <button type="button" onclick="window.location.href='ingreso.aspx'">Ingreso de Trozos</button>
                <button type="button" onclick="window.location.href='almacen.aspx'">Almacén</button>
            </div>
        </div>
    </form>

    <script src="JS/inicio.js"></script>
</body>
</html>