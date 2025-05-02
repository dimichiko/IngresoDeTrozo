<%@ Page Language="VB" AutoEventWireup="true" CodeBehind="contartrozos.aspx.vb" Inherits="Ingresodetrozo.contartrozos" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Conteo de Troncos</title>
    <link rel="stylesheet" type="text/css" href="CSS/contartrozos.css" />
    <link rel="shortcut icon" href="Content/favicon.ico" type="image/x-icon" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="contenedor-contar">
            <div style="text-align: center;">
                <div id="banco-info">
                    Banco X de Y
                </div>

            </div>

            <div class="slider-container">
                <div class="slider-screen">
                    <div class="header">
                        <div class="header-left">
                            <div class="totales">
                                <div id="largo-troncos-1">Largo de troncos: 2.50M</div>
                                <div id="total-display-1">Total: 0</div>
                                <div id="volumen-display-1">Volumen Total: 0</div>
                            </div>
                        </div>
                        <div class="header-right">
                            <button id="Resta-1" type="button" onclick="toggleModoResta(event)">Activar Modo Resta</button>
                        </div>
                    </div>

                    <div class="grid-container-1">
                        <% For i = 16 To 38 Step 2
                                Response.Write($"<button id='btn-{i}' onclick=""manejarClick('btn-{i}', event)"" data-count='0'>Diámetro {i}</button>")
                            Next %>
                    </div>

                    <div class="footer">
                        <div class="footer-left">
                            <button id="resetearContador-1" type="button" onclick="resetearContadores(event)">Reset</button>
                        </div>
                        <div class="footer-center">
                            <button class="btnVolver" type="button">← Volver</button>
                        </div>
                        <div class="footer-right">
                            <button class="btnSiguiente" type="button" onclick="irAlResumen(event)">Resumen</button>
                        </div>
                    </div>
                </div>

                <div class="slider-screen">
                    <div class="header">
                        <div class="header-left">
                            <div class="totales">
                                <div id="largo-troncos-2">Largo de troncos: 2.50M</div>
                                <div id="total-display-2">Total: 0</div>
                                <div id="volumen-display-2">Volumen Total: 0</div>
                            </div>
                        </div>
                        <div class="header-right">
                            <button id="Resta-2" type="button" onclick="toggleModoResta(event)">Activar Modo Resta</button>
                        </div>
                    </div>

                    <div class="grid-container-2">
                        <% For i = 40 To 60 Step 2
                                Response.Write($"<button id='btn-{i}' onclick=""manejarClick('btn-{i}', event)"" data-count='0'>Diámetro {i}</button>")
                            Next %>
                    </div>

                    <div class="footer">
                        <div class="footer-left">
                            <button id="resetearContador-2" type="button" onclick="resetearContadores(event)">Reset</button>
                        </div>
                        <div class="footer-center">
                            <button class="btnVolver" type="button">← Volver</button>
                        </div>
                        <div class="footer-right">
                            <button class="btnSiguiente" type="button" onclick="irAlResumen(event)">Resumen</button>
                        </div>
                        <!--   <div
                            id="footer-version" style="text-align:center; font-size:0.9rem; color:#888; margin-top:40px;">
                            </div> -->
                    </div>
                </div>
            </div>
        </div>
    </form>

    <script src="/scripts/jquery-3.7.1.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/JS/comun.js?v=2"></script>
    <script src="/JS/cargar-empresas.js?v=1"></script>
    <script src="/JS/contartrozos.js?v=2"></script>
</body>
</html>






