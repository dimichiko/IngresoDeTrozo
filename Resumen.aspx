<%@ Page Language="VB" AutoEventWireup="false" CodeFile="resumen.aspx.vb" Inherits="resumen" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Resumen Final</title>
    <meta charset="utf-8" />
    <link href="CSS/resumen.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="contenedor">
            <h1>Resumen del Proceso</h1>

              <table id="tabla-resumen">
                 <thead>
                     <tr>
                         <th>Diámetro</th>
                         <th>Contador</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
            </table>
            <div id="edicionTroncos">
                <div>
                       <button type="button" id="btnEditarMonto">Editar monto de troncos</button>
                       <button type="button" id="btnGuardarEdicion" style="display: none;">Guardar edición</button>
                       <button type="button" onclick="volverAlFormulario()">← Volver al contador</button>
                       <button type="button" onclick="terminarProceso()">Finalizar proceso</button>
                </div>
           </div>

            <div id="edicion-info" style="display:none;">
                <p>Total actual: <span id="total-actual">0</span> / <span id="total-requerido">0</span></p>
                <p id="alerta-total"></p>
            </div>

            <div id="resumenCompleto" style="display:none; margin-top: 20px;">
                <h3>Información Ingreso</h3>
                <p><strong>Proveedor:</strong> <span id="proveedor"></span></p>
                <p><strong>Contrato:</strong> <span id="contrato"></span></p>
                <p><strong>Venta:</strong> <span id="venta"></span></p>
                <p><strong>OC:</strong> <span id="oc"></span></p>
                <p><strong>Fecha:</strong> <span id="fecha"></span></p>
                <p><strong>Producto:</strong> <span id="producto"></span></p>
                <p><strong>FSC:</strong> <span id="fsc"></span></p>
                <p><strong>Destino:</strong> <span id="destino"></span></p>
                <p><strong>Pila:</strong> <span id="pila"></span></p>
                <p><strong>Predio:</strong> <span id="predio"></span></p>
                <p><strong>Rol:</strong> <span id="rol"></span></p>
                <p><strong>Comuna:</strong> <span id="comuna"></span></p>
                <p><strong>Rodal:</strong> <span id="rodal"></span></p>

                <h3>Resumen Conteo</h3>
                <p id="total-troncos">Total de Troncos: 0</p>
                <p id="volumen-total">Volumen Total: 0</p>

                 <button type="button" onclick="reiniciarProceso()">Empezar nuevo conteo</button>
            </div>
        </div>
    </form>

    <script src="JS/resumen.js"></script>
</body>
</html>