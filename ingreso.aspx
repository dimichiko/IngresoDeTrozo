<%@ Page Language="VB" AutoEventWireup="true" Codebehind="ingreso.aspx.vb" Inherits="Ingresodetrozo.ingreso" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head runat="server">
    <title>Ingreso de Información</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link href="/CSS/ingreso.css?v=125" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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
                    <button type="button" onclick="window.location.href='inicio.aspx'" aria-label="Volver al inicio">
                        <i class="fas fa-arrow-left"></i>Volver a inicio
   
                    </button>
                </div>
            </div>

            <div id="acordeon">
                <h3>Información Proveedor</h3>
                <div>
                    <div class="fila">
                        <label for="txtCodProvPrefijo">Código Proveedor:</label>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <input type="text" id="txtCodProvPrefijo" maxlength="4" style="flex: none; width: 60px;" inputmode="numeric" />
                            <input type="text" id="txtCodProvAuto" disabled="disabled" style="flex: 1; background-color: #eee;" />
                        </div>
                    </div>

                    <div class="fila">
                        <label for="txtContratoPrefijo">Nota Compra:</label>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <input type="text" id="txtContratoPrefijo" maxlength="4" style="flex: none; width: 60px;" inputmode="numeric" />
                            <input type="text" id="txtContratoAuto" disabled="disabled" style="flex: 1; background-color: #eee;" />
                        </div>
                    </div>

                    <div class="fila">
                        <label for="txtVentaPrefijo">Nota Venta:</label>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <input type="text" id="txtVentaPrefijo" maxlength="4" style="flex: none; width: 60px;" inputmode="numeric" />
                            <input type="text" id="txtVentaAuto" disabled="disabled" style="flex: 1; background-color: #eee;" />
                        </div>
                    </div>

                    <div class="fila">
                        <label for="txtOC">GDE:</label>
                        <div style="display: flex; align-items: center;">
                            <input type="text" id="txtOC" maxlength="4" style="flex: none; width: 60px;" inputmode="numeric" />
                        </div>
                    </div>

                    <div class="fila">
                        <label for="txtFechaRecepcion">Fecha Recepción:</label>
                        <input type="text" id="txtFechaRecepcion" readonly="readonly" />
                    </div>

                    <div class="fila">
                        <label for="txtProducto">Producto:</label>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <input type="text" id="txtProducto" maxlength="4" style="flex: none; width: 60px;" inputmode="numeric" />
                            <input type="text" id="nomProducto" disabled="disabled" style="flex: 1; background-color: #eee;" />
                        </div>
                    </div>

                    <table class="tabla-fsc" >
                        <tr>
                            <td>
                                <label for="txtFSC">FSC:</label>
                            </td>
                            <td>
                                <select id="txtFSC">
<%--                                    <option value="100%FSC">100%FSC</option>
                                    <option value="Mixto FSC">Mixto FSC</option>
                                    <option value="CW FSC">CW FSC</option>
                                    <option value="No Certificada">No Certificada</option>--%>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label for="selectBancos">Cantidad de bancos:</label>
                            </td>
                            <td>
                                <select id="selectBancos">
                                    <option value="1">1 banco</option>
                                    <option value="2">2 bancos</option>
                                    <option value="3">3 bancos</option>
                                    <option value="4">4 bancos</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label for="txtDestino">Destino:</label>
                            </td>
                            <td>
                                <select id="txtDestino" name="Destino">
                <%--                    <option value="San Carlos">San Carlos</option>--%>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label for="LargoTroncos">Largo:</label>
                            </td>
                            <td>
                                <select id="LargoTroncos" name="Largo">
<%--                                    <option value="2.50M">2.50M</option>
                                    <option value="3.10M">3.10M</option>
                                    <option value="3.30M">3.30M</option>
                                    <option value="4.00M">4.00M</option>--%>
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>

                <h3>Información Origen</h3>
                <div>
                    <div class="fila">
                        <label for="txtRol">Rol:</label>
                        <input type="text" id="txtRol" maxlength="7" placeholder="Ej: 123-456" />
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
                    <div class="fila">
                        <label for="txtDespachador">Despachador:</label>
                        <input type="text" id="txtDespachador" maxlength="17" placeholder="Nombre y Apellido" />
                    </div>

                    <div class="fila">
                        <label for="txtTransportista">Transportista:</label>
                        <input type="text" id="txtTransportista" maxlength="17" placeholder="Nombre empresa" />
                    </div>

                    <div class="fila">
                        <label for="txtRUTDespachador">RUT Despachador:</label>
                        <input type="text" id="txtRUTDespachador" maxlength="12" placeholder="12345678-9" inputmode="numeric" />
                        <span id="errorRUTDespachador" class="error-rut"></span>
                    </div>

                    <div class="fila">
                        <label for="txtConductor">Conductor:</label>
                        <input type="text" id="txtConductor" minlength="5" maxlength="17" placeholder="Nombre y Apellido" />
                    </div>

                    <div class="fila">
                        <label for="txtRUTConductor">RUT Conductor:</label>
                        <input type="text" id="txtRUTConductor" maxlength="12" placeholder="12345678-9" inputmode="numeric" />
                        <span id="errorRUTConductor" class="error-rut"></span>
                    </div>
                </div>
            </div>
            <div class="botones">
                <button type="button" id="btnIrContar">Ir a contar troncos</button>
            </div>
            <div id="version-info" class="version-info"></div>
        </div>
    </form>
    <div id="loading-overlay" class="loading-overlay" style="display: none;">
        <div class="spinner"></div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <script src="JS/funciones.js"></script>
    <script src="JS/ingreso.js"></script>
    <script src="JS/loader.js"></script>
    <script src="JS/version-utils.js"></script>
    <script src="https://portal.altohorizonte.cl/js/comun_prod.js"></script>
</body>
</html>
