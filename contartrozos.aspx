﻿<%@ Page Language="VB" AutoEventWireup="true" CodeBehind="contartrozos.aspx.vb" Inherits="Ingresodetrozo.contartrozos" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Conteo de Troncos</title>
    <link rel="stylesheet" type="text/css" href="CSS/contartrozos.css" />
    <link rel="shortcut icon" href="Content/favicon.ico" type="image/x-icon" />
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="contenedor-contar">
            <div style="text-align: center;">
                <div id="banco-info">Banco X de Y</div>
            </div>

            <div class="slider-container">
                <!-- Primera pantalla de slider -->
                <div class="slider-screen">
                    <div class="header">
                        <div class="header-left">
                            <div class="totales">
                                <div id="largo-troncos-1" class="largo-troncos">Largo de troncos: 2.50M</div>
                                <div id="total-display-1" class="total-display">Total: 0</div>
                                <div id="volumen-display-1" class="volumen-display">Volumen Total: 0</div>
                            </div>
                        </div>
                        <div class="header-right">
                            <button id="Resta-1" type="button" class="btn-resta">Activar Modo Resta</button>
                        </div>
                    </div>
                    <div class="footer">
                        <div class="footer-left">
                            <button id="resetearContador-1" type="button" class="btn-reset">Reset</button>
                        </div>
                        <div class="footer-center">
                            <button class="btnVolver" type="button">← Volver</button>
                        </div>
                        <div class="footer-right">
                            <button class="btnSiguiente" type="button">Resumen</button>
                        </div>
                    </div>

                    <div class="grid-container-1">
                        <% For i = 16 To 38 Step 2 %>
                        <button id="btn-<%= i %>" class="btn-diametro" data-count='0'>Diámetro <%= i %></button>
                        <% Next %>
                    </div>
                </div>

                <!-- Segunda pantalla de slider -->
                <div class="slider-screen">
                    <div class="header">
                        <div class="header-left">
                            <div class="totales">
                                <div id="largo-troncos-2" class="largo-troncos">Largo de troncos: 2.50M</div>
                                <div id="total-display-2" class="total-display">Total: 0</div>
                                <div id="volumen-display-2" class="volumen-display">Volumen Total: 0</div>
                            </div>
                        </div>
                        <div class="header-right">
                            <button id="Resta-2" type="button" class="btn-resta">Activar Modo Resta</button>
                        </div>
                    </div>
                    <div class="footer">
                        <div class="footer-left">
                            <button id="resetearContador-2" type="button" class="btn-reset">Reset</button>
                        </div>
                        <div class="footer-center">
                            <button class="btnVolver" type="button">← Volver</button>
                        </div>
                        <div class="footer-right">
                            <button class="btnSiguiente" type="button">Resumen</button>
                        </div>
                    </div>
                    <div class="grid-container-2">
                        <% For i = 40 To 60 Step 2 %>
                        <button id="btn-<%= i %>" class="btn-diametro" data-count='0'>Diámetro <%= i %></button>
                        <% Next %>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <div id="version-info" class="version-info"></div>
    <div id="footer-version" class="footer-version"></div>
    
    <div id="loading-overlay" class="loading-overlay" style="display: none;">
        <div class="spinner"></div>
    </div>
    
    <script src="scripts/jquery-3.7.1.js"></script>
    <script src="JS/version-utils.js"></script>
    <script src="JS/loader.js"></script>
    <script src="JS/comun.js?v=3"></script>
    <script src="JS/cargar-empresas.js?v=3"></script>
    <script src="JS/contartrozos.js?v=3"></script>
    <script src="https://portal.altohorizonte.cl/js/comun_prod.js"></script>
</body>
</html>