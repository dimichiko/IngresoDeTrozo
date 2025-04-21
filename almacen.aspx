<%@ Page Language="VB" AutoEventWireup="false" CodeBehind="almacen.aspx.vb" Inherits="Ingresodetrozo.almacen" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Almacén</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="CSS/almacen.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="Content/favicon.ico" type="image/x-icon" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="contenedor-almacen">
            <div class="header-almacen">
                <img src="Content/LOGO_ALTO_HORIZONTE-SIN-FONDO.png" alt="Logo Empresa" />
                <div class="boton-salida">
                    <button type="button" onclick="window.location.href='inicio.aspx'">Volver</button>
                </div>
            </div>

            <div class="contenido-almacen">
                <h1>Sección Almacén</h1>
            </div>
        </div>
    </form>
</body>
</html>