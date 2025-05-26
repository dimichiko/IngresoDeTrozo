<%@ Page Language="VB" AutoEventWireup="true" CodeBehind="movimientos.aspx.vb" Inherits="Ingresodetrozo.movimientos" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head runat="server">
    <title>Últimos Movimientos</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sistema de gestión de movimientos de ingreso de trozo" />

    <!-- Styles -->
    <link href="CSS/movimientos.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Preload critical resources -->
    <link rel="preload" href="Content/LOGO_ALTO_HORIZONTE-SIN-FONDO.png" as="image" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="contenedor-movimientos">
            <header class="header-movimientos">
                <img src="Content/LOGO_ALTO_HORIZONTE-SIN-FONDO.png"
                    alt="Logo Alto Horizonte"
                    class="logo-movimientos"
                    loading="lazy" />

                <h1 class="titulo-movimientos">Últimos movimientos</h1>

                <div class="boton-volver">
                    <button type="button"
                        onclick="window.location.href='inicio.aspx'"
                        title="Volver al inicio">
                        <i class="fas fa-arrow-left" aria-hidden="true"></i>
                        Volver
                   
                    </button>
                </div>
            </header>
        </div>

        <div class="btn-container">
            <button id="btn-actualizar"
                type="button"
                title="Actualizar datos">
                <i class="fas fa-sync-alt" aria-hidden="true"></i>
                Actualizar
           
            </button>
        </div>

        <main>
            <div id="movimientos-container" role="main" aria-label="Tabla de movimientos">
                <!-- Contenido dinámico -->
            </div>
        </main>
    </form>

    <div id="version-info" class="version-info" aria-label="Información de versión"></div>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
        crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://portal.altohorizonte.cl/js/comun_prod.js"></script>
    <script src="JS/version-utils.js"></script>
    <script src="JS/movimientos.js"></script>

    <!-- Performance monitoring -->
    <script>
        // Simple performance monitoring
        window.addEventListener('load', function () {
            if (window.performance) {
                const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                console.log('Page load time:', loadTime + 'ms');
            }
        });
    </script>
</body>
</html>
