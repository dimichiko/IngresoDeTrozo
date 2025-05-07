Imports System.Data.SqlClient
Imports System.Xml

Partial Class login
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load
        If Not Page.IsPostBack Then
            Try
                Dim xmlPath As String = Server.MapPath("~/xml/version.xml")
                Dim doc As New XmlDocument()
                doc.Load(xmlPath)

                Dim versionNode As XmlNode = doc.SelectSingleNode("//version/number")
                If versionNode IsNot Nothing Then
                    lblVersion.Text = "Versión " & versionNode.InnerText
                End If
            Catch ex As Exception
                ' Si falla la carga, mostrar versión desconocida
                lblVersion.Text = "Versión desconocida"
            End Try
        End If
    End Sub

    Protected Sub btnLogin_Click(sender As Object, e As EventArgs)
        Dim usuario As String = txtUsuario.Text.Trim()
        Dim clave As String = txtClave.Text.Trim()

        ' Validación contra usuario simulado
        If usuario = "admin" And clave = "1234" Then
            Session("usuario") = usuario
            Response.Redirect("inicio.aspx")
        Else
            ClientScript.RegisterStartupScript(Me.GetType(), "error", "document.getElementById('notification').innerText='Credenciales incorrectas';", True)
        End If
    End Sub
End Class