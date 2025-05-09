<%@ Page Language="VB" AutoEventWireup="true" CodeBehind="resumen.aspx.vb" Inherits="Ingresodetrozo.resumen" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">

<head runat="server">
    <title>Resumen Final</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#007BFF" />
    <meta name="format-detection" content="telephone=no" />


    <link href="CSS/resumen.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="Content/favicon.ico" type="image/x-icon" />
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="contenedor">
            <section id="pantalla-bancos" aria-labelledby="titulo-conteo">
                <div class="header-resumen">
                    <h1 id="titulo-conteo">Resumen Conteo de Troncos</h1>
                    <button type="button" class="no-print" onclick="volverAContarTrozos()">← Volver al conteo</button>
                </div>
                <div id="bloques-bancos" class="bancos-contenedor"></div>

                <div id="totales-globales" role="region" aria-label="Totales globales">
                    <div class="global-label">Total Global</div>
                    <div class="global-datos">
                        <span id="total-troncos">Total de Troncos: 0</span>
                        <span id="volumen-total">Volumen Total: 0</span>
                    </div>
                </div>

                <div class="botones no-print">
                    <button type="button" onclick="volverAContarTrozos()" aria-label="Volver al conteo">← Volver al conteo</button>
                    <button type="button" onclick="mostrarPantallaFinal()" aria-label="Ver resumen final">→ Ver resumen final</button>
                </div>
            </section>

            <section id="pantalla-final" style="display: none;" aria-labelledby="titulo-final">
                <h1 id="titulo-final">Resumen Final</h1>

                <!-- Información Proveedor -->
                <details class="banco-bloque" open>
                    <summary>Información Proveedor</summary>
                    <div class="seccion-final">
                        <table aria-label="Información del proveedor">
                            <tbody>
                                <tr>
                                    <td>Proveedor:</td>
                                    <td><span id="res-proveedor">-</span></td>
                                </tr>
                                <tr>
                                    <td>Contrato:</td>
                                    <td><span id="res-contrato">-</span></td>
                                </tr>
                                <tr>
                                    <td>Venta:</td>
                                    <td><span id="res-venta">-</span></td>
                                </tr>
                                <tr>
                                    <td>OC:</td>
                                    <td><span id="res-oc">-</span></td>
                                </tr>
                                <tr>
                                    <td>Fecha Recepción:</td>
                                    <td><span id="res-fecha">-</span></td>
                                </tr>
                                <tr>
                                    <td>Producto:</td>
                                    <td><span id="res-producto">-</span></td>
                                </tr>
                                <tr>
                                    <td>FSC:</td>
                                    <td><span id="res-fsc">-</span></td>
                                </tr>
                                <tr>
                                    <td>Número Bancos:</td>
                                    <td><span id="res-bancos">-</span></td>
                                </tr>
                                <tr>
                                    <td>Destino:</td>
                                    <td><span id="res-destino">-</span></td>
                                </tr>
                                <tr>
                                    <td>Largo Troncos:</td>
                                    <td><span id="res-largo">-</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </details>

                <!-- Información Origen -->
                <details class="banco-bloque">
                    <summary>Información Origen</summary>
                    <div class="seccion-final">
                        <table aria-label="Información de origen">
                            <tbody>
                                <tr>
                                    <td>Rol:</td>
                                    <td><span id="res-rol">-</span></td>
                                </tr>
                                <tr>
                                    <td>Predio:</td>
                                    <td><span id="res-predio">-</span></td>
                                </tr>
                                <tr>
                                    <td>Comuna:</td>
                                    <td><span id="res-comuna">-</span></td>
                                </tr>
                                <tr>
                                    <td>Rodal:</td>
                                    <td><span id="res-rodal">-</span></td>
                                </tr>
                                <tr>
                                    <td>Coordenadas:</td>
                                    <td><span id="res-coordenadas">-</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </details>

                <!-- Información Transporte -->
                <details class="banco-bloque">
                    <summary>Información Transporte</summary>
                    <div class="seccion-final">
                        <table aria-label="Información de transporte">
                            <tbody>
                                <tr>
                                    <td>Despachador:</td>
                                    <td><span id="res-despachador">-</span></td>
                                </tr>
                                <tr>
                                    <td>Transportista:</td>
                                    <td><span id="res-transportista">-</span></td>
                                </tr>
                                <tr>
                                    <td>RUT Despachador:</td>
                                    <td><span id="res-rutdespachador">-</span></td>
                                </tr>
                                <tr>
                                    <td>Conductor:</td>
                                    <td><span id="res-conductor">-</span></td>
                                </tr>
                                <tr>
                                    <td>RUT Conductor:</td>
                                    <td><span id="res-rutconductor">-</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </details>

                <!-- Totales -->
                <div class="seccion-final">
                    <h3>Totales</h3>
                    <table aria-label="Totales" style="width: 100%; background-color: #fff;">
                        <tbody>
                            <tr>
                                <td style="font-weight: bold; width: 40%;">Total de Troncos:</td>
                                <td><span id="resumen-final-troncos">0</span></td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">Volumen Total:</td>
                                <td><span id="resumen-final-volumen">0 m³</span></td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">Fecha de impresión:</td>
                                <td><span id="fecha-impresion">-</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="botones no-print">
                    <button type="button" onclick="mostrarPantallaBancos()">← Volver</button>
                    <button type="button" onclick="window.print()">Imprimir</button>
                    <button type="button" onclick="irAlInicio()">← Volver al Login</button>
                </div>
            </section>
        </div>
    </form>

    <div id="loading-overlay" class="loading-overlay" style="display: none;">
        <div class="spinner"></div>
    </div>

    <script src="JS/resumen.js?v=4"></script>
    <script src="JS/loader.js"></script>
    <script src="https://portal.altohorizonte.cl/js/comun_prod.js"></script>
    <script>
        document.querySelectorAll("button, a").forEach(el => {
            el.addEventListener("click", e => {
                const target = e.target.closest("button, a");
                if (target && !target.getAttribute("target") === "_blank") {
                    showLoader();
                }
            });
        });
    </script>
</body>
</html>
