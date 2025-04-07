<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="contartrozos.aspx.vb" Inherits="Ingresodetrozo.contartrozos" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Conteo de Troncos</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="CSS/home.css" />
</head>
<body>
    <form id="form1" runat="server">
      <div id="total-display">Total: 0</div>
      <div id="volumen-display">Volumen Total: 0</div>
      <button onclick="resetearContadores(event)">Reset</button>
<div class="home-container">
    <button id="btn-16" onclick="manejarClick('btn-16', event)" data-count="0">Diámetro 16 | Contador: 0</button>
    <button id="btn-18" onclick="manejarClick('btn-18', event)" data-count="0">Diámetro 18 | Contador: 0</button>
    <button id="btn-20" onclick="manejarClick('btn-20', event)" data-count="0">Diámetro 20 | Contador: 0</button>
    <button id="btn-22" onclick="manejarClick('btn-22', event)" data-count="0">Diámetro 22 | Contador: 0</button>
    <button id="btn-24" onclick="manejarClick('btn-24', event)" data-count="0">Diámetro 24 | Contador: 0</button>
    <button id="btn-26" onclick="manejarClick('btn-26', event)" data-count="0">Diámetro 26 | Contador: 0</button>
    <button id="btn-28" onclick="manejarClick('btn-28', event)" data-count="0">Diámetro 28 | Contador: 0</button>
    <button id="btn-30" onclick="manejarClick('btn-30', event)" data-count="0">Diámetro 30 | Contador: 0</button>
    <button id="btn-32" onclick="manejarClick('btn-32', event)" data-count="0">Diámetro 32 | Contador: 0</button>
    <button id="btn-34" onclick="manejarClick('btn-34', event)" data-count="0">Diámetro 34 | Contador: 0</button>
    <button id="btn-36" onclick="manejarClick('btn-36', event)" data-count="0">Diámetro 36 | Contador: 0</button>
    <button id="btn-38" onclick="manejarClick('btn-38', event)" data-count="0">Diámetro 38 | Contador: 0</button>
    <button id="btn-40" onclick="manejarClick('btn-40', event)" data-count="0">Diámetro 40 | Contador: 0</button>
    <button id="btn-42" onclick="manejarClick('btn-42', event)" data-count="0">Diámetro 42 | Contador: 0</button>
    <button id="btn-44" onclick="manejarClick('btn-44', event)" data-count="0">Diámetro 44 | Contador: 0</button>
    <button id="btn-46" onclick="manejarClick('btn-46', event)" data-count="0">Diámetro 46 | Contador: 0</button>
    <button id="btn-48" onclick="manejarClick('btn-48', event)" data-count="0">Diámetro 48 | Contador: 0</button>

    <button onclick="activarModoResta(event)">Disminuir el siguiente</button>
</div>
    </form>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/Scripts/contadosTroncos.js"></script>
</body>
</html>









