<%@ Page Language="VB" AutoEventWireup="true" Codebehind="inicio.aspx.vb" Inherits="Ingresodetrozo.inicio" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head runat="server">
    <title>Inicio - Sistema de Gestión</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sistema de gestión para ingreso de trozos y almacén" />
    <link href="CSS/inicio.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="Content/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" 
          crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="contenedor-inicio">
            <header class="header-inicio">
                <div class="logo-container">
                    
    <img id="logo" src="Content/LOGO_ALTO_HORIZONTE-SIN-FONDO.png" alt="Logo Alto Horizonte" />
    </div>
    <div class="boton-salida">
        <button type="button" aria-label="Cerrar sesión">
            <i class="fas fa-sign-out-alt"></i>Salir
                   
        </button>
    </div>
    </header>

    <main class="botones-inicio">
        <button type="button" class="btn-nav clear-cache" data-url="ingreso.aspx" aria-label="Ir a ingreso de trozos">
            <i class="fas fa-plus-circle"></i> Ingreso de Trozos
               
        </button>
        <button type="button" class="btn-nav" data-url="almacen.aspx" aria-label="Ir a almacén">
            <i class="fas fa-warehouse"></i> Almacén
               
        </button>
    </main>
    </div>

    <div class="login-footer footer-inicio">
        &copy; <%= DateTime.Now.Year %> Alto Horizonte. Todos los derechos reservados.
   
        <div id="version-info" class="version-label"></div>
    </div>
    </form>
    <div id="loading-overlay" class="loading-overlay" style="display: none;">
        <div class="spinner"></div>
    </div>
    <script src="JS/inicio.js"></script>
    <script src="JS/loader.js"></script>
</body>
</html>
