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
                    <span class="totales-label">Total Global</span>
                    <span id="total-troncos">Total de Troncos: 0</span>
                    <span id="volumen-total">Volumen Total: 0</span>
               </div>

                    <div class="botones no-print">
                        <button type="button" onclick="mostrarPantallaFinal()">→ Ver resumen final</button>
                    </div>
                </div>

                <div class="botones no-print">
                    <button type="button" onclick="volverAlFormulario()">← Volver al contador</button>
                </div>
            </div>

            <div id="pantalla-final" style="display: none;">
                <h1>Resumen Final</h1>

                <h3>Información Proveedor</h3>
                <p><strong>Proveedor:</strong> <span id="res-proveedor">-</span></p>
                <p><strong>Contrato:</strong> <span id="res-contrato">-</span></p>
                <p><strong>Venta:</strong> <span id="res-venta">-</span></p>
                <p><strong>OC:</strong> <span id="res-oc">-</span></p>
                <p><strong>Fecha Recepción:</strong> <span id="res-fecha">-</span></p>
                <p><strong>Producto:</strong> <span id="res-producto">-</span></p>
                <p><strong>FSC:</strong> <span id="res-fsc">-</span></p>
                <p><strong>Destino:</strong> <span id="res-destino">-</span></p>

                <hr />

                <h3>Información Origen</h3>
                <p><strong>Rol:</strong> <span id="res-rol">-</span></p>
                <p><strong>Predio:</strong> <span id="res-predio">-</span></p>
                <p><strong>Comuna:</strong> <span id="res-comuna">-</span></p>
                <p><strong>Rodal:</strong> <span id="res-rodal">-</span></p>
                <p><strong>Coordenadas:</strong> <span id="res-coordenadas">-</span></p>

                <hr />

                <h3>Información Transporte</h3>
                <p><strong>Despachador:</strong> <span id="res-despachador">-</span></p>
                <p><strong>Transportista:</strong> <span id="res-transportista">-</span></p>
                <p><strong>RUT Despachador:</strong> <span id="res-rutdespachador">-</span></p>
                <p><strong>Conductor:</strong> <span id="res-conductor">-</span></p>
                <p><strong>RUT Conductor:</strong> <span id="res-rutconductor">-</span></p>

                <hr />

                <p><strong>Cantidad de Bancos:</strong> <span id="res-bancos">-</span></p>

                <hr />

                <p><strong>Total de Troncos:</strong> <span id="resumen-final-troncos">0</span></p>
                <p><strong>Volumen Total:</strong> <span id="resumen-final-volumen">0 m³</span></p>
                <p><strong>Fecha de impresión:</strong> <span id="fecha-impresion">-</span></p>

                <div class="botones no-print">
                    <button type="button" onclick="mostrarPantallaBancos()">← Volver</button>
                    <button type="button" onclick="window.print()">Imprimir</button>
                    <button type="button" onclick="irAlInicio()">Ir al inicio</button>
                </div>
            </div>

        </div>
    </form>

    <script src="JS/resumen.js?v=3"></script>
</body>
</html>