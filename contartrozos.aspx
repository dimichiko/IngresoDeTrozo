<%@ Page Language="VB" AutoEventWireup="true" CodeBehind="contartrozos.aspx.vb" Inherits="Ingresodetrozo.contartrozos" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Conteo de Troncos</title>
    <link rel="stylesheet" type="text/css" href="CSS/home.css" />
</head>
<body>
    <form id="form1" runat="server">
        <div >
              <select class="form-control custom-select" id="select_prueba"> 
                                     </select>
        </div>
        <div class="slider-container">
            <div class="slider-screen">
                 <div class="header">
                 <div class="header-left">
                   <span id="total-display-1">Total: 0</span>
                   <span id="volumen-display-1">Volumen Total: 0 </span>
                </div>
                <div class="header-right">
                   <button id="Resta-1" type="button" onclick="activarModoResta(event)">Modo Resta</button>
               </div>
               </div>
                <div class="grid-container">
                    <button id="btn-16" onclick="manejarClick('btn-16', event)" data-count="0">Diámetro 16</button>
                    <button id="btn-18" onclick="manejarClick('btn-18', event)" data-count="0">Diámetro 18</button>
                    <button id="btn-20" onclick="manejarClick('btn-20', event)" data-count="0">Diámetro 20</button>
                    <button id="btn-22" onclick="manejarClick('btn-22', event)" data-count="0">Diámetro 22</button>
                    <button id="btn-24" onclick="manejarClick('btn-24', event)" data-count="0">Diámetro 24</button>
                    <button id="btn-26" onclick="manejarClick('btn-26', event)" data-count="0">Diámetro 26</button>
                    <button id="btn-28" onclick="manejarClick('btn-28', event)" data-count="0">Diámetro 28</button>
                    <button id="btn-30" onclick="manejarClick('btn-30', event)" data-count="0">Diámetro 30</button>
                    <button id="btn-32" onclick="manejarClick('btn-32', event)" data-count="0">Diámetro 32</button>
                    <button id="btn-34" onclick="manejarClick('btn-34', event)" data-count="0">Diámetro 34</button>
                    <button id="btn-36" onclick="manejarClick('btn-36', event)" data-count="0">Diámetro 36</button>
                    <button id="btn-38" onclick="manejarClick('btn-38', event)" data-count="0">Diámetro 38</button>
                </div>
                <div class="footer">
                    <div class="footer-left">
                        <button id="resetearContador-1" type="button" onclick="resetearContadores(event)">Reset</button>
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
                        <span id="volumen-display-2">Volumen Total: 0 </span>
                </div>
                <div class="header-right">
                    <button id="Resta-2" type="button" onclick="activarModoResta(event)">Modo Resta</button>
                </div>
                </div>
                <div class="grid-container">
                    <button id="btn-40" onclick="manejarClick('btn-40', event)" data-count="0">Diámetro 40</button>
                    <button id="btn-42" onclick="manejarClick('btn-42', event)" data-count="0">Diámetro 42</button>
                    <button id="btn-44" onclick="manejarClick('btn-44', event)" data-count="0">Diámetro 44</button>
                    <button id="btn-46" onclick="manejarClick('btn-46', event)" data-count="0">Diámetro 46</button>
                    <button id="btn-48" onclick="manejarClick('btn-48', event)" data-count="0">Diámetro 48</button>
                </div>
                <div class="footer">
                    <div class="footer-left">
                        <button id="resetearContador-2" type="button" onclick="resetearContadores(event)">Reset</button>
                </div>
                    <div class="footer-right">
                        <button id="irResumen-2" type="button" onclick="irAlResumen(event)">Resumen</button>
                </div>
               </div>
            </div>
        </div>
    </form>
    <script src="/scripts/jquery-3.7.1.js"></script>
    <script src="/Scripts/contadosTroncos.js"></script>
    <script src="/js/comun.js"></script>
    <script src="/js/contartrozos.js"></script>
</body>
</html>








