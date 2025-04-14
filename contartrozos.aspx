<%@ Page Language="VB" AutoEventWireup="true" CodeBehind="contartrozos.aspx.vb" Inherits="Ingresodetrozo.contartrozos" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Conteo de Troncos</title>
    <link rel="stylesheet" type="text/css" href="CSS/contartrozos.css" />
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <select class="form-control custom-select" id="select_prueba"></select>
        </div>

        <div class="slider-container">
            <div class="slider-screen">
                <div class="header">
                    <div class="header-left">
                        <span id="total-display-1">Total: 0</span>
                        <span id="volumen-display-1">Volumen Total: 0</span>
                    </div>
                    <button id="Resta-1" type="button" onclick="toggleModoResta(event)">Activar Modo Resta</button>
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
                    <div style="text-align:center; margin-top: 20px;">
                    <button type="button" onclick="window.location.href='ingreso.aspx'">← Volver a ingreso</button>
                    </div>
                    <div class="footer-right">
                        <button id="irResumen-1" type="button" onclick="irAlResumen(event)">Resumen</button>
                    </div>
                </div>
            </div>

            <div class="slider-screen">
                <div class="header">
                    <div class="header-left">
                        <span id="total-display-2">Total: 0</span>
                        <span id="volumen-display-2">Volumen Total: 0</span>
                    </div>
                    <div class="header-right">
                        <button id="Resta-2" type="button" onclick="toggleModoResta(event)">Modo Resta</button>
                    </div>
                </div>

                <div class="grid-container-2">
                    <% For i = 40 To 48 Step 2
                        Response.Write($"<button id='btn-{i}' onclick=""manejarClick('btn-{i}', event)"" data-count='0'>Diámetro {i}</button>")
                    Next %>
                </div>
           
                <div class="footer">
                    <div class="footer-left">
                        <button id="resetearContador-2" type="button" onclick="resetearContadores(event)">Reset</button>
                    </div>
                    <div style="text-align:center; margin-top: 20px;">
                    <button type="button" onclick="window.location.href='ingreso.aspx'">← Volver a ingreso</button>
                    </div>
                    <div class="footer-right">
                        <button id="irResumen-2" type="button" onclick="irAlResumen(event)">Resumen</button>
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








