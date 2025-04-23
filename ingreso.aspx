<%@ Page Language="VB" AutoEventWireup="false" CodeFile="ingreso.aspx.vb" Inherits="ingreso" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Ingreso de Información</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="CSS/ingreso.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
    <link rel="shortcut icon" href="Content/favicon.ico" type="image/x-icon" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="contenedor">
            <div class="header-contenedor">
                <div class="logo-izquierdo">
                <img src="Content/LOGO_ALTO_HORIZONTE-SIN-FONDO.png" alt="Logo Empresa" />
            </div>
             <div class="titulo-header">
                  <h1>Ingreso Información Camión</h1>
             </div>
            <div class="boton-salida">
                <button type="button" onclick="window.location.href='inicio.aspx'">Salir</button>
           </div>
          </div>
            <div id="acordeon">
                <h3>Información Proveedor</h3>
                <div>
                    <div class="fila"><label for="txtCodigoProveedor">Código Proveedor:</label><input type="text" id="txtCodigoProveedor" /></div>
                    <div class="fila"><label for="txtNombreContrato">Nombre Contrato:</label><input type="text" id="txtNombreContrato" /></div>
                    <div class="fila"><label for="txtNombreVenta">Nombre Venta:</label><input type="text" id="txtNombreVenta" /></div>
                    <div class="fila"><label for="txtOC">OC / Nº OC:</label><input type="number" id="txtOC" min="0" oninput="this.value = this.value.replace(/[^0-9]/g, '')" /></div>
                    <div class="fila"><label for="txtFechaRecepcion">Fecha Recepción:</label>
                       <input type="date" id="txtFechaRecepcion" max='<%= DateTime.Now.ToString("yyyy-MM-dd") %>' value='<%= DateTime.Now.ToString("yyyy-MM-dd") %>' readonly="readonly" />
                    </div>
                    <div class="fila"><label for="txtProducto">Producto:</label><input type="text" id="txtProducto" /></div>
                    <div class="fila">
                        <label for="txtFSC">FSC:</label>
                        <select id="txtFSC">
                            <option value="" selected="selected" disabled="disabled">Seleccione FSC</option>
                            <option value="100%FSC">100%FSC</option>
                            <option value="Mixto FSC">Mixto FSC</option>
                            <option value="CW FSC">CW FSC</option>
                            <option value="No Certificada">No Certificada</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="selectBancos">Cantidad de bancos:</label>
                        <select id="selectBancos" class="form-control">
                               <option value="1">1 banco</option>
                               <option value="2">2 bancos</option>
                               <option value="3">3 bancos</option>
                               <option value="4">4 bancos</option>
                       </select>
                    </div>
                    <div class="form-group">
                        <label for="Destino">Destino:</label>
                        <select id="txtDestino" name="Destino">
                           <option value="San Carlos">San Carlos</option>
                        </select>
                    </div>
                </div>

                <h3>Información Origen</h3>
                <div>
                 <div class="fila">
                        <label for="txtRol">Rol:</label>
                        <input type="text" id="txtRol" />
                    </div>
                   <div class="fila">
                        <label for="txtPredio">Predio:</label>
                        <input type="text" id="txtPredio" disabled="disabled" />
                   </div>
                   <div class="fila">
                       <label for="txtComuna">Comuna:</label>
                       <input type="text" id="txtComuna" disabled="disabled" />
                   </div>
                   <div class="fila">
                       <label for="txtRodal">Rodal:</label>
                       <input type="text" id="txtRodal" disabled="disabled" />
                  </div>
                  <div class="fila">
                       <label for="txtCoordenadas">Coordenadas:</label>
                       <input type="text" id="txtCoordenadas" placeholder="-37.123456, -73.123456" disabled="disabled" />
                  </div>
               </div>

                <h3>Información Transporte</h3>
                <div>
                    <div class="fila"><label for="txtDespachador">Despachador:</label><input type="text" id="txtDespachador" /></div>
                    <div class="fila"><label for="txtTransportista">Transportista:</label><input type="text" id="txtTransportista" /></div>
                    <div class="fila"><label for="txtRUTDespachador">RUT Despachador:</label><input type="text" id="txtRUTDespachador" placeholder="12345678-9" /><span id="errorRUTDespachador" class="error-rut"></span></div>
                    <div class="fila"><label for="txtConductor">Conductor:</label><input type="text" id="txtConductor" /></div>
                    <div class="fila"><label for="txtRUTConductor">RUT Conductor:</label><input type="text" id="txtRUTConductor" placeholder="12345678-9" /><span id="errorRUTConductor" class="error-rut"></span></div>
                </div>
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