<%@ Page Language="VB" AutoEventWireup="false" CodeFile="ingreso.aspx.vb" Inherits="ingreso" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Ingreso de Información</title>
    <link href="CSS/ingreso.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="contenedor">
            <h1>Ingreso Camión Trozo</h1>

            <fieldset>
                <legend>Información Proveedor</legend>

                <div class="fila">
                    <label for="txtCodigoProveedor">Código Proveedor:</label>
                    <input type="text" id="txtCodigoProveedor" />
                </div>

                <div class="fila">
                    <label for="txtNombreContrato">Nombre Contrato:</label>
                    <input type="text" id="txtNombreContrato" />
                </div>

                <div class="fila">
                    <label for="txtNombreVenta">Nombre Venta:</label>
                    <input type="text" id="txtNombreVenta" />
                </div>

                <div class="fila">
                    <label for="txtOC">OC / Nº OC:</label>
                    <input type="text" id="txtOC" />
                </div>

                <div class="fila">
                    <label for="txtFechaRecepcion">Fecha Recepción:</label>
                    <input type="date" id="txtFechaRecepcion" />
                </div>
                <div class="fila">
                    <label for="txtProducto">Producto:</label>
                    <input type="text" id="txtProducto" />
               </div>

               <div class="fila">
                   <label for="txtFSC">FSC:</label>
                   <input type="text" id="txtFSC" />
              </div>

              <div class="fila">
                  <label for="txtDestino">Destino:</label>
                  <input type="text" id="txtDestino" />
              </div>

              <div class="fila">
                  <label for="txtPila">Pila:</label>
                  <input type="text" id="txtPila" />
             </div>
            </fieldset>

            <fieldset>
                <legend>Información Origen</legend>

                <div class="fila">
                    <label for="txtPredio">Predio:</label>
                    <input type="text" id="txtPredio" />
                </div>

                <div class="fila">
                    <label for="txtRol">Rol:</label>
                    <input type="text" id="txtRol" />
                </div>

                <div class="fila">
                    <label for="txtComuna">Comuna:</label>
                    <input type="text" id="txtComuna" />
                </div>

                <div class="fila">
                    <label for="txtRodal">Rodal:</label>
                    <input type="text" id="txtRodal" />
                </div>
            </fieldset>

            <div class="botones">
                <button type="button" id="btnIrContar">Ir a contar troncos</button>
            </div>
        </div>
    </form>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="JS/ingreso.js"></script>
</body>
</html>
