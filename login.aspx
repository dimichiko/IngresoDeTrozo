<%@ Page Language="VB" AutoEventWireup="false" CodeFile="login.aspx.vb" Inherits="login" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="CSS/login.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="Content/favicon.ico" type="image/x-icon" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="login-container">
            <div class="login-logo">
                <img src="Content/LOGO_ALTO_HORIZONTE-SIN-FONDO.png" alt="Logo Empresa" />
            </div>
            <div class="login-form">
                <input type="text" id="txtUsuario" placeholder="Nombre de usuario" autocomplete="current-username" />
                <input type="password" id="txtClave" placeholder="Contraseña" utocomplete="current-password" />
                <button type="button" id="btnLogin">Ingresar</button>
            </div>
        </div>
    </form>

    <script src="JS/login.js"></script>
</body>
</html>