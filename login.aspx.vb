Imports System.Data.SqlClient

Partial Class login
    Inherits System.Web.UI.Page

    Protected Sub btnLogin_Click(sender As Object, e As EventArgs)
        Dim usuario As String = txtUsuario.Text.Trim()
        Dim clave As String = txtClave.Text.Trim()

        ' Validación contra usuario simulado (reemplaza si quieres más)
        If usuario = "admin" And clave = "1234" Then
            Session("usuario") = usuario
            Response.Redirect("inicio.aspx")
        Else
            ClientScript.RegisterStartupScript(Me.GetType(), "error", "document.getElementById('notification').innerText='Credenciales incorrectas';", True)
        End If
    End Sub
End Class