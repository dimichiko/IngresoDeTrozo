<%@ Page Language="VB" AutoEventWireup="true" Codebehind="login.aspx.vb" Inherits="Ingresodetrozo.login" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head runat="server">
    <title>Iniciar Sesión - Alto Horizonte</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Portal de acceso para Alto Horizonte" />
    <link href="CSS/login.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="Content/favicon.ico" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>
<body>
    <form id="loginForm" autocomplete="on">
        <div class="login-container">
            <div class="login-logo">
                <img src="Content/LOGO_ALTO_HORIZONTE-SIN-FONDO.png" alt="Logo Alto Horizonte" />
            </div>

            <h1 class="login-title">Iniciar Sesión</h1>

            <div id="notification" class="notification" role="alert"></div>

            <div class="login-form">
                <div class="form-group">
                    <label for="txtUsuario">Nombre de usuario</label>
                    <input type="text" id="txtUsuario" class="form-control" placeholder="Ingresa tu usuario" />
                    <div class="error-message" aria-live="polite"></div>
                </div>

                <div class="form-group">
                    <label for="txtClave">Contraseña</label>
                    <input type="password" id="txtClave" class="form-control" placeholder="Ingresa tu contraseña" />
                    <div class="error-message" aria-live="polite"></div>
                </div>

                <label class="remember-me">
                    <input type="checkbox" id="chkRecordar" name="chkRecordar" />
                    Recordar mi usuario
                </label>

                <button type="submit" id="btnLogin" class="btn">Ingresar</button>
            </div>

            <div class="login-footer">
                &copy; <%= DateTime.Now.Year %> Alto Horizonte. Todos los derechos reservados.<br />
                <div id="version-info" class="version-label"></div>
            </div>
        </div>
    </form>

    <div id="loading-overlay" class="loading-overlay" style="display: none;">
        <div class="spinner"></div>
    </div>

    <script src="JS/login.js"></script>
    <script src="JS/loader.js"></script>
    <script src="http://portal.altohorizonte.cl:8089/js/comun.js"></script>
</body>
</html>
