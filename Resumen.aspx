<%@ Page Language="VB" AutoEventWireup="true" CodeBehind="Resumen.aspx.vb" Inherits="Ingresodetrozo.Resumen" %>

<!DOCTYPE html>
<html>
<head>
    <title>Resumen de Troncos</title>
    <script src="/Scripts/Resumen.js"></script>
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
            <!-- Los datos se cargarán dinámicamente -->
        </tbody>
    </table>
    <div id="resumen-totales">
        <p id="total-troncos"></p>
        <p id="volumen-total"></p>
    </div>
    <button onclick="habilitarEdicion()">Habilitar Edición</button>
    <button onclick="guardarCambios()">Guardar Cambios</button>
    <button onclick="volverAlFormulario()">Volver al Formulario</button>
</body>
</html>