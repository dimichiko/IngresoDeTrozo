<%@ Page Language="VB" AutoEventWireup="false" CodeFile="ingreso.aspx.vb" Inherits="ingreso" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Ingreso de Información</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="CSS/ingreso.css" rel="stylesheet" type="text/css" />
    <link href="CSS/mobile_fixes.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="contenedor">
            <h1>Ingreso Información Camión</h1>

            <div id="acordeon">
                <h3>Información Proveedor</h3>
                <div>
                    <div class="fila"><label for="txtCodigoProveedor">Código Proveedor:</label><input type="text" id="txtCodigoProveedor" /></div>
                    <div class="fila"><label for="txtNombreContrato">Nombre Contrato:</label><input type="text" id="txtNombreContrato" /></div>
                    <div class="fila"><label for="txtNombreVenta">Nombre Venta:</label><input type="text" id="txtNombreVenta" /></div>
                    <div class="fila"><label for="txtOC">OC / Nº OC:</label><input type="text" id="txtOC" /></div>
                    <div class="fila"><label for="txtFechaRecepcion">Fecha Recepción:</label><input type="date" id="txtFechaRecepcion" /></div>
                    <div class="fila"><label for="txtProducto">Producto:</label><input type="text" id="txtProducto" /></div>
                    <div class="fila"><label for="txtFSC">FSC:</label><input type="text" id="txtFSC" /></div>
                    <div class="fila"><label for="txtDestino">Destino:</label><input type="text" id="txtDestino" /></div>
                    <div class="fila"><label for="txtPila">Pila:</label><input type="text" id="txtPila" /></div>
                </div>

                <h3>Información Origen</h3>
                <div>
                    <div class="fila"><label for="txtPredio">Predio:</label><input type="text" id="txtPredio" /></div>
                    <div class="fila"><label for="txtRol">Rol:</label><input type="text" id="txtRol" /></div>
                    <div class="fila"><label for="txtComuna">Comuna:</label><input type="text" id="txtComuna" /></div>
                    <div class="fila"><label for="txtRodal">Rodal:</label><input type="text" id="txtRodal" /></div>
                </div>

                <h3>Información Transporte</h3>
                <div>
                    <div class="fila"><label for="txtDespachador">Despachador:</label><input type="text" id="txtDespachador" /></div>
                    <div class="fila"><label for="txtTransportista">Transportista:</label><input type="text" id="txtTransportista" /></div>
                    <div class="fila"><label for="txtRUTDespachador">RUT Despachador:</label><input type="text" id="txtRUTDespachador" /></div>
                    <div class="fila"><label for="txtConductor">Conductor:</label><input type="text" id="txtConductor" /></div>
                    <div class="fila"><label for="txtRUTConductor">RUT Conductor:</label><input type="text" id="txtRUTConductor" /></div>
                    <div class="fila"><label for="txtPatenteCamion">Patente Camión:</label><input type="text" id="txtPatenteCamion" /></div>
                    <div class="fila"><label for="txtPatenteCarro">Patente Carro:</label><input type="text" id="txtPatenteCarro" /></div>
                </div>
            </div>
           <div class="fila">
               <label for="txtCantidadBancos">Cantidad de Bancos:</label>
               <select id="txtCantidadBancos" required>
                      <option value=""></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
              </select>
            </div>
            <div class="botones">
                <button type="button" id="btnIrContar">Ir a contar troncos</button>
            </div>
        </div>
    </form>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="JS/ingreso.js"></script>
</body>
</html>