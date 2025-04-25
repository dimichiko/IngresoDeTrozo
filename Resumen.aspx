<%@ Page Language="VB" AutoEventWireup="false" CodeFile="resumen.aspx.vb" Inherits="resumen" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Resumen Final</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link href="CSS/resumen.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="Content/favicon.ico" type="image/x-icon" />
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
          <div class="contenedor">

            <div id="pantalla-bancos">
                <h1>Resumen Conteo de Troncos</h1>

                <div id="bloques-bancos"></div>

                <div id="totales-globales">
                    <div class="global-label">Total Global</div>
                    <div class="global-datos">
                        <span id="total-troncos">Total de Troncos: 0</span>
                        <span id="volumen-total">Volumen Total: 0</span>
                    </div>
                </div>

                    <div class="botones no-print">
                        <button type="button" onclick="volverAContarTrozos()">← Volver al conteo</button>
                        <button type="button" onclick="mostrarPantallaFinal()">→ Ver resumen final</button>
                    </div>
                </div>
            </div>

            <div id="pantalla-final" style="display: none;">
    <h1>Resumen Final</h1>

    <div class="seccion-final">
        <h3>Información Proveedor</h3>
        <table>
            <tr><td><strong>Proveedor:</strong></td><td><span id="res-proveedor">-</span></td></tr>
            <tr><td><strong>Contrato:</strong></td><td><span id="res-contrato">-</span></td></tr>
            <tr><td><strong>Venta:</strong></td><td><span id="res-venta">-</span></td></tr>
            <tr><td><strong>OC:</strong></td><td><span id="res-oc">-</span></td></tr>
            <tr><td><strong>Fecha Recepción:</strong></td><td><span id="res-fecha">-</span></td></tr>
            <tr><td><strong>Producto:</strong></td><td><span id="res-producto">-</span></td></tr>
            <tr><td><strong>FSC:</strong></td><td><span id="res-fsc">-</span></td></tr>
            <tr><td><strong>Número Bancos:</strong></td><td><span id="res-bancos">-</span></td></tr>
            <tr><td><strong>Destino:</strong></td><td><span id="res-destino">-</span></td></tr>
            <tr><td><strong>Largo Troncos:</strong></td><td><span id="res-largo">-</span></td></tr>
        </table>
    </div>

    <div class="seccion-final">
        <h3>Información Origen</h3>
        <table>
            <tr><td><strong>Rol:</strong></td><td><span id="res-rol">-</span></td></tr>
            <tr><td><strong>Predio:</strong></td><td><span id="res-predio">-</span></td></tr>
            <tr><td><strong>Comuna:</strong></td><td><span id="res-comuna">-</span></td></tr>
            <tr><td><strong>Rodal:</strong></td><td><span id="res-rodal">-</span></td></tr>
            <tr><td><strong>Coordenadas:</strong></td><td><span id="res-coordenadas">-</span></td></tr>
        </table>
    </div>

    <div class="seccion-final">
        <h3>Información Transporte</h3>
        <table>
            <tr><td><strong>Despachador:</strong></td><td><span id="res-despachador">-</span></td></tr>
            <tr><td><strong>Transportista:</strong></td><td><span id="res-transportista">-</span></td></tr>
            <tr><td><strong>RUT Despachador:</strong></td><td><span id="res-rutdespachador">-</span></td></tr>
            <tr><td><strong>Conductor:</strong></td><td><span id="res-conductor">-</span></td></tr>
            <tr><td><strong>RUT Conductor:</strong></td><td><span id="res-rutconductor">-</span></td></tr>
        </table>
    </div>

    <div class="seccion-final">
        <h3>Totales</h3>
        <table>
            <tr><td><strong>Total de Troncos:</strong></td><td><span id="resumen-final-troncos">0</span></td></tr>
            <tr><td><strong>Volumen Total:</strong></td><td><span id="resumen-final-volumen">0 m³</span></td></tr>
            <tr><td><strong>Fecha de impresión:</strong></td><td><span id="fecha-impresion">-</span></td></tr>
        </table>
    </div>

    <div class="botones no-print">
        <button type="button" onclick="mostrarPantallaBancos()">← Volver</button>
        <button type="button" onclick="window.print()">Imprimir</button>
        <button type="button" onclick="irAlInicio()">← Volver al inicio</button>
    </div>
</div>

        </div>
    </form>

    <script src="JS/resumen.js?v=3"></script>
</body>
</html>