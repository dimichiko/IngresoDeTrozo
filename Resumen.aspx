<%@ Page Language="VB" AutoEventWireup="true" CodeBehind="Resumen.aspx.vb" Inherits="Ingresodetrozo.Resumen" %>

<!DOCTYPE html>
<html>
<head>
    <title>Resumen de Troncos</title>
    <link rel="stylesheet" type="text/css" href="/CSS/Resumen.css" />
</head>
<body>
    <h1>Resumen de Troncos</h1>
    <table>
        <thead>
            <tr>
                <th>Diámetro</th>
                <th>Contador</th>
            </tr>
        </thead>
        <tbody id="tabla-resumen">
        </tbody>
    </table>
    <div id="resumen-totales">
        <p id="total-troncos"></p>
        <p id="volumen-total"></p>
    </div>
    <button onclick="habilitarEdicion()">Habilitar Edición</button>
    <button onclick="guardarCambios()">Guardar Cambios</button>
    <button onclick="volverAlFormulario()">Volver al Formulario</button>
    <button onclick="terminarProceso()">Finalizar el Proceso</button>
    
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/Scripts/Resumen.js"></script>
</body>
</html>